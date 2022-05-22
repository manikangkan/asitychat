import axios from "axios";

import { useEffect, useRef, useState } from "react";
import { allUsersRoute, host } from "../../utils/apiRoutes";

import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

import { useNavigate } from "react-router-dom";

import { io } from "socket.io-client";

const Chat = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  const [contacts, setContacts] = useState([]);

  const [currentChat, setCurrentChat] = useState(undefined);

  const socket = useRef();

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const token = async () => {
      localStorage.getItem("asitychat-user")
        ? setCurrentUser(JSON.parse(localStorage.getItem("asitychat-user")))
        : navigate("/home");
    };
    token();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser?._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const getContacts = async () => {
      if (currentUser.isAvatarImageSet) {
        const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data);
      } else {
        navigate("/setAvatar");
      }
    };
    currentUser && getContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="grid grid-cols-4 h-screen bg-cc-100 dark:bg-neutral-900 ">
      <Contacts
        contacts={contacts}
        currentUser={currentUser}
        changeChat={handleChatChange}
        active={isActive}
      />
      <main className="col-span-3 lg:col-span-2 xl:col-span-3">
        {currentChat === undefined ? (
          <Welcome username={currentUser?.username} />
        ) : (
          <ChatContainer
            currentUser={currentUser}
            currentChat={currentChat}
            socket={socket}
          />
        )}
      </main>
    </div>
  );
};

export default Chat;
