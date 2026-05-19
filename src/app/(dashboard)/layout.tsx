import { auth } from "@/auth";
import DashboardProviders from "./providers";
import DashboardSidebar from "./layout-client";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <DashboardProviders session={session}>
      <DashboardSidebar session={session}>{children}</DashboardSidebar>
    </DashboardProviders>
  );
}
