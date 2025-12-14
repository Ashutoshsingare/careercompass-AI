"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, LogOut, LayoutDashboard, CalendarCheck, Home as HomeIcon } from "lucide-react";
import { useAuth } from "@/lib/auth";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: HomeIcon, protected: false },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, protected: true },
  { href: "/daily-tasks", label: "Daily Tasks", icon: CalendarCheck, protected: true },
];

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const renderNavLinks = (isMobile = false) => {
    const linkClass = (href: string) =>
      cn(
        "transition-colors hover:text-foreground/80",
        pathname === href ? "text-foreground font-semibold" : "text-foreground/60"
      );

    const mobileLinkClass = (href: string) =>
      cn(
        "flex items-center gap-4 px-2.5",
        pathname === href ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground",
      );

    return navLinks
      .filter(link => !link.protected || (link.protected && user))
      .map(link => (
        isMobile ? (
          <SheetClose asChild key={link.href}>
            <Link href={link.href} className={cn(mobileLinkClass(link.href), "group flex h-10 w-full items-center rounded-md text-base font-medium")}>
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          </SheetClose>
        ) : (
          <Link key={link.href} href={link.href} className={linkClass(link.href)}>
            {link.label}
          </Link>
        )
      ));
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {renderNavLinks()}
          </nav>
        </div>
        
        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link href="/" className="flex items-center mb-6">
                <Logo />
              </Link>
              <div className="flex flex-col space-y-2">
                {renderNavLinks(true)}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user ? (
            <Button onClick={logout} variant="ghost" size="sm">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Signup</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
