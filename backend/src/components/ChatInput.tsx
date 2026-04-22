
import { useState, type ChangeEvent } from 'react';
import './ChatInput.css';

// Just to remove the underline
declare global {
  interface Window {
    Chatbot: any;
  }
}

interface ChatInputProps {
  chatMessages: {
    message: string;
    sender:  string;
    id: string;
  }[];
   setChatMessages: (messages: {
    message: string;
    sender: string;
    id: string;
  }[]) => void;
};

function ChatInput({chatMessages, setChatMessages}: ChatInputProps) {
    
  const [inputText, setInputText] = useState('');

  function saveInputText(event: ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value)
  }

  function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ]
    setChatMessages(newChatMessages);
   
    const response = window.Chatbot.getResponse(inputText);
     setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'chatbot',
        id: crypto.randomUUID()
      }
    ]);

    setInputText('');
  }

  return (
    <div className="chat-input-container">
      <input 
        className="chat-input" 
        placeholder="Send a message to Chatbot" 
        onChange={saveInputText}
        value={inputText}
      />
      <button 
        className="send-button"
        onClick={sendMessage}
      >
      Send
      </button>
    </div>
  );
}

export default ChatInput;