# **App Name**: CareerCompass AI

## Core Features:

- AI Career Roadmap Generation: Generates a personalized, structured career roadmap based on user input, using the Google Gemini API. The roadmap will specify a career role, required skills, tools, month-wise learning plan, project ideas, and internship/job preparation tips. It uses a system prompt to guide the responses.
- Daily Task Generation & Tracking: Generates daily learning tasks based on the user's career roadmap and allows users to track their progress by marking tasks as complete. Generates daily motivation quotes via Google Gemini as a tool.
- User Authentication: Secure user authentication with JWT (JSON Web Tokens) for registration, login, and logout functionality. It also supports optional Google Sign-In via Firebase.
- Dashboard Overview: Displays a comprehensive dashboard with an overview of the user's selected career, AI-generated roadmap (month-wise timeline and skills checklist), project ideas, and progress tracker (percentage completed and visual progress bar).
- Profile Management: Allows users to create and manage their profiles, including setting a career goal.
- Progress Tracking: Enables users to track their learning progress, save reflection for each task, and view progress visualization, along with calculating daily streaks (number of consecutive learning days). Data is saved to MongoDB.

## Style Guidelines:

- Primary color: Soft blue (#64B5F6) to evoke trust and knowledge.
- Background color: Light blue (#E3F2FD), subtly desaturated, creating a calm atmosphere.
- Accent color: Purple (#9575CD) for interactive elements.
- Body and headline font: 'Inter' (sans-serif) for a modern, readable experience.
- Use clean, line-based icons related to learning and career development.
- Utilize a grid-based layout with rounded cards (rounded-xl) to present information clearly and consistently.
- Incorporate smooth transitions and hover effects to enhance user engagement.