import { Message } from "../@types/globales";

type Props = {
  messages: Message[];
};

const MessageList: React.FC<Props> = ({ messages }) => (
  <div className="col-span-full">
    {messages.map((msg) => (
      <div key={msg.id} className={`message text-center ${msg.style} ${msg.fading ? 'fade-out' : ''}`}>
        {msg.text}
      </div>
    ))}
  </div>
);

export default MessageList;