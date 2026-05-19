import { auth, signIn, signOut } from "@/auth";
import DashboardClient from "@/components/dashboard-client";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 font-sans dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-6">
        {/* Branding header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Laci v3
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Aplikasi Demo Integrasi SSO IPNU-IPPNU Magetan
          </p>
        </div>

        {session ? (
          /* Authenticated Card */
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="space-y-6">
              {/* Header profile info */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                  {session.user?.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                  <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {session.user?.name}
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {session.user?.email}
                  </p>
                  <div className="mt-1">
                    <span className="inline-flex items-center rounded-md bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 capitalize">
                      Role: {session.user?.role || "User"}
                    </span>
                  </div>
                </div>
              </div>

              <hr className="border-zinc-200 dark:border-zinc-800" />

              {/* Protected Go API Caller Component */}
              <DashboardClient accessToken={session.accessToken} />

              <hr className="border-zinc-200 dark:border-zinc-800" />

              {/* Logout button */}
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-850"
                >
                  Keluar dari Laci-v3
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Unauthenticated Login Card */
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="space-y-4">
              <div className="space-y-2 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  Masuk ke Laci v3
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Aplikasi ini membutuhkan autentikasi melalui portal SSO utama. Silakan klik tombol di bawah untuk melanjutkan.
                </p>
              </div>

              <form
                action={async () => {
                  "use server";
                  await signIn("sso-ipnu");
                }}
              >
                <button
                  type="submit"
                  className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-850 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  Masuk dengan SSO
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
