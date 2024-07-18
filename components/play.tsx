'use client';

import { play } from '@/actions/playback.actions';
import { usePathname } from 'next/navigation';

export default function Play() {
  return <button onClick={async () => await play()}>Play</button>;
}
