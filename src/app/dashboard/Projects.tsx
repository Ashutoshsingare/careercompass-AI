"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Roadmap } from "@/lib/types";
import { Lightbulb } from "lucide-react";

type ProjectsProps = {
  roadmap: Roadmap;
};

const getProjectLevel = (idea: string) => {
    const ideaLower = idea.toLowerCase();
    if (ideaLower.includes('beginner')) return 'Beginner';
    if (ideaLower.includes('intermediate')) return 'Intermediate';
    if (ideaLower.includes('advanced')) return 'Advanced';
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
          {roadmap.projectIdeas.map((idea, index) => (
            <li key={index} className="flex items-start gap-4">
              <span className={`mt-1 flex h-2 w-2 translate-y-1 rounded-full ${
                getProjectLevel(idea) === 'Beginner' ? 'bg-green-500' :
                getProjectLevel(idea) === 'Intermediate' ? 'bg-yellow-500' :
                'bg-red-500'
              }`} />
              <div className="grid gap-1">
                <p className="font-medium">{idea.replace(/(Beginner:|Intermediate:|Advanced:)\s*/i, '')}</p>
                <p className="text-sm text-muted-foreground">{getProjectLevel(idea)} Level</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
