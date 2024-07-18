import Play from '@/components/play';
import { api } from '@/services/spotify';
import Link from 'next/link';

export default async function Dashboard() {
  const { data } = await api('/me/playlists');

  return (
    <main>
      <h2>Dashboard</h2>
      <Play />
      <Link href={'/another_page'}>Go to Another Page</Link>
      {/* {JSON.stringify(data)} */}
    </main>
  );
}
