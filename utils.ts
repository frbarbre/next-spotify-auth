import type { NextRequest, NextResponse } from 'next/server';
import * as headers from 'next/headers';
import qs from 'query-string';

type SessionData = {
  access_token: string;
  refresh_token: string;
};

export function env() {
  return {
    CLIENT_ID: process.env.CLIENT_ID!,
    CLIENT_SECRET: process.env.CLIENT_SECRET!,
    REDIRECT_URI: process.env.REDIRECT_URI!,
  };
}

export function cookies(obj?: NextRequest | NextResponse) {
  return obj?.cookies || headers.cookies();
}

export function getAuthorizeUrl(
  scope = 'user-read-private user-read-email playlist-read-private streaming user-modify-playback-state user-read-playback-state user-library-read user-library-modify',
) {
  const { CLIENT_ID, REDIRECT_URI } = env();

  return `https://accounts.spotify.com/authorize?${qs.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope,
    show_dialog: true,
    redirect_uri: REDIRECT_URI,
  })}`;
}

export const Session = {
  key: 'session',
  set(data: SessionData | null, res?: NextResponse) {
    if (data === null) return cookies(res).set(Session.key, '', { expires: new Date(0) });
    return cookies(res).set(Session.key, Session._stringify(data), { httpOnly: true });
  },
  get(req?: NextRequest) {
    const value = cookies(req).get(Session.key)?.value;
    return Session._parse(value);
  },
  _stringify(data: SessionData) {
    return JSON.stringify({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    } satisfies SessionData);
  },
  _parse(value?: string): SessionData | null {
    return value ? JSON.parse(value) : null;
  },
};
