"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type ProgressTrackerProps = {
  progress: number;
};

export default function ProgressTracker({ progress }: ProgressTrackerProps) {
  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="font-headline">Progress Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <div className="relative h-32 w-32 mx-auto">
          <svg className="h-full w-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-gray-700" strokeWidth="2"></circle>
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-current text-primary"
              strokeWidth="2"
              strokeDasharray={`${progress}, 100`}
              strokeLinecap="round"
              transform="rotate(-90 18 18)"
            ></circle>
          </svg>
          <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <span className="text-center text-3xl font-bold text-foreground">{progress}%</span>
          </div>
        </div>
        <p className="text-lg font-semibold">Overall Progress</p>
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-muted-foreground">You&apos;re doing great! Keep pushing forward.</p>
      </CardContent>
    </Card>
  );
}
