import { writeDb, readDb, saveUserAndRoadmap, getUserData } from "@/lib/db";
import { join } from "path";
import { promises as fs } from "fs";

const TEST_DB = join(process.cwd(), "data", "db.test.json");

describe("db helper", () => {
  afterEach(async () => {
    try { await fs.unlink(TEST_DB); } catch (e) {}
  });

  it("should write and read db", async () => {
    const data = { users: [{ id: 'u1', name: 'A', email: '', createdAt: new Date().toISOString() }], roadmaps: [] } as any;
    await writeDb(data, TEST_DB);
    const r = await readDb(TEST_DB);
    expect(r.users.length).toBe(1);
  });

  it("should save and retrieve user+roadmap", async () => {
    const user = { id: 'u2', name: 'B', email: '', createdAt: new Date().toISOString() } as any;
    const roadmap = { id: 'rm1', userId: 'u2', careerPath: 'X', careerRole: 'X', requiredSkills: [], toolsAndTechnologies: [], monthWiseLearningRoadmap: [], projectIdeas: [], internshipAndJobPreparationTips: '', createdAt: new Date().toISOString() } as any;
    await saveUserAndRoadmap(user, roadmap, TEST_DB);
    const { user: u, roadmap: r } = await getUserData('u2', TEST_DB);
    expect(u).not.toBeNull();
    expect(r).not.toBeNull();
  });
});
