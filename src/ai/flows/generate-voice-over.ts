'use server';

/**
 * @fileOverview A text-to-speech (TTS) flow using Genkit.
 *
 * This file defines a Genkit flow that converts a given text string into
 * speech audio and returns it as a base64 encoded WAV data URI.
 *
 * @interface GenerateVoiceOverInput - The input type for the TTS flow.
 * @interface GenerateVoiceOverOutput - The output type for the TTS flow.
 * @function generateVoiceOver - An exported function that invokes the TTS flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

export const GenerateVoiceOverInputSchema = z.string();
export type GenerateVoiceOverInput = z.infer<typeof GenerateVoiceOverInputSchema>;

export const GenerateVoiceOverOutputSchema = z.object({
  media: z.string().describe('The base64 encoded WAV audio data URI.'),
});
export type GenerateVoiceOverOutput = z.infer<typeof GenerateVoiceOverOutputSchema>;

export async function generateVoiceOver(
  input: GenerateVoiceOverInput
): Promise<GenerateVoiceOverOutput> {
  return generateVoiceOverFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const generateVoiceOverFlow = ai.defineFlow(
  {
    name: 'generateVoiceOverFlow',
    inputSchema: GenerateVoiceOverInputSchema,
    outputSchema: GenerateVoiceOverOutputSchema,
  },
  async (query) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: query,
    });

    if (!media) {
      throw new Error('No media was returned from the TTS model.');
    }
    
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    return {
      media: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
    };
  }
);
