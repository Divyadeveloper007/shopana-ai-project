// ChatArea.jsx
import React from "react";
import { useChat } from "../../contexts/ChatContext";
import MessageArea from "./MessageArea";
import CurrentChatHeader from "./CurrentChatHeader";

const ChatArea = ({ setCurrentView }) => {
  const { currentChatId } = useChat();

  return (
    <div className="flex flex-col h-full w-full">
      {currentChatId ? (
        <MessageArea  setCurrentView={setCurrentView}/>
       ) : (
       <CurrentChatHeader />
      )}
    </div>
  );
};

export default ChatArea;
