import React, { useState, useEffect } from 'react';
import { useRef } from 'react'
import {RiMessage3Fill} from "react-icons/ri"
import axios from 'axios';
import {BiSend} from 'react-icons/bi'
// import './Chatbot.css';

const Chatbot = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }



  const [userInput, setUserInput] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    chatHistoryRef.current.style.overflow = 'auto';
    chatHistoryRef.current.style.msOverflowStyle = 'none';
    chatHistoryRef.current.style.scrollbarWidth = 'none';
  }, [chatbotResponse]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    try {
      const response = await axios.post('/api/gpt', { prompt: userInput });
      setIsLoading(false);
      setChatbotResponse([...chatbotResponse, { user: userInput, bot: response.data, time }]);
    }
    catch (error) {
      setIsLoading(false);
      console.log(error);
      let errorMessage = "Sorry, I encountered an error while searching for your query.";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      setChatbotResponse([...chatbotResponse, { user: userInput, bot: errorMessage, time }]);
    }
    setUserInput('');
  }

  const chatHistoryRef = useRef(null);

  useEffect(() => {
    chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
  }, [chatbotResponse]);

  const scrollToBottom = () => {
    chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
  }

  const [showButton, setShowButton] = useState(true);
  const handleScroll = (event) => {
    if (event.target.scrollTop + event.target.clientHeight === event.target.scrollHeight) {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  }

  // new function 
  const [chatHistory, setChatHistory] = useState([]);
  const [showDefault, setShowDefault] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("chatbot_opened") === null || localStorage.getItem('chat_history') === null) {
      setShowDefault(true);
      localStorage.setItem("chatbot_opened", true);
    }
    else {
      setShowDefault(false);
      let history = localStorage.getItem('chat_history');
      if (history !== null) {
        setChatHistory(JSON.parse(history));
      }
    }
  }, []);

  const clearChat = () => {
    const inputField = document.getElementById('user-input');
    inputField.value = "";
    localStorage.removeItem('chat_history');
    setChatHistory([]);
    setShowDefault(true);
  }


  const handleOptionSelect = (optionText) => {
    setShowDefault(false);
    setUserInput(optionText);

  }
  const handleOptionSubmit = (e) => {
    const optionText = e.currentTarget.textContent;
    handleOptionSelect(optionText);
    // handleSubmit(optionText);
  }



  return (
    <div>
      <style jsx global>
        {`.chatbot-container {
  max-width: 410px;
  border-radius: 10px;
  background: rgb(234, 238, 243);
  box-shadow: 0 4px 16px rgb(0 0 0 / 25%);
  /* padding: 20px; */
  display: none;
}

.chatbot-history {
  // height: 400px;
  // padding: 10px;
  overflow-y: scroll;
}

.chatbot-message-container {
  /* display: flex; */
  /* align-items: flex-start; */
  margin-bottom: 10px;
  /* flex-wrap:wrap; */
}

.chatbot-message-user {
  /* width: 75%; */
  padding: 10px;
  border-radius: 20px 20px 0 20px;
  background-color: #057dcd;
  color: white;
  margin-bottom: 10px;
}

.chatbot-message-user-text {
  white-space: pre-wrap;
  text-align: right;
}

.chatbot-message-bot {
  /* width: 75%; */
  padding: 10px;
  border-radius: 20px 20px 20px 0;
  background-color: #e5e5e5;
  margin-bottom: 10px;
}

.chatbot-message-bot-text {
  white-space: pre-wrap;
}

.chatbot-input-container {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: gray;
  /* border-radius:  0 0 10px 10px; */
}

.chatbot-input {
  flex-grow: 1;
  padding: 10px;
  padding-right: 35px;
  border-radius: 10px;
  border: 1px solid;
  /* margin-right: 10px; */
}

.chatbot-button {
  color: #fff;
  border: none;
  background: transparent;
  padding: 10px 8px;
  /* border-radius: 5px; */
  font-size: 14px;
  cursor: pointer;
  /* margin-right: 10px; */
  margin-left: -36px;
}

.chatbot-send-button {
  width: 20px;
}

.chatbot-loading{
  padding-bottom: 10px;
  font-weight: 700;
}

/* .chatbot-button:hover {
    background-color: #3E8E41;
} */

.chatbot-loading {
  text-align: center;
  // margin-top: 10px;
}

.chatbot-message-time {
  font-size: 12px;
  text-align: right;
  color: gray;
  margin-top: 5px;
  margin-bottom: -5px;
}

.chatbot-img {
  width: 120px;
}

.chatbot-dialogue-box {
  transition: all .3s ease-in-out;
}

.open .chatbot-dialogue-box {
  height: 80%;
  transition: all 1.3s ease-in-out;
}

.open .chatbot-container {
  display: block;
}

.chatbot-header {
  display: flex;
  background-color: #fff;
  color: #333;
  padding: 10px;
  text-align: right;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px 10px 0 0;
}

.chatbot-close-button {
  background: transparent;
  border: 0;
  color: #333;
  font-size: 1.5em;
  outline: none;
  cursor: pointer;
}

.chat-bubble {
  // margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
}

.clear-chat-button {
  width: 100%;
  background-color: #057dcd;
  color: #fff;
  border: none;
  padding: 10px 20px;
  /* border-radius: 5px; */
  font-size: 14px;
  border-radius: 0 0 10px 10px;
  cursor: pointer;
  font-weight: 800;
}

.chatbot-option {
  display: block;
  margin-bottom: 10px;
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}
/* arrow down */
.scroll-to-bottom {
  position: absolute;
  bottom: 98px;
  height: 31px;
  width: 35px;
  left: 385px;
  font-weight: bold;
  font-size: 36px;
  /* padding: 10px; */
  background: white;
  color: #000;
  border-radius: 50%;
  border: none;
  cursor: pointer;
}

/* .arrow-down{
  font-size:20px;
} */

/* .scroll-to-bottom {
  display: none;
}

.chat-history:not(:last-child) .scroll-to-bottom {
  display: block;
} */

/* adding animations */
/* Add a fade-in animation to the chatbot container when it appears on the screen */
.chatbot-container {
  animation: fadeIn 1s;
}

/* Add a slide-in animation to the chatbot messages when they appear on the screen */
.chatbot-message {
  animation: slideIn 1s;
}

/* Add a rotate animation to the hamburger icon when it is clicked */
.hamburger:active {
  animation: rotate 0.5s;
}

/* Add a shake animation to the cross icon when it is clicked */
.cross:active {
  animation: shake 0.5s;
}

/* Define the fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* Define the slide-in animation */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

/* Define the pulse animation */
@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

/* Define the rotate animation */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}`}
      </style>
      <div className='chatbot-img fixed right-4 bottom-4 z-20'   onClick={handleClick}> 
      <RiMessage3Fill size={50}  />
      </div>
      
      <div className={`chatbot-dialogue-box  fixed right-4 bottom-4 z-20 ${isOpen ? 'open h-3/4' : ''}`}>
        <div className={`chatbot-container ${isOpen ? 'open h-3/4' : ''}`}>
          <div className="chatbot-header">
            <div className=''>ChatBot</div>
            <button className="chatbot-close-button" onClick={handleClick}>&times;</button>
          </div>

          <div className="chatbot-history" ref={chatHistoryRef} onScroll={handleScroll} >
            {chatHistory.map((message, index) => (
              <div key={index} className="chat-bubble">{message}</div>
              
            ))}
            <div className="chatbot-default" style={{ display: showDefault ? 'block' : 'none' }}>
              <p>Hi, How may I help you?</p>
              <div className="chatbot-options">
                <div onClick={handleOptionSubmit} className="chatbot-option">I want to know how do you work?</div>
                <div onClick={(e) => handleOptionSelect(e.currentTarget.textContent)} className="chatbot-option">I want to ask a question</div>
                <div onClick={(e) => handleOptionSelect(e.currentTarget.textContent)} className="chatbot-option">I want to provide feedback</div>
              </div>
            </div>
            {chatbotResponse.map((message, index) => (
              <div key={index} className="chatbot-message-container">
                <div className="chatbot-message-container">
                  <div className="chatbot-message-user">
                    <div className="chatbot-message-user-text">{message.user}</div>
                    <div className="chatbot-message-time">{message.time}</div>
                  </div>
                  <div className="chatbot-message-bot">
                    <div className="chatbot-message-bot-text">{message.bot}</div>
                    <div className="chatbot-message-time">{message.time}</div>
                  </div>
                </div>

              </div>
            ))}
            {showButton ? <button className="scroll-to-bottom" onClick={scrollToBottom}>
              {/* <i className="arrow-down"></i>*/}ꜜ
            </button> : null}
          </div>
          {isLoading ? <div className="chatbot-loading">Loading...</div> : (
            <form onSubmit={handleSubmit}>
              <div className="chatbot-input-container">
                <input required id='user-input' ref={el => inputRef.current = el} className="chatbot-input" type="text" placeholder="Type your Question here" value={userInput} onChange={handleInputChange} />
                <button className="chatbot-button" type="submit">
                  <BiSend className='chatbot-send-button' size={30}/>
                  {/* <img className='chatbot-send-button' src={Send} alt="send" /> */}
                </button>
              </div>
            </form>
          )}
          <button className="clear-chat-button" onClick={clearChat}>Restart the Chat</button>
        </div>
      </div>
    </div>

  );
};

export default Chatbot;



