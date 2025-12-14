"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Roadmap } from "@/lib/types";
import { Lightbulb } from "lucide-react";

type ProjectsProps = {
  roadmap: Roadmap;
};

const getProjectLevel = (category: 'Easy' | 'Moderate' | 'Advanced' | 'General') => {
    if (category === 'Easy') return 'Easy';
    if (category === 'Moderate') return 'Moderate';
    if (category === 'Advanced') return 'Advanced';
    return 'General';
}

export default function Projects({ roadmap }: ProjectsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Project Ideas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {roadmap.projectIdeas.map((project, index) => (
            <li key={index} className="flex items-start gap-4">
              <span className={`mt-1 flex h-2 w-2 translate-y-1 rounded-full ${
                getProjectLevel(project.category) === 'Easy' ? 'bg-green-500' :
                getProjectLevel(project.category) === 'Moderate' ? 'bg-yellow-500' :
                'bg-red-500'
              }`} />
              <div className="grid gap-1">
                <p className="font-medium">{project.idea}</p>
                <p className="text-sm text-muted-foreground">{getProjectLevel(project.category)} Level</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
