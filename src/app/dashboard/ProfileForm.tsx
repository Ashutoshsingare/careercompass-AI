"use client";

import { useState } from "react";
import type { Roadmap, User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  onCreate: (data: { user: User; roadmap: Roadmap }) => void;
};

export default function ProfileForm({ onCreate }: Props) {
  const [name, setName] = useState("");
  const [careerRole, setCareerRole] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const resp = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          careerRole,
          careerGoal,
          skills,
        }),
      });

      const json = await resp.json();

      if (!resp.ok || json.error) {
        setError(json.error || "Failed to generate roadmap");
        setLoading(false);
        return;
      }

      // Save to localStorage
      localStorage.setItem("cc_user", JSON.stringify(json.user));
      localStorage.setItem("cc_roadmap", JSON.stringify(json.roadmap));

      onCreate({ user: json.user, roadmap: json.roadmap });
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Tell us about yourself</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded border border-gray-300 p-2"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Desired career role</label>
            <input
              value={careerRole}
              onChange={(e) => setCareerRole(e.target.value)}
              required
              className="w-full rounded border border-gray-300 p-2"
              placeholder="e.g., Frontend Engineer, Product Manager"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Career goal</label>
            <input
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              className="w-full rounded border border-gray-300 p-2"
              placeholder="e.g., Get my first job, switch careers"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Key skills (comma separated)</label>
            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full rounded border border-gray-300 p-2"
              placeholder="React, TypeScript, Node.js"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading} className="px-6">
              {loading ? "Generating..." : "Generate My Roadmap"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
