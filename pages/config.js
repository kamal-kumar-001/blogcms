import DogPicture from './DogPicture'
import Gpt from './gpt'
import {
  createChatBotMessage,
  createCustomMessage,
} from 'react-chatbot-kit';
import CustomMessage from './customMessage';
import { RxAvatar } from 'react-icons/rx';

const botName = 'ExcitementBot';

const config = {
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}`),
    // createCustomMessage('Test', 'custom')
  ],
  customComponents: {},
  customMessages: {
    custom: (props) => <CustomMessage {...props} />,
  },
  widgets: [
    {
      widgetName: 'dogPicture',
      widgetFunc: (props) => <DogPicture {...props} />,
    },
    {
      widgetName: 'gpt',
      widgetFunc: (props) => <Gpt {...props} />,
    },
  ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
  customComponents: {
    // Replaces the default header
  //  header: () => <div style={{ backgroundColor: 'red', padding: "5px", borderRadius: "3px" }}>This is the header</div>,
   // Replaces the default bot avatar
  //  botAvatar: (props) => <FlightBotAvatar {...props} />,
   // Replaces the default bot chat message container
  //  botChatMessage: (props) => <CustomChatMessage {...props} />,
   // Replaces the default user icon
  //  userAvatar: (props) => <RxAvatar size={40} {...props} />,
   // Replaces the default user chat message
  //  userChatMessage: (props) => <MyUserChatMessage {...props} />
 },
};

export default config;