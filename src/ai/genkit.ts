import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Ensure API key is loaded from environment
if (!process.env.GOOGLE_API_KEY) {
  throw new Error('GOOGLE_API_KEY environment variable is not set');
}

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});