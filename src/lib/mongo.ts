import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "arpan";

/** `next build` collect/prerender — workers often drop NEXT_PHASE. */
export function isNextBuild() {
  return process.env.NEXT_PHASE === "phase-production-build";
}

export function canUseMongo() {
  return Boolean(uri) && !isNextBuild();
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function humanize(err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
  if (/MONGODB_URI is missing/i.test(msg)) return msg;
  if (/bad auth|authentication failed|MongoServerError: 18/i.test(msg)) {
    return "MongoDB auth failed. Check MONGODB_URI user/password in Vercel env.";
  }
  if (/timed out|ENOTFOUND|ECONNREFUSED|Server selection|whitelist|IP/i.test(msg)) {
    return "MongoDB unreachable. Atlas → Network Access → allow 0.0.0.0/0, then retry.";
  }
  return msg;
}

function clientPromise() {
  const mongoUri = uri;
  if (!canUseMongo() || !mongoUri) {
    throw new Error(
      mongoUri
        ? "Mongo skipped during next build"
        : "MONGODB_URI is missing. Add it in Vercel env and Redeploy.",
    );
  }
  if (!global._mongoClientPromise) {
    // Vercel serverless: one small pool per warm instance, drop idle sockets fast.
    const client = new MongoClient(mongoUri, {
      maxPoolSize: 5,
      minPoolSize: 0,
      maxIdleTimeMS: 15_000,
      serverSelectionTimeoutMS: 5_000,
      connectTimeoutMS: 5_000,
      family: 4,
    });
    const connect = client.connect().catch((err) => {
      global._mongoClientPromise = undefined;
      throw err;
    });
    // SRV DNS can ignore driver timeouts; hard-cap so collect/runtime can't hang.
    global._mongoClientPromise = new Promise((resolve, reject) => {
      const t = setTimeout(() => {
        global._mongoClientPromise = undefined;
        reject(new Error("MongoDB connect timed out"));
      }, 6_000);
      connect.then(
        (c) => {
          clearTimeout(t);
          resolve(c);
        },
        (err) => {
          clearTimeout(t);
          reject(err);
        },
      );
    });
  }
  return global._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  try {
    const client = await clientPromise();
    return client.db(dbName);
  } catch (err) {
    throw new Error(humanize(err));
  }
}
