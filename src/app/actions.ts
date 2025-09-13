// Note: Server Actions are disabled to support static export (output: 'export' in next.config.ts)
// To re-enable AI functionality, remove 'output: export' from next.config.ts and update MotivationCard component
// to use this action instead of the static fallback

'use server';

import {
  generateMotivationalMessage,
  type MotivationalMessageInput,
  type MotivationalMessageOutput,
} from '@/ai/flows/motivational-progress-messages';

export async function getMotivationalMessageAction(
  stats: MotivationalMessageInput
): Promise<{ success: true, data: MotivationalMessageOutput } | { success: false, message: string }> {
  try {
    const result = await generateMotivationalMessage(stats);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating motivational message:', error);
    return {
      success: false,
      message: 'Failed to generate a message. Please try again.',
    };
  }
}
