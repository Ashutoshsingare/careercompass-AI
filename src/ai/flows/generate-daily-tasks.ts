'use server';

/**
 * @fileOverview AI-powered daily task generator for career roadmaps.
 *
 * This file defines a Genkit flow that generates personalized daily learning tasks
 * and provides a motivational quote to encourage users in their career development journey.
 *
 * @interface GenerateDailyTasksInput - Input type for the generateDailyTasks function.
 * @interface GenerateDailyTasksOutput - Output type for the generateDailyTasks function.
 * @function generateDailyTasks - A function that generates daily tasks and a motivational quote.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDailyTasksInputSchema = z.object({
  careerRoadmap: z
    .string()
    .describe('The user selected career roadmap.'),
});
export type GenerateDailyTasksInput = z.infer<typeof GenerateDailyTasksInputSchema>;

const GenerateDailyTasksOutputSchema = z.object({
  tasks: z.array(z.string()).describe('A list of daily learning tasks.'),
  motivation: z.string().describe('A motivational quote for the user.'),
});
export type GenerateDailyTasksOutput = z.infer<typeof GenerateDailyTasksOutputSchema>;

export async function generateDailyTasks(input: GenerateDailyTasksInput): Promise<GenerateDailyTasksOutput> {
  return generateDailyTasksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDailyTasksPrompt',
  input: {schema: GenerateDailyTasksInputSchema},
  output: {schema: GenerateDailyTasksOutputSchema},
  prompt: `You are a career mentor for college students.
  Generate 3-5 daily learning tasks and provide a motivational quote based on the career roadmap.
  Roadmap: {{{careerRoadmap}}}`,
});

const generateDailyTasksFlow = ai.defineFlow(
  {
    name: 'generateDailyTasksFlow',
    inputSchema: GenerateDailyTasksInputSchema,
    outputSchema: GenerateDailyTasksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
