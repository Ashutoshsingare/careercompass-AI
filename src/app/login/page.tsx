"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.62-4.55 1.62-3.83 0-6.95-3.12-6.95-6.95s3.12-6.95 6.95-6.95c2.21 0 3.63.86 4.49 1.69l2.6-2.6C18.4 2.37 15.76.92 12.48.92c-6.17 0-11.17 4.92-11.17 11s5 11 11.17 11c6.47 0 10.9-4.52 10.9-10.98 0-.7-.07-1.35-.19-1.98z" />
    </svg>
);


export default function LoginPage() {
  const [email, setEmail] = useState("student@example.com");
  const [password, setPassword] = useState("password123");
  const { login, loginWithGoogle, loading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.14))] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
            <Logo className="justify-center mb-4"/>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">Login to your account</CardTitle>
            <CardDescription>
              Or{" "}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                create an account
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Log in'}
                </Button>
              </div>
            </form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={loginWithGoogle} disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <GoogleIcon className="mr-2 h-4 w-4" />
              )}
              Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
