import React, { useEffect } from 'react';

declare const document: Document;
declare const window: any;
// const TWITCH_CHAT_URL = 'https://www.twitch.tv/embed';

const StreamChat = () => {
//   const embedURL = `${TWITCH_CHAT_URL}/pokimane/chat`;
  const chatURL = `http://twitch.tv/embed/loltyler1/chat?parent=${window.location.hostname}`;
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', chatURL);
    iframe.setAttribute('style', 'width: 300px');
    iframe.setAttribute('style', 'height: 500px');
    iframe.setAttribute('X-Frame-Options', 'deny');
    // document.body.appendChild(iframe);
    document.getElementById('twitch-chat')!.appendChild(iframe);
  });
  return (
    <div id="twitch-chat">
      hello
    </div>
  );
};

export default StreamChat;


// title: `${id} chat`,
// key: `${id} chat - ${isDarkMode ? "Dark mode" : "Light mode"}`,
// src: `https://www.twitch.tv/embed/${id}/chat?parent=${
//   window.location.hostname
// }${isDarkMode ? "&darkpopout" : ""}`
