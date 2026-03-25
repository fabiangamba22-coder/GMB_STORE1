'use server';
/**
 * @fileOverview A Genkit flow that generates a complete, card-based Next.js dashboard UI
 * based on a text description and an optional design system JSON.
 *
 * - generateDashboardUI - A function that handles the dashboard UI generation process.
 * - DashboardGenerationInput - The input type for the generateDashboardUI function.
 * - DashboardGenerationOutput - The return type for the generateDashboardUI function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DashboardGenerationInputSchema = z.object({
  dashboardDescription: z
    .string()
    .describe(
      'A detailed text description of the dashboard\'s content and functionality, e.g., "Metrics of student progress, active courses, weekly/monthly performance graphs, todo list, recent achievements, study time analysis, quick access buttons."'
    ),
  designSystemJson: z
    .string()
    .optional()
    .describe(
      'An optional JSON string representing a design system to adhere to, including colors, typography, components, and visual patterns.'
    ),
});
export type DashboardGenerationInput = z.infer<
  typeof DashboardGenerationInputSchema
>;

const DashboardGenerationOutputSchema = z.object({
  html: z.string().describe('The generated HTML code for the dashboard.'),
  css: z.string().describe('The generated CSS code for styling the dashboard.'),
  javascript: z
    .string()
    .describe(
      'The generated JavaScript code for any interactive elements in the dashboard.'
    ),
});
export type DashboardGenerationOutput = z.infer<
  typeof DashboardGenerationOutputSchema
>;

export async function generateDashboardUI(
  input: DashboardGenerationInput
): Promise<DashboardGenerationOutput> {
  return generateDashboardFlow(input);
}

const dashboardPrompt = ai.definePrompt({
  name: 'dashboardGeneratorPrompt',
  input: { schema: DashboardGenerationInputSchema },
  output: { schema: DashboardGenerationOutputSchema },
  prompt: `You are an expert UI/UX designer and a frontend developer. Your task is to generate a complete, single-page dashboard UI.

The dashboard should be organized in a card-based layout, with a clean and professional design.

Here is the description of the dashboard's content and functionality:
{{{dashboardDescription}}}

{{#if designSystemJson}}
Strictly adhere to the following design system in JSON format for all visual styles, structure, and hierarchy. Do not invent new styles; only apply the ones defined here.
Design System JSON:
{{{designSystemJson}}}
{{else}}
Since no specific design system is provided, create a modern, clean, and professional dashboard UI using a dark theme with vibrant accents. Prioritize high contrast for readability and a card-based layout for modularity. Use 'Inter' as the primary font. Ensure a sleek and responsive design.
{{/if}}

Your output must be a JSON object containing three keys: "html", "css", and "javascript".
The HTML should represent the full dashboard structure.
The CSS should include all necessary styling for the HTML elements.
The JavaScript should include any necessary interactive logic, but keep it minimal and purely functional (no external libraries or frameworks).

DO NOT include any external frameworks or libraries (like React, Vue, jQuery, Tailwind CSS, Bootstrap, etc.) in the generated HTML, CSS, or JavaScript. Use vanilla HTML, CSS, and JavaScript only.

Example output format:
\`\`\`json
{
  "html": "<!DOCTYPE html><html><head><title>Dashboard</title><link rel='stylesheet' href='style.css'></head><body><!-- Dashboard content --></body></html>",
  "css": "body { font-family: sans-serif; background-color: #1a1a1a; }",
  "javascript": "document.addEventListener('DOMContentLoaded', () => { /* interactive logic */ });"
}
\`\`\`
`,
});

const generateDashboardFlow = ai.defineFlow(
  {
    name: 'generateDashboardFlow',
    inputSchema: DashboardGenerationInputSchema,
    outputSchema: DashboardGenerationOutputSchema,
  },
  async (input) => {
    const { output } = await dashboardPrompt(input);
    if (!output) {
      throw new Error('Failed to generate dashboard UI: output is null or undefined.');
    }
    return output;
  }
);
