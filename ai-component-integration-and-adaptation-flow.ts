'use server';
/**
 * @fileOverview This file implements a Genkit flow for integrating custom React components into existing HTML, CSS, and JavaScript code.
 * It takes component code, integration instructions, and dependency information, and uses AI to seamlessly insert the component,
 * resolve conflicts, and manage dependencies.
 *
 * - aiComponentIntegrationAndAdaptation - The main function to call the Genkit flow.
 * - AIComponentIntegrationAndAdaptationInput - The input type for the flow.
 * - AIComponentIntegrationAndAdaptationOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIComponentIntegrationAndAdaptationInputSchema = z.object({
  existingHtml: z.string().describe('The existing HTML code where the component will be integrated.'),
  existingCss: z.string().describe('The existing CSS code associated with the HTML.'),
  existingJs: z.string().describe('The existing JavaScript/TypeScript (JSX) code associated with the HTML.'),
  componentCode: z.string().describe('The React component code (JSX/TSX) to be integrated.'),
  componentName: z.string().describe('The name of the React component (e.g., "ThreeDCard", "HighlightTitle").'),
  integrationPointDescription: z.string().describe(
    'A natural language description of where the component should be integrated (e.g., "replace simple cards in the features section", "insert after the main heading").'
  ),
  dependencies: z.array(z.string()).optional().describe('Optional: An array of NPM dependencies explicitly required by the component (e.g., ["framer-motion"]).'),
});
export type AIComponentIntegrationAndAdaptationInput = z.infer<typeof AIComponentIntegrationAndAdaptationInputSchema>;

const AIComponentIntegrationAndAdaptationOutputSchema = z.object({
  updatedHtml: z.string().describe('The HTML code after integrating the component.'),
  updatedCss: z.string().describe('The CSS code after integrating the component, resolving any conflicts.'),
  updatedJs: z.string().describe('The JavaScript/TypeScript (JSX) code after integrating the component, including imports and usage.'),
  dependenciesToInstall: z.array(z.string()).describe('An array of NPM dependencies that need to be installed for the component to work.'),
});
export type AIComponentIntegrationAndAdaptationOutput = z.infer<typeof AIComponentIntegrationAndAdaptationOutputSchema>;

export async function aiComponentIntegrationAndAdaptation(
  input: AIComponentIntegrationAndAdaptationInput
): Promise<AIComponentIntegrationAndAdaptationOutput> {
  return aiComponentIntegrationAndAdaptationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'integrateReactComponentPrompt',
  input: { schema: AIComponentIntegrationAndAdaptationInputSchema },
  output: { schema: AIComponentIntegrationAndAdaptationOutputSchema },
  prompt: `You are an expert AI assistant specialized in integrating React components into existing web applications. Your task is to take a given React component, integrate it into provided HTML, CSS, and JavaScript, resolve any conflicts, and manage dependencies.

Here is the existing HTML:
\`\`\`html
{{{existingHtml}}}
\`\`\`

Here is the existing CSS:
\`\`\`css
{{{existingCss}}}
\`\`\`

Here is the existing JavaScript/TypeScript (JSX):
\`\`\`jsx
{{{existingJs}}}
\`\`\`

Here is the React component code to integrate:
\`\`\`jsx
{{{componentCode}}}
\`\`\`

The name of the component is: 
\
\`{{{componentName}}}\`

.
Here are the instructions for where and how to integrate the component: "{{{integrationPointDescription}}}".

If there are any known dependencies, they are: 
\
\`{{{dependencies}}}\`

. Analyze the provided component code for additional dependencies if none are listed or to confirm the listed ones.

When integrating, consider the following:
1.  **Placement**: Integrate the component exactly as described in the integration instructions within the 
\
\`existingHtml\`

 and 
\
\`existingJs\`

.
2.  **Conflict Resolution**: Identify and resolve any potential style or prop conflicts between the existing code and the new component. Adapt the component's props or the surrounding styles to ensure seamless integration and visual consistency. Update 
\
\`updatedCss\`

 accordingly.
3.  **Dependencies**: Automatically identify any required NPM packages based on the component code (e.g., 'framer-motion') and include them in the 
\
\`dependenciesToInstall\`

 array. If 
\
\`dependencies\`

 are provided, verify them and add any missing ones.
4.  **Imports and Usage**: Ensure the component is correctly imported and used within the 
\
\`updatedJs\`

 code. The 
\
\`updatedJs\`

 should include both the definition of the 
\
\`{{{componentName}}}\`

 component (if it's not already in 
\
\`existingJs\`

) and its instantiation at the specified integration point.
5.  **Return Format**: Provide the updated HTML, CSS, and JavaScript, along with a list of dependencies to install, in the specified JSON format.

Produce only the JSON output. Do not include any additional text or explanations.`,
});

const aiComponentIntegrationAndAdaptationFlow = ai.defineFlow(
  {
    name: 'aiComponentIntegrationAndAdaptationFlow',
    inputSchema: AIComponentIntegrationAndAdaptationInputSchema,
    outputSchema: AIComponentIntegrationAndAdaptationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
