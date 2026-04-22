import userImage from "../assets/user.png";
import chatbotImage from "../assets/robot.png";
import './ChatMessage.css';

interface ChatMessageProps {
    text: string;
    sender:  string;
}

function ChatMessage({text, sender}: ChatMessageProps) {
    return (
      <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-chatbot'}>
        {sender === "chatbot" && (
          <img className="chat-message-profile" src={chatbotImage} />
        )}
        <div className="chat-message-text">
          {text}
        </div>
        {sender === "user" && (
          <img className="chat-message-profile" src={userImage} />
        )}
            
      </div>  
    );
}

export default ChatMessage;