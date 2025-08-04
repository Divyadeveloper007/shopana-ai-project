// import React, { createContext, useContext, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// const ChatContext = createContext();

// export const useChat = () => {
//   const context = useContext(ChatContext);
//   if (!context) {
//     throw new Error('useChat must be used within a ChatProvider');
//   }
//   return context;
// };

// export const ChatProvider = ({ children }) => {
//   const [chats, setChats] = useState([]);
//   const [currentChatId, setCurrentChatId] = useState(null);
//   const [messages, setMessages] = useState({});

//   const createNewChat = () => {
//     const chatId = uuidv4();
//     const newChat = {
//       id: chatId,
//       title: 'New Chat',
//       createdAt: new Date().toISOString(),
//       lastMessage: null
//     };
    
//     setChats(prev => [newChat, ...prev]);
//     setCurrentChatId(chatId);
//     setMessages(prev => ({ ...prev, [chatId]: [] }));
    
//     return chatId;
//   };

//   const addMessage = (chatId, message) => {
//     setMessages(prev => ({
//       ...prev,
//       [chatId]: [...(prev[chatId] || []), { ...message, id: uuidv4(), timestamp: new Date().toISOString() }]
//     }));

//     // Update chat title and last message
//     setChats(prev => prev.map(chat => 
//       chat.id === chatId 
//         ? { ...chat, title: message.text?.slice(0, 30) + '...' || 'Image Analysis', lastMessage: message.text || 'Image uploaded' }
//         : chat
//     ));
//   };

//   const deleteChat = (chatId) => {
//     setChats(prev => prev.filter(chat => chat.id !== chatId));
//     setMessages(prev => {
//       const newMessages = { ...prev };
//       delete newMessages[chatId];
//       return newMessages;
//     });
    
//     if (currentChatId === chatId) {
//       setCurrentChatId(null);
//     }
//   };

//   const getCurrentMessages = () => {
//     return currentChatId ? messages[currentChatId] || [] : [];
//   };

//   const value = {
//     chats,
//     currentChatId,
//     setCurrentChatId,
//     messages,
//     createNewChat,
//     addMessage,
//     deleteChat,
//     getCurrentMessages
//   };

//   return (
//     <ChatContext.Provider value={value}>
//       {children}
//     </ChatContext.Provider>
//   );
// };
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, getPosterHistory } from '../api/auth';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState({});
  const [currentChatId, setCurrentChatId] = useState(null);



  // 🔒 Utility to remove non-serializable fields
  const safeStringify = (value) => {
    return JSON.stringify(value, (key, val) => {
      if (
        typeof val === "object" &&
        val !== null &&
        (val instanceof File ||
         val instanceof Blob ||
         val instanceof HTMLElement ||
         val instanceof Window)
      ) {
        return undefined;
      }
      return val;
    });
  };

 
  useEffect(() => {
    if (currentChatId) {
      localStorage.setItem("chatbot_currentChatId", currentChatId);
    } else {
      localStorage.removeItem("chatbot_currentChatId");
    }
  }, [currentChatId]);

  const addMessage = (chatId, message) => {
    setMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message],
    }));
  };

  const createChat = (chatName) => {
    const newChat = {
      id: Date.now().toString(),
      name: chatName,
    };
    setChats((prev) => [...prev, newChat]);
    setMessages((prev) => ({ ...prev, [newChat.id]: [] }));
    setCurrentChatId(newChat.id);
    return newChat.id;
  };

  const deleteChat = (chatId) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    setMessages((prev) => {
      const updated = { ...prev };
      delete updated[chatId];
      return updated;
    });

    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }

    const storedChats = JSON.parse(localStorage.getItem("chatbot_chats") || "[]");
    const updatedChats = storedChats.filter((chat) => chat.id !== chatId);
    localStorage.setItem("chatbot_chats", safeStringify(updatedChats));

    const storedMessages = JSON.parse(localStorage.getItem("chatbot_messages") || "{}");
    delete storedMessages[chatId];
    localStorage.setItem("chatbot_messages", safeStringify(storedMessages));

    if (localStorage.getItem("chatbot_currentChatId") === chatId) {
      localStorage.removeItem("chatbot_currentChatId");
    }
  };


useEffect(() => {
  const fetchHistoryAsChats = async () => {
    const brandId = localStorage.getItem("brand_id");
    if (!brandId) return;

    const history = await getPosterHistory(brandId);

    const convertedChats = history.map((entry) => ({
      id: entry._id,
      name: entry.headline || "Untitled Poster",
      poster: {
        image_url: entry.image_url,
        base64url: entry.base64url,
        original_base64url: entry.original_base64url,
        prompt: entry.prompt_raw,
        style: entry.style,
      },
      created_at: entry.created_at,
    }));

    // Set to chat list
    setChats(convertedChats);

    // Inject messages for each chat
    const initialMessages = {};
    for (const chat of convertedChats) {
    initialMessages[chat.id] = [
  {
    id: `${chat.id}-user`,
    type: "user",
    text: chat.poster.prompt,
    image: chat.poster.original_base64url, // this shows correctly ✅
    timestamp: chat.created_at,
  },
  {
    id: `${chat.id}-bot`,
    type: "bot",
    text: `**${chat.name}**`,
    generatedImage: chat.poster.base64url?.startsWith('data:image/')
      ? chat.poster.base64url
      : `/${api}/${chat.poster.image_url}`,
    timestamp: chat.created_at,
  },
];

    }

    setMessages(initialMessages);
  };

  fetchHistoryAsChats();
}, []);


  return (
    <ChatContext.Provider
      value={{
        chats,
        messages,
        currentChatId,
        addMessage,
        createChat,
        deleteChat,
        setCurrentChatId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat    = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
