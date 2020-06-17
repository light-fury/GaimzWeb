import React, { useEffect } from 'react';

declare const document: Document;
declare const window: any;
const TWITCH_CHAT_URL = 'https://www.twitch.tv/embed';

const StreamChat = () => {
  const embedURL = `${TWITCH_CHAT_URL}/pokimane/chat`;
  const chatURL = 'https://www.twitch.tv/embed/loltyler1/chat?parent=z6yyt2tbn36fxromr8j4hbo626a329';
  //   const twitch_Key = 'z6yyt2tbn36fxromr8j4hbo626a329';
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', embedURL);
    document.body.appendChild(iframe);
  });
  return (
    <iframe
      title="twitch-chat"
      id="pokimane"
      src={chatURL}
    //   parent={twitch_Key}
      height="200"
      width="300"
    >
      Hello
    </iframe>
  );
};

export default StreamChat;
