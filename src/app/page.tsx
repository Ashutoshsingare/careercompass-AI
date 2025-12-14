
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, Loader2, Send, CheckCircle, Route, CalendarCheck } from "lucide-react";
import { generateRoadmapAction } from "@/lib/actions";
import type { GenerateCareerRoadmapOutput } from "@/ai/flows/generate-career-roadmap";
import { RoadmapDisplay } from "@/app/ai-agent/RoadmapDisplay";
import { useToast } from "@/hooks/use-toast";

const examplePrompts = [
  "Roadmap for MERN stack developer",
  "What should I learn after Python for data science?",
  "Career roadmap for a product manager",
];


export default function Home() {
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
    setPrompt("");
  };


  return (
    <div className="flex-1 w-full gradient-bg">
      <section className="w-full py-20 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground">
                Find Your Perfect Career Path with AI
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl mt-2">
                Ask anything about your career to get a personalized roadmap.
              </p>
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
                    <Button key={p} variant="outline" size="sm" onClick={(e) => {
                      setPrompt(p);
                      handleSubmit(e, p);
                    }} disabled={loading}>
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
              <div className="hidden md:block">
                <Card className="border-dashed">
                    <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
                        <Bot className="h-12 w-12 text-muted-foreground/50 mb-4" />
                        <p className="text-lg font-semibold text-muted-foreground">Your AI-generated roadmap will appear here.</p>
                        <p className="text-muted-foreground">Enter a career path above to get started.</p>
                    </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="w-full pb-20 md:pb-32 lg:pb-40 bg-card/50">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-3 text-center space-y-2 mb-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Features to Guide Your Journey</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                Everything you need to navigate your career path with confidence.
              </p>
            </div>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Route className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline">AI Career Roadmaps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Get a step-by-step, personalized career plan generated by our advanced AI, tailored to your ambitions.</p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <CalendarCheck className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline">Daily Learning Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Receive daily, manageable tasks to build skills consistently and stay on track with your career goals.</p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <CheckCircle className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline">Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Visualize your journey, track completed tasks, and monitor your skill development with our dashboard.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
