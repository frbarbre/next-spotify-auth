import { redirect } from 'next/navigation';

import { Session } from '@/utils';
import Player from '@/components/player';

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = Session.get();
  if (!session) redirect('/login');
  return (
    <>
      <header>
        <h1>Spotify</h1>
        <div>
          <a href="/logout">Logout</a>
        </div>
        {JSON.stringify(Session.get())}
      </header>
      {children}
      <Player tokens={session} />
    </>
  );
}
