import React from 'react';
import CustomMessage from './customMessage';

const MessageParser = ({ children, actions }) => {
    
  const parse = (message) => {
    // console.log(message);
    // if (message) {
      actions.handleAi(message);
    // }
    if (message.includes('hello')) {
        actions.handleHello();
      }
      if (message.includes('dog')) {
        actions.handleDog();
      }
      if (message.includes('hi')) {
        actions.handleCustom();
      }
//       const [response, setResponse] = useState('');

// const handleUserInput = async (message) => {
//   // Call the GPT-3 API with the user message
//   const result = await fetch(`https://api.openai.com/v1/engines/gpt-3/jobs`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer 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`
//     },
//     body: JSON.stringify({
//       prompt: message,
//       max_tokens: 100,
//       temperature: 0.5,
//     })
//   });
//   const json = await result.json();

//   // Update the chatbot state with the generated response
//   setResponse(json.choices[0].text);
// };
// 1st. argument is the text value, 2nd. argument is the name of the registered custom message.
    
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;