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
  solvedProblemOfTheDay: z
    .boolean()
    .describe('Whether the user has solved the problem of the day.'),
});
export type MotivationalMessageInput = z.infer<typeof MotivationalMessageInputSchema>;

const MotivationalMessageOutputSchema = z.object({
  title: z.string().describe('A short, catchy title for the message.'),
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
  prompt: `You are a LeetCode motivational coach. Your goal is to generate a personalized motivational message for the user, {{username}}, based on their progress.

Current LeetCode Statistics:
- Contest Rating: {{contestRating}}
- Problems Solved: {{problemsSolved}}
- Current Streak: {{currentStreak}}
- Solved Problem of the Day: {{solvedProblemOfTheDay}}

{{#if solvedProblemOfTheDay}}
  The user HAS solved the problem of the day. Generate a message that does the following:
  1. Congratulate them on their consistency (e.g., "Great work!", "Consistency is key!").
  2. Mention their current streak day (e.g., "That's {{currentStreak}} days in a row!").
  3. Encourage them about their next badge. The next major badge is at 100 days. Calculate how many days are left to reach the 100-day badge. (e.g., "You're only ${100 - Number("{{currentStreak}}")} days away from the 100-day badge!").
  4. Suggest solving more problems. Calculate how many more problems they could solve by the end of the year (December 31st) if they solve 2 more problems today and maintain that pace. Today is ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}. The end of the year is December 31st.
  5. The title should be encouraging and positive.
{{else}}
  The user HAS NOT solved the problem of the day yet.
  1. Generate a message encouraging them to solve it to keep their streak alive.
  2. Keep it short and motivating.
  3. The title should be a call to action.
{{/if}}

Keep the overall tone positive, friendly, and highly encouraging.
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
