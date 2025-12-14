"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth";
import { DailyTask } from "@/lib/types";
import { useEffect, useState } from "react";
import { getDailyTasks, saveReflection } from "@/lib/actions";
import { Loader2, Sparkles, Flame } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DailyTasksPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<{ task: DailyTask | null, motivation: string | null }>({ task: null, motivation: null });
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setLoading(true);
        const dailyData = await getDailyTasks(user.id);
        setData(dailyData);
        setLoading(false);
      };
      fetchData();
    }
  }, [user]);

  const handleTaskToggle = (index: number) => {
    if (!data.task) return;
    const newTasks = [...data.task.tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setData({ ...data, task: { ...data.task, tasks: newTasks } });
  };
  
  const handleReflectionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!data.task) return;
    setData({ ...data, task: { ...data.task, reflection: e.target.value } });
  }

  const handleSaveReflection = async () => {
    if (!data.task?.reflection) return;
    setSaving(true);
    await saveReflection(data.task.reflection);
    setSaving(false);
    toast({ title: "Reflection Saved!", description: "Your thoughts for the day have been recorded." });
  }

  return (
    <AuthGuard>
      <div className="container mx-auto max-w-4xl py-12 px-4">
        {loading ? (
          <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : data.task ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold font-headline">Daily Tasks</h1>
              <p className="text-muted-foreground mt-2">
                {new Date(data.task.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Today&apos;s Checklist</CardTitle>
                  <CardDescription>Stay on track with these AI-generated tasks.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.task.tasks.map((task, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Checkbox
                        id={`task-${index}`}
                        checked={task.completed}
                        onCheckedChange={() => handleTaskToggle(index)}
                      />
                      <Label
                        htmlFor={`task-${index}`}
                        className={`text-sm font-medium leading-none ${task.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {task.text}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Reflection</CardTitle>
                    <CardDescription>What did you learn today?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Jot down your thoughts, challenges, and 'aha!' moments..."
                      value={data.task.reflection}
                      onChange={handleReflectionChange}
                    />
                    <Button onClick={handleSaveReflection} disabled={saving || !data.task.reflection}>
                      {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Reflection
                    </Button>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="flex flex-col items-center justify-center p-6 text-center">
                    <Flame className="h-10 w-10 text-orange-500 mb-2" />
                    <p className="text-3xl font-bold">{data.task.streak}</p>
                    <p className="text-sm text-muted-foreground">Day Streak</p>
                  </Card>
                  <Card className="flex flex-col items-center justify-center p-6 text-center">
                    <Sparkles className="h-10 w-10 text-yellow-500 mb-2" />
                    <p className="text-3xl font-bold">{data.task.tasks.filter(t => t.completed).length}/{data.task.tasks.length}</p>
                    <p className="text-sm text-muted-foreground">Tasks Done</p>
                  </Card>
                </div>
              </div>
            </div>
            
            {data.motivation && (
              <Card className="mt-8 bg-accent/20 border-accent">
                <CardContent className="p-6 text-center">
                  <Sparkles className="mx-auto h-6 w-6 text-accent mb-2" />
                  <p className="text-lg italic">&quot;{data.motivation}&quot;</p>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <div className="text-center py-20">
             <h2 className="text-2xl font-semibold">No Tasks Found</h2>
             <p className="text-muted-foreground mt-2">Could not load daily tasks. Please try again later.</p>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
