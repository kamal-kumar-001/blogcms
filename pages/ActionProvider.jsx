// in ActionProvider.jsx
import React from 'react';
import axios from 'axios';
import { createCustomMessage } from 'react-chatbot-kit';
// import CustomMessage from './customMessage';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleDog = () => {
    const botMessage = createChatBotMessage(
      "Here's a nice dog picture for you!",
      {
        widget: 'dogPicture',
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleAi = async (message) => {
        const response = await axios.post('/api/gpt', { prompt: message })
        const botResponse = response.data;
        const botMessage = createChatBotMessage(
          <div dangerouslySetInnerHTML={{ __html: botResponse }}></div>
          );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleCustom = () => {
    const botMessage = createCustomMessage("botResponse", 'custom');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  

  

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleDog,
            handleAi,
            handleCustom,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;