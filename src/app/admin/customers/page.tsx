import { listUsers } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const users = await listUsers();

  return (
    <main className="px-8 py-10">
      <p className="text-[11px] tracking-[0.24em] uppercase text-ember">
        Storefront
      </p>
      <h1 className="font-display mt-1 text-4xl">Customers</h1>
      <p className="mt-2 text-sm text-mist">{users.length} accounts</p>
      {users.length === 0 ? (
        <p className="mt-10 text-mist">Nobody signed up yet.</p>
      ) : (
        <table className="mt-6 w-full text-left text-sm">
          <thead className="text-[10px] tracking-[0.16em] uppercase text-mist">
            <tr className="border-b border-ink/10">
              <th className="py-2 font-medium">Name</th>
              <th className="font-medium">Email</th>
              <th className="font-medium">Phone</th>
              <th className="font-medium">Since</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-ink/5">
                <td className="py-3">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td className="text-mist">
                  {new Date(u.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
