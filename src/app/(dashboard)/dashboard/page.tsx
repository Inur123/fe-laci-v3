import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/dashboard-client";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/");

  const name = session.user?.name || "User";

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="text-slate-500 dark:text-zinc-400">
          Selamat datang kembali,{" "}
          <span className="font-semibold text-slate-900 dark:text-zinc-100">
            {name}
          </span>{" "}
          👋
        </p>
      </div>

      <Separator className="bg-slate-200/60 dark:bg-zinc-800" />

      {/* Box Pemanggil API Backend Go */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/90">
        <DashboardClient accessToken={session.accessToken as string} />
      </div>
    </div>
  );
}
