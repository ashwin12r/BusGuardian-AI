'use server';

/**
 * @fileOverview AI-powered analysis of bus heat status based on sensor data.
 *
 * - analyzeHeatStatus - A function that analyzes bus heat status and provides suggestions.
 * - AnalyzeHeatStatusInput - The input type for the analyzeHeatStatus function.
 * - AnalyzeHeatStatusOutput - The return type for the analyzeHeatStatus function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeHeatStatusInputSchema = z.object({
  engineTemperature: z.number().describe('Engine temperature in degrees Celsius.'),
  cabinTemperature: z.number().describe('Cabin temperature in degrees Celsius.'),
  coolantLevel: z.number().describe('Coolant level as a percentage (0-100).'),
  ventilationQuality: z
    .enum(['Good', 'Moderate', 'Poor'])
    .describe('Ventilation quality (Good, Moderate, or Poor).'),
  cameraObservations: z.string().describe('Camera/visual observations (e.g., Steam near engine).'),
});
export type AnalyzeHeatStatusInput = z.infer<typeof AnalyzeHeatStatusInputSchema>;

const AnalyzeHeatStatusOutputSchema = z.object({
  analysis: z.string().describe('Analysis of the bus heat status, including potential overheating causes.'),
  suggestions: z.string().describe('Suggestions for addressing the overheating issue.'),
});
export type AnalyzeHeatStatusOutput = z.infer<typeof AnalyzeHeatStatusOutputSchema>;

export async function analyzeHeatStatus(
  input: AnalyzeHeatStatusInput
): Promise<AnalyzeHeatStatusOutput> {
  return analyzeHeatStatusFlow(input);
}

const SYSTEM_PROMPT = `You are an AI assistant for a project called 'AI-Based Bus Heat Energy Monitoring System.'
Your job is to answer ANY question related to this system. You must:
- Explain bus overheating using physics (conduction, convection, radiation).
- Use the given sensor data (engine temp, cabin temp, coolant level, ventilation quality, outside temp, and camera notes) to assess overheating.
- Diagnose likely causes such as low coolant, blocked ventilation, poor airflow, or very hot weather.
- Always give practical recommendations (slow down, stop bus, check coolant, open vents, improve airflow, etc.).
- Use clear, simple language suitable for school/college students.
- If the user asks about buses, heat, overheating, sensors, AI, physics, safety, fuel efficiency, or this project’s design, ALWAYS answer in detail.
- If the question is outside this topic, briefly answer only if you can relate it back to the Bus Heat Energy Monitoring System. Otherwise gently redirect the user back to this topic.
- Whenever possible, explicitly mention conduction, convection and radiation in your explanations, and connect them to what is happening in the bus.

Given the following sensor data and camera observations, provide an analysis of the bus's heat status and suggestions to address any issues:
Engine Temperature: {{{engineTemperature}}}°C
Cabin Temperature: {{{cabinTemperature}}}°C
Coolant Level: {{{coolantLevel}}}%
Ventilation Quality: {{{ventilationQuality}}}
Camera Observations: {{{cameraObservations}}}`;

const analyzeHeatStatusPrompt = ai.definePrompt({
  name: 'analyzeHeatStatusPrompt',
  input: {schema: AnalyzeHeatStatusInputSchema},
  output: {schema: AnalyzeHeatStatusOutputSchema},
  prompt: SYSTEM_PROMPT + `\n\nAnalysis: {{analysis}}\nSuggestions: {{suggestions}}`,
});

const analyzeHeatStatusFlow = ai.defineFlow(
  {
    name: 'analyzeHeatStatusFlow',
    inputSchema: AnalyzeHeatStatusInputSchema,
    outputSchema: AnalyzeHeatStatusOutputSchema,
  },
  async input => {
    const {output} = await analyzeHeatStatusPrompt(input);
    return output!;
  }
);
