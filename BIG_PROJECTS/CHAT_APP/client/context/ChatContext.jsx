import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";
import toast from "react-hot-toast";
import { useCallback } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios } = useContext(AuthContext);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
        // Clear unseen messages for this user when reading their messages
        setUnseenMessages((prev) => ({
          ...prev,
          [userId]: 0,
        }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendMessages = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );
      if (data.success) {
        
        setMessages((prevMessages) => [...prevMessages, data.newMessage]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  

  const subscribeToMessages = useCallback(() => {
    if (!socket) return;
    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        const messageWithSeen = { ...newMessage, seen: true };
        setMessages((prevMessages) => [...prevMessages, messageWithSeen]);
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        // Add to messages if it's from someone else and increment unseen count
        setUnseenMessages((prevUnseenMessages) => ({
          ...prevUnseenMessages,
          [newMessage.senderId]: (prevUnseenMessages[newMessage.senderId] || 0) + 1,
        }));
      }
    });
  }, [socket, selectedUser, setMessages, setUnseenMessages, axios]);

  const unsubcribeFromMessages = useCallback(() => {
    if (socket) socket.off("newMessage");
  }, [socket]);

  useEffect(() => {
    subscribeToMessages();
    return () => unsubcribeFromMessages();
  }, [socket, selectedUser, subscribeToMessages, unsubcribeFromMessages]);

  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    getMessages,
    sendMessages,
    setSelectedUser: (user) => {
      setSelectedUser(user);
      if (user) {
        // Clear unseen messages immediately when user is selected
        setUnseenMessages((prev) => ({
          ...prev,
          [user._id]: 0,
        }));
      }
    },
    unseenMessages,
    setUnseenMessages,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;