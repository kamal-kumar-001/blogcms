// new file called DogPicture.jsx
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gpt = () => {
  const [aiReply, setAiReply] = useState('');

  useEffect(() => {
    fetch('/api/gpt/', { prompt: "hi" })
      .then((res) => res.json())
      .then((data) => {
        setAiReply(data.message);
      });
  }, []);

//   useEffect = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/gpt', { prompt: "hi" });
//       ((res) => res.json())
//       ((data) => {
//         setAiReply(data.message);
//       });
//     //   setChatbotResponse([...chatbotResponse, { user: userInput, bot: response.data }]);
//     }
//     catch (error) {
//       console.log(error);
//       let errorMessage = "Sorry, I encountered an error while searching for your query.";
//       if (error.response) {
//         // errorMessage = error.response.data.message;
//         setAiReply(errorMessage);
//       }
//     //   setChatbotResponse([...chatbotResponse, { user: userInput, bot: errorMessage }]);
//     }
//   }

  return (
    <div>
      {/* <img src={aiReply} alt='a dog' /> */}
      <Link className='text-xl hover:text-blue-500 ' href={'/'}>{aiReply}</Link>
    </div>
  );
};

export default Gpt;