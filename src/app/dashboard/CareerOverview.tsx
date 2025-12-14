"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Roadmap } from "@/lib/types";
import { Target, Calendar, Clock } from "lucide-react";

type CareerOverviewProps = {
  user: User;
  roadmap: Roadmap;
};

export default function CareerOverview({ user, roadmap }: CareerOverviewProps) {
  const duration = roadmap.monthWiseLearningRoadmap.length;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Career Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Target className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold">{roadmap.careerRole}</p>
            <p className="text-sm text-muted-foreground">Selected Career</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Calendar className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold">{user.careerGoal || 'Not set'}</p>
            <p className="text-sm text-muted-foreground">Goal</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Clock className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold">{duration} Months</p>
            <p className="text-sm text-muted-foreground">Estimated Duration</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
