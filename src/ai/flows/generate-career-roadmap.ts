'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a personalized career roadmap based on user input.
 *
 * The flow takes a desired career path as input and returns a structured roadmap, including required skills,
 * tools, a month-wise learning plan, project ideas, and internship/job preparation tips.
 *
 * @interface GenerateCareerRoadmapInput - The input type for the generateCareerRoadmap function.
 * @interface GenerateCareerRoadmapOutput - The output type for the generateCareerRoadmap function.
 * @function generateCareerRoadmap - A function that triggers the career roadmap generation flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCareerRoadmapInputSchema = z.object({
  careerPath: z.string().describe('The desired career path (e.g., MERN stack developer, data scientist).'),
});

export type GenerateCareerRoadmapInput = z.infer<typeof GenerateCareerRoadmapInputSchema>;

const GenerateCareerRoadmapOutputSchema = z.object({
  careerRole: z.string().describe('The career role.'),
  requiredSkills: z.array(z.string()).describe('The required skills for the career role.'),
  toolsAndTechnologies: z.array(z.string()).describe('The tools and technologies needed for the career role.'),
  monthWiseLearningRoadmap: z.array(z.string()).describe('A month-wise learning roadmap.'),
  projectIdeas: z
    .array(
      z.object({
        idea: z.string().describe('The project idea.'),
        category: z.enum(['Easy', 'Moderate', 'Advanced']).describe('The difficulty category of the project.'),
      })
    )
    .describe('Project ideas to build a portfolio.'),
  internshipAndJobPreparationTips: z.string().describe('Tips for internship and job preparation.'),
});

export type GenerateCareerRoadmapOutput = z.infer<typeof GenerateCareerRoadmapOutputSchema>;

export async function generateCareerRoadmap(input: GenerateCareerRoadmapInput): Promise<GenerateCareerRoadmapOutput> {
  return generateCareerRoadmapFlow(input);
}

const generateCareerRoadmapPrompt = ai.definePrompt({
  name: 'generateCareerRoadmapPrompt',
  input: {schema: GenerateCareerRoadmapInputSchema},
  output: {schema: GenerateCareerRoadmapOutputSchema},
  prompt: `You are an expert career mentor for college students.
Generate a clear, structured, and practical career roadmap for: {{{careerPath}}}.
Output must include:
1. Career role
2. Required skills
3. Tools & technologies
4. Month-wise learning roadmap
5. Project ideas categorized as 'Easy', 'Moderate', or 'Advanced'.
6. Internship & job preparation tips
Use simple language and real-world steps.`,
});

const generateCareerRoadmapFlow = ai.defineFlow(
  {
    name: 'generateCareerRoadmapFlow',
    inputSchema: GenerateCareerRoadmapInputSchema,
    outputSchema: GenerateCareerRoadmapOutputSchema,
  },
  async input => {
    const {output} = await generateCareerRoadmapPrompt(input);
    return output!;
  }
);
