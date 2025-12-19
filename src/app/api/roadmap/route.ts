import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { generateCareerRoadmap } from "@/ai/flows/generate-career-roadmap";
import { saveUserAndRoadmap } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, careerRole, careerGoal, skills, userId } = body;
    if (!careerRole) return NextResponse.json({ error: "careerRole is required" }, { status: 400 });

    const uid = userId || `u-${Date.now()}`;
    const user = {
      id: uid,
      name: name || "Anonymous",
      email: email || "",
      careerGoal: careerGoal || undefined,
      createdAt: new Date().toISOString(),
    };

    const skillList = (skills || "").split(",").map((s: string) => s.trim()).filter(Boolean);

    let aiRoadmap;
    let aiError: any = null;
    try {
      aiRoadmap = await generateCareerRoadmap({ careerPath: careerRole });
    } catch (err) {
      aiError = err;
      console.error("AI generation failed:", err);
      aiRoadmap = null;
    }

    const roadmap = {
      id: `rm-${Date.now()}`,
      userId: uid,
      careerPath: careerRole,
      careerRole: aiRoadmap?.careerRole || careerRole,
      requiredSkills: aiRoadmap?.requiredSkills || (skillList.length ? skillList : ["Fundamentals", "Problem Solving"]),
      toolsAndTechnologies: aiRoadmap?.toolsAndTechnologies || (skillList.length ? skillList : ["Development Tools", "Git", "IDE"]),
      monthWiseLearningRoadmap: aiRoadmap?.monthWiseLearningRoadmap || [
        `Month 1: Learn ${careerRole} fundamentals`,
        `Month 2: Build practical projects in ${careerRole}`,
        `Month 3: Master advanced ${careerRole} concepts`,
      ],
      projectIdeas: aiRoadmap?.projectIdeas || (
        skillList.length 
          ? skillList.map((s: string, idx: number) => ({
              idea: `Build a ${s} mini-project`,
              category: idx === 0 ? "Easy" : idx === 1 ? "Moderate" : "Advanced",
            }))
          : [
              { idea: "Build a beginner-friendly project", category: "Easy" },
              { idea: "Create an intermediate-level application", category: "Moderate" },
              { idea: "Develop an advanced portfolio project", category: "Advanced" },
            ]
      ),
      internshipAndJobPreparationTips: aiRoadmap?.internshipAndJobPreparationTips || "Build a strong portfolio, practice interviews, network with professionals, and contribute to open source.",
      createdAt: new Date().toISOString(),
    };

    await saveUserAndRoadmap(user as any, roadmap as any);

    return NextResponse.json({ user, roadmap });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("API error:", errorMessage, error);
    return NextResponse.json({ 
      error: "Failed to generate and save roadmap",
      details: errorMessage
    }, { status: 500 });
  }
}