// src/components/Chatbot.jsx

import React from 'react';
import { Chatbot } from 'react-chatbot-kit';
import MessageParser from '../utils/MessageParser'; // Import the MessageParser
import ActionProvider from '../utils/ActionProvider'; // Import the ActionProvider

const config = {
  botName: 'Chatbot',
  initialMessages: ['Hi, how can I help you today?'],
  customStyles: {
    // Add custom styles here
  },
};

const ChatbotComponent = () => {
  return (
    <div>
      <h1>Chatbot Example</h1>
      <Chatbot
        config={config}
        messageParser={new MessageParser()} // Pass the MessageParser instance
        actionProvider={new ActionProvider()} // Pass the ActionProvider instance
      />
    </div>
  );
};

export default ChatbotComponent;
