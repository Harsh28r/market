import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AccountHome } from "@/components/account-home";
import { getCurrentUser } from "@/lib/customer-auth";
import { listOrdersByUser } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My account",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account");
  const orders = await listOrdersByUser(user.id);
  return <AccountHome user={user} orders={orders} />;
}
