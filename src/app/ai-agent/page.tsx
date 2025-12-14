"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, Loader2, Send } from "lucide-react";
import { generateRoadmapAction } from "@/lib/actions";
import { AuthGuard } from "@/components/auth/AuthGuard";
import type { GenerateCareerRoadmapOutput } from "@/ai/flows/generate-career-roadmap";
import { RoadmapDisplay } from "./RoadmapDisplay";
import { useToast } from "@/hooks/use-toast";

const examplePrompts = [
  "Roadmap for MERN stack developer",
  "What should I learn after Python for data science?",
  "Career roadmap for a product manager",
];

export default function AiAgentPage() {
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<GenerateCareerRoadmapOutput | null>(null);
  const [prompt, setPrompt] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent, currentPrompt?: string) => {
    e.preventDefault();
    const finalPrompt = currentPrompt || prompt;
    if (!finalPrompt) return;

    setLoading(true);
    setRoadmap(null);
    setPrompt("");

    const formData = new FormData();
    formData.append("careerPath", finalPrompt);

    const result = await generateRoadmapAction(formData);
    
    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    } else if (result.data) {
      setRoadmap(result.data);
    }
    setLoading(false);
  };
  
  return (
    <AuthGuard>
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-headline">AI Agent</h1>
          <p className="text-muted-foreground mt-2">Ask anything about your career to get a personalized roadmap.</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Career roadmap for data science student"
                className="flex-grow"
                disabled={loading}
              />
              <Button type="submit" size="icon" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-muted-foreground self-center">Try:</span>
              {examplePrompts.map((p) => (
                 <Button key={p} variant="outline" size="sm" onClick={(e) => handleSubmit(e, p)} disabled={loading}>
                   {p}
                 </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {loading && (
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px]">
              <Bot className="h-12 w-12 text-primary mb-4 animate-pulse" />
              <p className="text-lg font-semibold">Generating your roadmap...</p>
              <p className="text-muted-foreground">This may take a moment.</p>
            </CardContent>
          </Card>
        )}

        {roadmap && <RoadmapDisplay roadmap={roadmap} />}

        {!loading && !roadmap && (
           <Card className="border-dashed">
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
                <Bot className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-lg font-semibold text-muted-foreground">Your AI-generated roadmap will appear here.</p>
                <p className="text-muted-foreground">Enter a career path above to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AuthGuard>
  );
}
