"use server";

import { generateCareerRoadmap } from "@/ai/flows/generate-career-roadmap";
import { generateDailyTasks } from "@/ai/flows/generate-daily-tasks";
import { generateVoiceOver } from "@/ai/flows/generate-voice-over";
import {
  mockRoadmap,
  mockDailyTask,
  mockUser,
} from "@/lib/mock-data";
import { getUserData, saveUserAndRoadmap } from "@/lib/db";
import { sleep } from "./utils";
import type { Roadmap, DailyTask, User } from "./types";

export async function generateRoadmapAction(formData: FormData) {
  const careerPath = formData.get("careerPath") as string;
  if (!careerPath) {
    return { error: "Career path is required." };
  }

  try {
    const roadmap = await generateCareerRoadmap({ careerPath });
    // In a real app, you would save this to the database
    // For now, we just return it
    return { data: roadmap };
  } catch (error) {
    console.error("Error generating roadmap:", error);
    return { error: "Failed to generate roadmap. Please try again." };
  }
}

export async function generateDailyTasksAction(careerPath: string) {
  if (!careerPath) {
    return { error: "Career path is required to generate tasks." };
  }

  try {
    const result = await generateDailyTasks({ careerRoadmap: careerPath });
    // In a real app, you would save this to the database for the user
    // For now, we return it along with a mock streak
    return { data: { ...result, streak: Math.floor(Math.random() * 10) } };
  } catch (error) {
    console.error("Error generating daily tasks:", error);
    return { error: "Failed to generate daily tasks. Please try again." };
  }
}

export async function getDashboardData(userId: string): Promise<{
  user: User | null;
  roadmap: Roadmap | null;
  progress: number;
}> {
  await sleep(500); // Simulate DB query
  // Try reading persisted data first
  try {
    const { user, roadmap } = await getUserData(userId);
    if (user && roadmap) {
      const progress = Math.floor(Math.random() * 80) + 10;
      return { user, roadmap, progress };
    }
  } catch (e) {
    // ignore and return null to show form
  }

  // Return null to trigger ProfileForm
  return { user: null, roadmap: null, progress: 0 };
}

export async function getDailyTasks(
  userId: string
): Promise<{ task: DailyTask; motivation: string }> {
  await sleep(500); // Simulate DB query
  const { motivation, tasks } = await generateDailyTasks({
    careerRoadmap: mockRoadmap.careerRole,
  });
  const formattedTasks = tasks.map((t) => ({ text: t, completed: false }));

  // In a real app, you'd fetch today's tasks or create new ones
  const dailyTaskData = {
    ...mockDailyTask,
    tasks: formattedTasks,
  };

  return { task: dailyTaskData, motivation };
}

export async function saveReflection(reflection: string) {
  await sleep(500); // Simulate DB save
  console.log("Saving reflection:", reflection);
  // In a real app, update the daily task record in the DB
  return { success: true };
}

export async function generateVoiceOverAction(text: string) {
  if (!text) {
    return { error: 'Text is required for voice over.' };
  }
  try {
    const audio = await generateVoiceOver(text);
    return { data: audio.media };
  } catch (error) {
    console.error('Error generating voice over:', error);
    return { error: 'Failed to generate voice over.' };
  }
}
