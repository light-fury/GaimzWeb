import React, { useEffect } from 'react';

declare const document: Document;
declare const window: any;
declare let embed: any;
const TWITCH_PLAYER_URL = 'https://player.twitch.tv/js/embed/v1.js';
const StreamPlayer = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute(
      'src',
      TWITCH_PLAYER_URL
    );
    script.setAttribute('type', 'text/javascript');
    script.addEventListener('load', () => {
      // need const... but typescript complains if it is there. if I take it out, player won't play
      embed = new window.Twitch.Player('twitch-stream', {
        channel: 'pokimane',
        height: '600px',
        width: '100%',
      });
    });
    document.body.appendChild(script);
  });
  return (
    <div id="twitch-stream" />
  );
};

export default StreamPlayer;
