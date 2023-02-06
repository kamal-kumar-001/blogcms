import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
// import config from '../pages/config';
// import actionProvider from '../pages/actionProvider.js';
// import messageParser from '../pages/messageParser.js';

function ChatHistory() {

  const saveMessages = (messages, HTMLString) => {
    console.log(JSON.stringify(messages));
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    return messages;
  };

//   return (
//     <div className='App'>
//         <Chatbot
//           config={config}
//           actionProvider={actionProvider}
//           messageHistory={loadMessages()}
//           messageParser={messageParser}
//           saveMessages={saveMessages}
//         />
//     </div>
//   );
}

export default ChatHistory;