/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* DO NOT REMOVE THE ABOVE LINES! The script in the addEventListener is necessary for Twitch
* and therefore the const in there is supposedly unused in our code, but it is used in Twitch's
* embed code */
import React, { useEffect } from 'react';

declare const document: Document;
declare const window: any;
const TWITCH_PLAYER_URL = 'https://player.twitch.tv/js/embed/v1.js';

interface StreamPlayerProps {
  id: string;
  userName: string;
  userAvatar: string;
  sourceImg: string;
  isLive: boolean;
}

const StreamPlayer = ({
  userName,
  userAvatar,
  sourceImg,
  isLive,
}: StreamPlayerProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute(
      'src',
      TWITCH_PLAYER_URL
    );
    script.setAttribute('type', 'text/javascript');
    script.addEventListener('load', () => {
      // need const... but typescript complains if it is there. if I take it out, player won't play

      const embed = new window.Twitch.Player('twitch-stream', {
        channel: `${userName}`,
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
