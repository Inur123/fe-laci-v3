"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { LayoutDashboard, LogOut, MoreHorizontal } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

interface DashboardSidebarProps {
  children: React.ReactNode;
  session: any;
}

export default function DashboardSidebar({
  children,
  session: initialSession,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: clientSession } = useSession();

  const session = clientSession || initialSession;

  useEffect(() => {
    if (session?.user?.name) {
      const shown = sessionStorage.getItem("login_toast_shown");
      if (!shown) {
        sessionStorage.setItem("login_toast_shown", "true");
        setTimeout(() => {
          toast.success(`Selamat datang kembali, ${session.user.name}!`);
        }, 300);
      }
    }
  }, [session]);

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  async function handleLogout() {
    sessionStorage.removeItem("login_toast_shown");
    sessionStorage.setItem(
      "logout_message",
      "Sampai jumpa! Kamu berhasil keluar.",
    );
    await signOut({ redirect: false });
    router.push("/");
  }

  const name = session?.user?.name || "User";
  const email = session?.user?.email || "";
  const avatar = session?.user?.image || "";

  // Resolusi URL Avatar dari Server API SSO
  function resolveAvatar(url: string) {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    const baseUrl = process.env.NEXT_PUBLIC_SSO_API_URL || "";
    return `${baseUrl}${url}`;
  }

  const displayAvatar = resolveAvatar(avatar);

  return (
    <>
      <Sidebar>
        {/* Header */}
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                onClick={() => handleNavigate("/dashboard")}
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden shrink-0">
                  <Image
                    src="/logo-sso.png"
                    alt="Laci v3"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Laci v3</span>
                  <span className="truncate text-xs text-muted-foreground">
                    PC IPNU Magetan
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        isActive={active}
                        onClick={() => handleNavigate(item.href)}
                        className={cn(
                          "transition-all duration-200",
                          active
                            ? "bg-emerald-50/90 dark:bg-emerald-950/30 text-emerald-700! dark:text-emerald-400! font-semibold"
                            : "hover:bg-slate-100/80 dark:hover:bg-zinc-800/80 text-slate-700 dark:text-zinc-300",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4",
                            active
                              ? "text-emerald-600! dark:text-emerald-400!"
                              : "text-slate-500 dark:text-zinc-400",
                          )}
                        />
                        <span
                          className={cn(
                            active
                              ? "text-emerald-700! dark:text-emerald-400! font-semibold"
                              : "text-slate-700 dark:text-zinc-300",
                          )}
                        >
                          {item.label}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="w-full"
                  render={
                    <SidebarMenuButton
                      size="lg"
                      className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
                    >
                      <div className="size-8 rounded-lg overflow-hidden bg-sidebar-primary/10 flex items-center justify-center font-medium text-xs border border-sidebar-border shrink-0">
                        {displayAvatar ? (
                          <Image
                            src={displayAvatar}
                            alt={name}
                            width={32}
                            height={32}
                            className="size-full object-cover"
                            unoptimized
                          />
                        ) : (
                          <span>{name.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{name}</span>
                        <span className="truncate text-xs text-muted-foreground">
                          {email}
                        </span>
                      </div>
                      <MoreHorizontal className="ml-auto size-4" />
                    </SidebarMenuButton>
                  }
                />
                <DropdownMenuContent
                  side="right"
                  align="end"
                  className="w-56 mb-1"
                >
                  <div className="flex items-center gap-2 px-2 py-1.5 text-sm">
                    <div className="size-8 rounded-lg overflow-hidden bg-sidebar-primary/10 flex items-center justify-center font-medium text-xs border border-sidebar-border shrink-0">
                      {displayAvatar ? (
                        <Image
                          src={displayAvatar}
                          alt={name}
                          width={32}
                          height={32}
                          className="size-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <span>{name.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{name}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {email}
                      </span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Main content */}
      <main className="flex-1 h-svh overflow-y-auto relative bg-slate-50/30 dark:bg-zinc-950/20">
        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-emerald-500/4 dark:bg-emerald-500/7 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Header */}
        <div className="sticky top-0 z-30 flex items-center gap-2 border-b bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-4 py-2.5">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-1 h-4" />
          <Badge
            variant="outline"
            className="capitalize border-emerald-500/20 text-emerald-800 bg-emerald-50/50 dark:text-emerald-300 dark:bg-emerald-950/20 font-medium"
          >
            {session?.user?.role ?? "user"}
          </Badge>
        </div>
        <div className="relative p-4 sm:p-6">{children}</div>
      </main>
    </>
  );
}
