'use server';
/**
 * @fileOverview A Genkit flow for generating advanced visual effects code for a UI section.
 *
 * - aiAdvancedVisualEffectsIntegration - A function that generates code for advanced visual effects.
 * - AIAdvancedVisualEffectsIntegrationInput - The input type for the aiAdvancedVisualEffectsIntegration function.
 * - AIAdvancedVisualEffectsIntegrationOutput - The return type for the aiAdvancedVisualEffectsIntegration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIAdvancedVisualEffectsIntegrationInputSchema = z.object({
  sectionDescription: z.string().describe('A description of the UI section where the visual effects should be applied.'),
  visualEffectsDescription: z.string().describe('A detailed description of the advanced visual effects to be combined, such as animated gradients, glow borders, hover elevations, and particle animations.'),
});
export type AIAdvancedVisualEffectsIntegrationInput = z.infer<typeof AIAdvancedVisualEffectsIntegrationInputSchema>;

const AIAdvancedVisualEffectsIntegrationOutputSchema = z.object({
  reactComponentCode: z.string().describe('The React component code (JSX, CSS, and JS) that implements the described visual effects for the UI section. This may include `framer-motion` for advanced animations if suitable.'),
});
export type AIAdvancedVisualEffectsIntegrationOutput = z.infer<typeof AIAdvancedVisualEffectsIntegrationOutputSchema>;

export async function aiAdvancedVisualEffectsIntegration(input: AIAdvancedVisualEffectsIntegrationInput): Promise<AIAdvancedVisualEffectsIntegrationOutput> {
  return aiAdvancedVisualEffectsIntegrationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiAdvancedVisualEffectsIntegrationPrompt',
  input: {schema: AIAdvancedVisualEffectsIntegrationInputSchema},
  output: {schema: AIAdvancedVisualEffectsIntegrationOutputSchema},
  prompt: `You are an expert front-end developer specializing in creating visually stunning and elegant React components with advanced effects.
Given a description of a UI section and a detailed explanation of desired visual effects, your task is to generate a complete React component.
The component should integrate HTML, CSS (either inline, styled-components, or a CSS module for demonstration), and JavaScript (including 'framer-motion' if appropriate for animations like hover effects or custom particles).

Ensure the generated code is clean, elegant, and directly implements the requested effects, making sure the UI remains functional and visually appealing, creating a "wow" effect.
If 'framer-motion' is suitable for any of the described effects (e.g., hover animations, complex transitions), please include its usage and add a comment indicating that 'framer-motion' needs to be installed.

UI Section Description:
{{{sectionDescription}}}

Desired Visual Effects:
{{{visualEffectsDescription}}}

Generate the complete React component code, including all necessary imports and styles. Place the code within a JSON object under the key 'reactComponentCode'.`,
});

const aiAdvancedVisualEffectsIntegrationFlow = ai.defineFlow(
  {
    name: 'aiAdvancedVisualEffectsIntegrationFlow',
    inputSchema: AIAdvancedVisualEffectsIntegrationInputSchema,
    outputSchema: AIAdvancedVisualEffectsIntegrationOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
