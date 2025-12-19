"use client";

import { useEffect, useState } from "react";
import type { Roadmap, User } from "@/lib/types";
import { Loader2 } from "lucide-react";
import RoadmapView from "./RoadmapView";
import ProfileForm from "./ProfileForm";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    user: User | null;
    roadmap: Roadmap | null;
  }>({ user: null, roadmap: null });

  useEffect(() => {
    // Load from localStorage on mount
    const user = localStorage.getItem("cc_user");
    const roadmap = localStorage.getItem("cc_roadmap");
    
    if (user && roadmap) {
      setData({
        user: JSON.parse(user),
        roadmap: JSON.parse(roadmap)
      });
    }
    setLoading(false);
  }, []);

  const handleCreate = (newData: any) => {
    setData(newData);
  };

  return (
    <div className="container mx-auto max-w-7xl py-12 px-4">
      {loading ? (
        <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : data.user && data.roadmap ? (
        <>
          <h1 className="text-3xl font-bold font-headline mb-2">
            Welcome, {data.user.name}!
          </h1>
          <p className="text-muted-foreground mb-8">
            Your career roadmap for <span className="font-semibold">{data.roadmap.careerRole}</span> is ready!
          </p>
          <div className="space-y-8">
            <RoadmapView roadmap={data.roadmap} />
          </div>
        </>
      ) : (
        <div className="py-8">
          <ProfileForm onCreate={handleCreate} />
        </div>
      )}
    </div>
  );
}
