"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

interface DashboardClientProps {
  accessToken: string;
}

export default function DashboardClient({ accessToken }: DashboardClientProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "";

  const fetchProtectedData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${backendApiUrl}/api/data`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || "Gagal menghubungi backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h2 className="text-sm font-bold text-slate-900 dark:text-zinc-50">
          Uji Coba Koneksi ke Go Backend (laci-v3/be)
        </h2>
        <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-normal">
          Tombol di bawah akan mengirimkan Access Token SSO Anda ke backend Go untuk diverifikasi secara aman.
        </p>
      </div>

      <button
        onClick={fetchProtectedData}
        disabled={loading}
        className="inline-flex h-9 items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 cursor-pointer"
      >
        {loading ? "Memuat..." : "Panggil API Backend"}
      </button>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-xs text-red-700 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {data && (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs dark:border-zinc-800 dark:bg-zinc-900/50">
          <p className="font-bold mb-2 text-zinc-700 dark:text-zinc-300">{"// Response dari Go Backend:"}</p>
          <pre className="overflow-x-auto text-zinc-600 dark:text-zinc-400">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
