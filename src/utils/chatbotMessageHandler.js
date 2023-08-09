// src/utils/chatbotMessageHandler.js

export const handleMessages = (messages) => {
    if (messages[messages.length - 1].message === 'Hi') {
      return [
        { type: 'text', message: 'Hello, how can I assist you today?' },
        { type: 'text', message: 'You can ask me any questions.' },
      ];
    } else if (messages[messages.length - 1].message === 'How are you?') {
      return [
        { type: 'text', message: 'I am just a bot, but thanks for asking!' },
      ];
    }
    // Add more custom message handling logic here
    return [];
  };
  