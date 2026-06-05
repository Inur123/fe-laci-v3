import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { FolderOpen } from "lucide-react";
import ToastListener from "@/components/toast-listener";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const session = await auth();

  // Redirect otomatis jika pengguna sudah memiliki sesi aktif
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-800 relative overflow-hidden min-h-screen">
      <ToastListener />
      {/* Latar belakang grid identik dengan SSO FE */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-75 pointer-events-none z-0" />
      <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] rounded-full bg-emerald-200/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[5%] right-[10%] w-[30%] h-[30%] rounded-full bg-teal-200/15 blur-[100px] pointer-events-none z-0" />

      <div className="w-full max-w-sm space-y-6 relative z-10">
        {/* Branding Logo & Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-zinc-900 shadow-sm shrink-0">
            <FolderOpen className="h-5 w-5 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Laci v3
          </h1>
          <p className="text-xs text-slate-500">
            Sistem Informasi Pengarsipan Persuratan PC IPNU Magetan
          </p>
        </div>

        {/* Card Otentikasi */}
        <Card className="border border-slate-200/80 shadow-md shadow-slate-100/50 bg-white/95 rounded-2xl overflow-hidden transition-all duration-300">
          <CardHeader className="space-y-1.5 pb-6 text-center sm:text-left">
            <CardTitle className="text-lg font-bold tracking-tight text-slate-900">
              Masuk ke Aplikasi
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Gunakan akun Single Sign-On (SSO) resmi pelajarnumagetan.or.id
              anda untuk melanjutkan.
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-4">
            <form
              action={async () => {
                "use server";
                await signIn("sso-ipnu");
              }}
            >
              <button
                type="submit"
                className="w-full h-10 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center"
              >
                Masuk dengan SSO
              </button>
            </form>
          </CardContent>

          <CardFooter className="pb-6">
            <p className="text-[10px] text-center text-slate-450 leading-normal w-full px-2">
              Dengan mengeklik tombol di atas, anda akan diarahkan secara aman
              ke portal akun utama Pelajar NU Magetan.
            </p>
          </CardFooter>
        </Card>

        {/* Copyright Footer */}
        <p className="text-[10px] text-center text-slate-400 font-medium">
          &copy; 2026 PC IPNU-IPPNU Magetan. All rights reserved.
        </p>
      </div>
    </div>
  );
}
