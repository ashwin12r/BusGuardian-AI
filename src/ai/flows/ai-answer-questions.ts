'use server';

/**
 * @fileOverview This file defines a Genkit flow for answering questions about the AI-Based Bus Heat Energy Monitoring System.
 *
 * The flow takes a user's question, system prompt, sensor data, and conversation history as input.
 * It then uses the Gemini API to generate a response based on the provided context.
 *
 * @interface AIAnswerQuestionsInput - The input type for the aiAnswerQuestions function.
 * @interface AIAnswerQuestionsOutput - The output type for the aiAnswerQuestions function.
 * @function aiAnswerQuestions - The main function that calls the aiAnswerQuestionsFlow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIAnswerQuestionsInputSchema = z.object({
  question: z.string().describe('The user question about the Bus Heat Energy Monitoring System.'),
  systemPrompt: z.string().describe('The system prompt to guide the chatbot.'),
  sensorData: z.string().describe('The latest sensor values.'),
  conversationHistory: z
    .string()
    .describe('The conversation history to provide context to the chatbot.'),
});

export type AIAnswerQuestionsInput = z.infer<typeof AIAnswerQuestionsInputSchema>;

const AIAnswerQuestionsOutputSchema = z.object({
  answer: z.string().describe('The AI chatbot response to the user question.'),
});

export type AIAnswerQuestionsOutput = z.infer<typeof AIAnswerQuestionsOutputSchema>;

export async function aiAnswerQuestions(input: AIAnswerQuestionsInput): Promise<AIAnswerQuestionsOutput> {
  return aiAnswerQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiAnswerQuestionsPrompt',
  input: { schema: AIAnswerQuestionsInputSchema },
  output: { schema: AIAnswerQuestionsOutputSchema },
  prompt: `{{systemPrompt}}\nSensor Data: {{sensorData}}\nConversation History: {{conversationHistory}}\nUser Question: {{question}}`,
});

const aiAnswerQuestionsFlow = ai.defineFlow(
  {
    name: 'aiAnswerQuestionsFlow',
    inputSchema: AIAnswerQuestionsInputSchema,
    outputSchema: AIAnswerQuestionsOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
