'use server';
/**
 * @fileOverview An AI tool to analyze visual inputs (like screenshots or style guides) and generate a structured JSON-based design system.
 *
 * - aiDesignSystemFromScreenshots - A function that handles the design system extraction process.
 * - AIDesignSystemFromScreenshotsInput - The input type for the aiDesignSystemFromScreenshots function.
 * - AIDesignSystemFromScreenshotsOutput - The return type for the aiDesignSystemFromScreenshots function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Input schema for the design system extraction tool.
 * It accepts an array of screenshots as data URIs.
 */
const AIDesignSystemFromScreenshotsInputSchema = z.object({
  screenshots: z.array(
    z.string().describe(
      "A screenshot of a UI, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    )
  ).min(1).describe('An array of UI screenshots to analyze.'),
});
export type AIDesignSystemFromScreenshotsInput = z.infer<typeof AIDesignSystemFromScreenshotsInputSchema>;

/**
 * Output schema for the design system extraction tool.
 * The output is expected to be a JSON string that represents the design system.
 */
const AIDesignSystemFromScreenshotsOutputSchema = z.object({
  jsonDesignSystem: z.string().describe('A comprehensive JSON string representing the extracted design system.'),
});
export type AIDesignSystemFromScreenshotsOutput = z.infer<typeof AIDesignSystemFromScreenshotsOutputSchema>;

/**
 * Analyzes UI screenshots and generates a comprehensive JSON-based design system.
 * @param input - Contains an array of `screenshots` (data URIs).
 * @returns A JSON string representing the extracted design system.
 */
export async function aiDesignSystemFromScreenshots(
  input: AIDesignSystemFromScreenshotsInput
): Promise<AIDesignSystemFromScreenshotsOutput> {
  return aiDesignSystemFromScreenshotsFlow(input);
}

/**
 * Genkit prompt definition for extracting a design system from screenshots.
 * It instructs the LLM to analyze visual elements and structure them into a JSON format.
 */
const designSystemExtractionPrompt = ai.definePrompt({
  name: 'designSystemExtractionPrompt',
  input: { schema: AIDesignSystemFromScreenshotsInputSchema },
  output: { schema: AIDesignSystemFromScreenshotsOutputSchema },
  prompt: `A partir de estas capturas, quiero que generes un sistema de diseño en formato JSON que contenga todo lo necesario para replicar este estilo de forma coherente: colores, estructura visual, tipos de elementos, jerarquía y cualquier patrón relevante que detectes. No hace falta que describas lo que aparece en las imágenes —solo quiero que analices el estilo visual. El objetivo es que otra IA pueda usar ese JSON como base para diseñar una app con este mismo look, sin copiar el contenido exacto.

Responde **únicamente** con un objeto JSON. Este objeto JSON debe tener una sola propiedad llamada "jsonDesignSystem", cuyo valor sea el sistema de diseño completo en formato JSON. No incluyas ningún texto explicativo adicional fuera del JSON.

El formato esperado para "jsonDesignSystem" es similar a este ejemplo:

\`\`\`json
{
  "designSystemName": "Nombre del Sistema de Diseño",
  "version": "1.0.0",
  "visualIdentity": {
    "concept": "Descripción del concepto visual.",
    "colors": {
      "background": {
        "primary": "#HEXCODE",
        "secondary": "#HEXCODE"
      }
    }
  }
}
\`\`\`

Capturas para análisis:
{{#each screenshots}}
{{media url=this}}
{{/each}}`,
});

/**
 * Defines the Genkit flow for AI design system extraction.
 * It takes an array of screenshots and uses the defined prompt to generate
 * a JSON-based design system.
 */
const aiDesignSystemFromScreenshotsFlow = ai.defineFlow(
  {
    name: 'aiDesignSystemFromScreenshotsFlow',
    inputSchema: AIDesignSystemFromScreenshotsInputSchema,
    outputSchema: AIDesignSystemFromScreenshotsOutputSchema,
  },
  async (input) => {
    const { output } = await designSystemExtractionPrompt(input);
    return output!;
  }
);
