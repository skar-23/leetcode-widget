'use server';

/**
 * @fileOverview A flow that generates personalized motivational messages based on LeetCode progress.
 *
 * - generateMotivationalMessage - A function that generates a motivational message.
 * - MotivationalMessageInput - The input type for the generateMotivationalMessage function.
 * - MotivationalMessageOutput - The return type for the generateMotivationalMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MotivationalMessageInputSchema = z.object({
  username: z.string().describe('The LeetCode username of the user.'),
  contestRating: z.number().describe('The current contest rating of the user.'),
  globalRanking: z.number().describe('The global ranking of the user.'),
  problemsSolved: z.number().describe('The number of problems solved by the user.'),
  problemsAttempted: z.number().describe('The number of problems attempted by the user.'),
  currentStreak: z.number().describe('The current LeetCode streak of the user.'),
});
export type MotivationalMessageInput = z.infer<typeof MotivationalMessageInputSchema>;

const MotivationalMessageOutputSchema = z.object({
  message: z.string().describe('The personalized motivational message.'),
});
export type MotivationalMessageOutput = z.infer<typeof MotivationalMessageOutputSchema>;

export async function generateMotivationalMessage(
  input: MotivationalMessageInput
): Promise<MotivationalMessageOutput> {
  return motivationalMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'motivationalMessagePrompt',
  input: {schema: MotivationalMessageInputSchema},
  output: {schema: MotivationalMessageOutputSchema},
  prompt: `Based on the following LeetCode progress of user {{username}}, generate a personalized motivational message to encourage them to continue practicing.

LeetCode Statistics:
- Contest Rating: {{contestRating}}
- Global Ranking: {{globalRanking}}
- Problems Solved: {{problemsSolved}}
- Problems Attempted: {{problemsAttempted}}
- Current Streak: {{currentStreak}}

The motivational message should be encouraging, highlighting the benefits of continuous practice and acknowledging their progress.
`,
});

const motivationalMessageFlow = ai.defineFlow(
  {
    name: 'motivationalMessageFlow',
    inputSchema: MotivationalMessageInputSchema,
    outputSchema: MotivationalMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
