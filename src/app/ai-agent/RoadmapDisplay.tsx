"use client";

import type { GenerateCareerRoadmapOutput } from "@/ai/flows/generate-career-roadmap";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, ClipboardList, Lightbulb, Wrench, GraduationCap, Briefcase } from "lucide-react";

type RoadmapDisplayProps = {
  roadmap: GenerateCareerRoadmapOutput;
};

export function RoadmapDisplay({ roadmap }: RoadmapDisplayProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline text-primary">{roadmap.careerRole}</CardTitle>
          <CardDescription>Your personalized career roadmap is ready.</CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="text-accent" />
              Required Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {roadmap.requiredSkills.map((skill, i) => (
              <Badge key={i} variant="secondary">{skill}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="text-accent" />
              Tools & Technologies
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {roadmap.toolsAndTechnologies.map((tool, i) => (
              <Badge key={i} variant="secondary">{tool}</Badge>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="text-accent" />
            Month-wise Learning Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {roadmap.monthWiseLearningRoadmap.map((item, i) => (
              <AccordionItem value={`item-${i}`} key={i}>
                <AccordionTrigger>
                  <span className="font-semibold">Phase {i+1}</span>
                </AccordionTrigger>
                <AccordionContent>
                  {item}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="text-accent" />
            Project Ideas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
            {roadmap.projectIdeas.map((idea, i) => (
              <li key={i}>{idea}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="text-accent" />
            Internship & Job Preparation Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{roadmap.internshipAndJobPreparationTips}</p>
        </CardContent>
      </Card>
    </div>
  );
}
