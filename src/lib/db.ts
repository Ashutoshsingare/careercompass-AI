import { promises as fs } from "fs";
import { join } from "path";
import type { Roadmap, User } from "./types";

const DEFAULT_DB_PATH = join(process.cwd(), "data", "db.json");

async function ensureDb(path = DEFAULT_DB_PATH) {
  try {
    await fs.mkdir(join(path, ".."), { recursive: true });
  } catch (e) {
    // ignore
  }
  try {
    await fs.access(path);
  } catch (e) {
    await fs.writeFile(path, JSON.stringify({ users: [], roadmaps: [] }, null, 2));
  }
}

export async function readDb(path = DEFAULT_DB_PATH) {
  await ensureDb(path);
  const raw = await fs.readFile(path, "utf-8");
  return JSON.parse(raw) as { users: User[]; roadmaps: Roadmap[] };
}

export async function writeDb(data: { users: User[]; roadmaps: Roadmap[] }, path = DEFAULT_DB_PATH) {
  await ensureDb(path);
  await fs.writeFile(path, JSON.stringify(data, null, 2), "utf-8");
}

export async function getUserData(userId: string, path = DEFAULT_DB_PATH) {
  const db = await readDb(path);
  const user = db.users.find((u) => u.id === userId) ?? null;
  const roadmap = db.roadmaps.find((r) => r.userId === userId) ?? null;
  return { user, roadmap };
}

export async function saveUserAndRoadmap(user: User, roadmap: Roadmap, path = DEFAULT_DB_PATH) {
  const db = await readDb(path);
  const users = db.users.filter((u) => u.id !== user.id).concat(user);
  const roadmaps = db.roadmaps.filter((r) => r.id !== roadmap.id && r.userId !== user.id).concat(roadmap);
  const newDb = { users, roadmaps };
  await writeDb(newDb, path);
  return { user, roadmap };
}
