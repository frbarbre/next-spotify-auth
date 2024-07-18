'use server';

import { api } from '@/services/spotify';

export async function play() {
  try {
    await api('/me/player/play', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
