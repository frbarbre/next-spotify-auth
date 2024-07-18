import { api } from '@/services/spotify';
import Link from 'next/link';

export default async function Page() {
  const { data } = await api('/me');

  return (
    <main>
      <Link href={'/dashboard'}>Go to Another Page</Link>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
