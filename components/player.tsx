'use client';

import { getRefreshToken } from '@/services/auth';
import { useState } from 'react';
import SpotifyWebPlayer, { Props } from 'react-spotify-web-playback';

export default function Player({
  tokens,
}: {
  tokens: { access_token: string; refresh_token: string };
}) {
  const [accessToken, setAccessToken] = useState(tokens.access_token);
  const [repeat, setRepeat] = useState('');
  const [shuffle, setShuffle] = useState(false);
  const [expiresAt, setExpiresAt] = useState(0);

  const getOAuthToken: Props['getOAuthToken'] = async (callback) => {
    if (expiresAt > Date.now()) {
      callback(accessToken);

      return;
    }

    const { access_token, expires_in } = await getRefreshToken(tokens.refresh_token);

    setAccessToken(access_token);
    setExpiresAt(Date.now() + expires_in * 1000);

    callback(access_token);
  };

  return (
    <div style={{ position: 'fixed', bottom: '0', left: '0', right: '0' }}>
      <SpotifyWebPlayer
        uris={[]}
        callback={(state) => {
          setRepeat(state.repeat);
          setShuffle(state.shuffle);
        }}
        getOAuthToken={getOAuthToken}
        token={accessToken}
        name="Next Cool Player"
        hideAttribution={true}
        styles={{
          bgColor: '#000',
          color: '#fff',
          trackNameColor: '#fff',
          sliderColor: '#1cb954',
          sliderHandleColor: '#fff',
          activeColor: '#1cb954',
        }}
        showSaveIcon={true}
        syncExternalDevice={true}
        syncExternalDeviceInterval={1000}
        persistDeviceSelection={true}
        components={{
          leftButton: (
            <button
              onClick={() => {
                console.log('Previous');
              }}
            >
              Shuffle
            </button>
          ),
          rightButton: (
            <button
              onClick={() => {
                console.log('Next');
              }}
            >
              Loop
            </button>
          ),
        }}
      />
    </div>
  );
}
