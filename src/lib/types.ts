import type { GenerateCareerRoadmapOutput } from "@/ai/flows/generate-career-roadmap";

export interface User {
  id: string;
  name: string;
  email: string;
  careerGoal?: string;
  createdAt: string;
}

export type Roadmap = GenerateCareerRoadmapOutput & {
  id: string;
  userId: string;
  careerPath: string;
  createdAt: string;
};

export interface DailyTask {
  id: string;
  userId: string;
  date: string;
  tasks: { text: string; completed: boolean }[];
  reflection: string;
  streak: number;
}

export interface Motivation {
  quote: string;
  author: string;
}
