"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardProviders({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <SidebarProvider>{children}</SidebarProvider>
    </SessionProvider>
  );
}
