import type { User, Roadmap, DailyTask, Motivation } from "./types";

export const mockUser: User = {
  id: "1",
  name: "Alex Doe",
  email: "student@example.com",
  careerGoal: "Become a Senior MERN Stack Developer in 2 years",
  createdAt: "2023-01-15T09:30:00Z",
};

export const mockRoadmap: Roadmap = {
  id: "roadmap1",
  userId: "1",
  careerPath: "MERN Stack Developer",
  careerRole: "MERN Stack Developer",
  requiredSkills: [
    "HTML, CSS, JavaScript",
    "React.js",
    "Node.js & Express.js",
    "MongoDB",
    "State Management (Redux/Context API)",
    "RESTful APIs & GraphQL",
    "Git & Version Control",
  ],
  toolsAndTechnologies: [
    "VS Code",
    "Postman",
    "MongoDB Compass",
    "GitHub",
    "Webpack/Vite",
    "Jest/React Testing Library",
  ],
  monthWiseLearningRoadmap: [
    "Month 1-2: Frontend Fundamentals (HTML, CSS, JS, React Basics)",
    "Month 3: Advanced React & State Management",
    "Month 4-5: Backend Development (Node.js, Express.js, REST APIs)",
    "Month 6: Database Integration (MongoDB & Mongoose)",
    "Month 7: Full-Stack Project & Deployment",
    "Month 8: Advanced Topics (GraphQL, WebSockets, Testing)",
  ],
  projectIdeas: [
    "Beginner: To-Do List App with React",
    "Intermediate: Blog Platform with MERN stack",
    "Advanced: Real-time Chat Application",
  ],
  internshipAndJobPreparationTips:
    "Build a strong portfolio on GitHub. Practice data structures and algorithms on platforms like LeetCode. Create a polished LinkedIn profile and network with developers.",
  createdAt: "2023-02-01T10:00:00Z",
};

export const mockDailyTask: DailyTask = {
  id: "task1",
  userId: "1",
  date: new Date().toISOString().split("T")[0],
  tasks: [
    { text: "Complete 2 modules of the React course.", completed: true },
    { text: "Solve 1 easy LeetCode problem.", completed: false },
    {
      text: "Read an article about Node.js event loop.",
      completed: false,
    },
  ],
  reflection: "",
  streak: 3,
};

export const mockMotivation: Motivation = {
  quote: "The best way to predict the future is to create it.",
  author: "Peter Drucker",
};
