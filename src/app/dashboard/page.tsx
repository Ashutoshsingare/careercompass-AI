"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";
import type { Roadmap, User } from "@/lib/types";
import { getDashboardData } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import CareerOverview from "./CareerOverview";
import RoadmapView from "./RoadmapView";
import Projects from "./Projects";
import ProgressTracker from "./ProgressTracker";

export default function DashboardPage() {
  const { user: authUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    user: User | null;
    roadmap: Roadmap | null;
    progress: number;
  }>({ user: null, roadmap: null, progress: 0 });

  useEffect(() => {
    if (authUser) {
      const fetchData = async () => {
        setLoading(true);
        const dashboardData = await getDashboardData(authUser.id);
        setData(dashboardData);
        setLoading(false);
      };
      fetchData();
    }
  }, [authUser]);

  return (
    <AuthGuard>
      <div className="container mx-auto max-w-7xl py-12 px-4">
        {loading ? (
          <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : data.user && data.roadmap ? (
          <>
            <h1 className="text-3xl font-bold font-headline mb-2">
              Welcome back, {data.user.name.split(" ")[0]}!
            </h1>
            <p className="text-muted-foreground mb-8">
              Here&apos;s your career journey at a glance. Keep up the great work!
            </p>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-8">
                <CareerOverview user={data.user} roadmap={data.roadmap} />
                <RoadmapView roadmap={data.roadmap} />
                <Projects roadmap={data.roadmap} />
              </div>
              <div className="lg:col-span-1">
                <ProgressTracker progress={data.progress} />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
             <h2 className="text-2xl font-semibold">No Roadmap Found</h2>
             <p className="text-muted-foreground mt-2">
                It looks like you haven&apos;t generated a career roadmap yet.
             </p>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
