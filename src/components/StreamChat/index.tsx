import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { getCurrentStreamer } from 'src/features/feed';

declare const document: Document;
declare const window: any;

interface StreamPlayerProps {
  id: string;
  userName: string;
  userAvatar: string;
  sourceImg: string;
  isLive: boolean;
}
const StreamChat = ({
  userName,
//   userAvatar,
//   sourceImg,
//   isLive,
}: StreamPlayerProps) => {
  const dispatch = useDispatch();
  const chatURL = `http://twitch.tv/embed/${userName}/chat?parent=${window.location.hostname}`;
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', chatURL);
    iframe.setAttribute('style', 'width: 350px');
    iframe.setAttribute('style', 'height: 600px');
    document.getElementById('twitch-chat')!.appendChild(iframe);
    return () => {
      dispatch(getCurrentStreamer(null));
    };
  }, [dispatch, chatURL]);
  return (
    <div id="twitch-chat" />
  );
};

export default StreamChat;
