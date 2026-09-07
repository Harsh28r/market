import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "arpan";

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
  if (!uri) {
    throw new Error("MONGODB_URI is missing. Add it in Vercel env and Redeploy.");
  }
  if (!global._mongoClientPromise) {
    // Vercel serverless: one small pool per warm instance, drop idle sockets fast.
    const client = new MongoClient(uri, {
      maxPoolSize: 5,
      minPoolSize: 0,
      maxIdleTimeMS: 15_000,
      serverSelectionTimeoutMS: 8_000,
      connectTimeoutMS: 10_000,
    });
    global._mongoClientPromise = client.connect().catch((err) => {
      global._mongoClientPromise = undefined;
      throw err;
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
