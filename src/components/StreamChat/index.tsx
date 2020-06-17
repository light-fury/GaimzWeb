import React, { useEffect } from 'react';

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
  const chatURL = `http://twitch.tv/embed/${userName}/chat?parent=${window.location.hostname}`;
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', chatURL);
    iframe.setAttribute('style', 'width: 350px');
    iframe.setAttribute('style', 'height: 600px');
    document.getElementById('twitch-chat')!.appendChild(iframe);
  }, [chatURL]);
  return (
    <div id="twitch-chat">
      hello
    </div>
    // <iframe title="hello" src={chatURL} style={{ height: '600px', width: '350px' }} />
  );
};

export default StreamChat;
