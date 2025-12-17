"use client";

import { useState } from "react";
import type { Roadmap, User } from "@/lib/types";

type Props = {
  authUser: { id: string; email?: string } | null;
  onCreate: (data: { user: User; roadmap: Roadmap; progress: number }) => void;
};

export default function ProfileForm({ authUser, onCreate }: Props) {
  const [name, setName] = useState("");
  const [careerRole, setCareerRole] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [skills, setSkills] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: authUser?.id,
          name,
          email: authUser?.email,
          careerRole,
          careerGoal,
          skills,
        }),
      });
      const json = await resp.json();
      if (json.error) {
        console.error(json.error);
        setLoading(false);
        return;
      }
      try { localStorage.setItem("cc_user", JSON.stringify(json.user)); localStorage.setItem("cc_roadmap", JSON.stringify(json.roadmap)); } catch(e){}
      onCreate({ user: json.user, roadmap: json.roadmap, progress: 0 });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Tell us about yourself</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Desired career role</label>
          <input
            value={careerRole}
            onChange={(e) => setCareerRole(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="e.g., Frontend Engineer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Career goal</label>
          <input
            value={careerGoal}
            onChange={(e) => setCareerGoal(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="Short-term goal (e.g., get first internship)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Key skills (comma separated)</label>
          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="React, TypeScript, CSS"
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary px-4 py-2 rounded" disabled={loading}>
            {loading ? "Generating..." : "Save & Generate Roadmap"}
          </button>
        </div>
      </form>
    </div>
  );
}
