import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple prototype - no AI calls, just return structured data
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, careerRole, careerGoal, skills } = body;
    
    if (!careerRole) {
      return NextResponse.json({ error: "careerRole is required" }, { status: 400 });
    }

    const skillList = (skills || "")
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);

    const uid = `user_${Date.now()}`;
    
    const user = {
      id: uid,
      name: name || "User",
      email: email || "",
      careerGoal: careerGoal || "Career Development",
      createdAt: new Date().toISOString(),
    };

    const roadmap = {
      id: `rm_${Date.now()}`,
      userId: uid,
      careerPath: careerRole,
      careerRole: careerRole,
      requiredSkills: skillList.length 
        ? skillList 
        : ["Fundamentals", "Problem Solving", "Communication"],
      toolsAndTechnologies: [
        "GitHub",
        "VS Code",
        "Docker",
        "Linux",
        ...(skillList.length ? skillList : []),
      ],
      monthWiseLearningRoadmap: [
        `Month 1: Master ${careerRole} basics and core concepts`,
        `Month 2: Build 2-3 projects to solidify your skills`,
        `Month 3: Contribute to open source and network`,
        `Month 4-6: Advanced topics and interview preparation`,
      ],
      projectIdeas: [
        {
          idea: `Build a ${careerRole} beginner project`,
          category: "Easy",
        },
        {
          idea: `Create an intermediate ${careerRole} application`,
          category: "Moderate",
        },
        {
          idea: `Develop a complex ${careerRole} system`,
          category: "Advanced",
        },
      ],
      internshipAndJobPreparationTips:
        "1. Build a portfolio of 3-5 projects\n2. Practice coding interviews on LeetCode\n3. Network with professionals on LinkedIn\n4. Contribute to open source on GitHub\n5. Keep learning new technologies",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ user, roadmap });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to generate roadmap" },
      { status: 500 }
    );
  }
}
