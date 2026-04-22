import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import './ChatMessages.css';

interface ChatMessagesProps {
  chatMessages: {
    message: string;
    sender: string;
    id: string;
  }[];
}

function ChatMessages({chatMessages}: ChatMessagesProps) {

  const chatMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage 
          text={chatMessage.message} 
          sender={chatMessage.sender}
          key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

export default ChatMessages;