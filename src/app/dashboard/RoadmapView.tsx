"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Roadmap } from "@/lib/types";
import { ClipboardList, Check } from "lucide-react";

type RoadmapViewProps = {
  roadmap: Roadmap;
};

export default function RoadmapView({ roadmap }: RoadmapViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary" />
          AI Generated Career Roadmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Check className="h-4 w-4 text-accent" />
            Skills Checklist
          </h3>
          <div className="flex flex-wrap gap-2">
            {roadmap.requiredSkills.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Month-wise Timeline</h3>
          <Accordion type="single" collapsible defaultValue="item-0">
            {roadmap.monthWiseLearningRoadmap.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>Phase {index + 1}</AccordionTrigger>
                <AccordionContent>{item}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
