'use server';

import {
  generateMotivationalMessage,
  type MotivationalMessageInput,
} from '@/ai/flows/motivational-progress-messages';

export async function getMotivationalMessageAction(
  stats: MotivationalMessageInput
) {
  try {
    const result = await generateMotivationalMessage(stats);
    return { success: true, message: result.message };
  } catch (error) {
    console.error('Error generating motivational message:', error);
    return {
      success: false,
      message: 'Failed to generate a message. Please try again.',
    };
  }
}
