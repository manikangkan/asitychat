import { Send } from "../../icons/Send";

import { useEffect, useRef, useState } from "react";

import { recieveMessageRoute, sendMessageRoute } from "../../utils/apiRoutes";

import axios from "axios";

import { v4 as uuidv4 } from "uuid";

import { format } from "timeago.js";

import SignOut from "./SignOut";
import { EmojiMultiple } from "../../icons/EmojiMultiple";
import Contact from "./Contact";

const ChatContainer = ({ currentUser, currentChat, socket }) => {
  const [messageToSend, setMessageToSend] = useState("");
  const [messages, setMessages] = useState([]);

  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await axios.post(recieveMessageRoute, {
        from: currentUser?._id,
        to: currentChat?._id,
      });
      setMessages(data);
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    socket.current.emit("send-msg", {
      from: currentUser?._id,
      to: currentChat?._id,
      message: messageToSend,
    });

    await axios.post(sendMessageRoute, {
      from: currentUser?._id,
      to: currentChat?._id,
      message: messageToSend,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: messageToSend });
    setMessages(msgs);
    setMessageToSend("");
  };

  useEffect(() => {
    socket.current &&
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="h-screen flex flex-col text-cc-400 dark:text-white">
      {/* header */}
      <div className="flex items-center justify-between bg-cc-200 dark:bg-neutral-800 px-8 py-4">
        <div className="flex items-center space-x-4 cursor-pointer">
          <Contact user={currentChat} />
        </div>
        <div className="hidden md:block">
          <SignOut id={currentUser?._id} />
        </div>
      </div>
      {/* chat screen */}
      <div className="p-8 flex-1 overflow-y-scroll space-y-2">
        {messages.length > 0 ? (
          messages.map((message) => {
            return (
              <div
                ref={scrollRef}
                key={uuidv4()}
                className={`flex ${
                  message.fromSelf ? `justify-end` : `justify-start`
                }`}>
                <div className="flex flex-col items-end leading-relaxed space-y-2">
                  <div
                    className={`max-w-4xl px-4 py-2 rounded-sm dark:text-white ${
                      message.fromSelf
                        ? `bg-cc-200 dark:bg-neutral-800`
                        : `bg-cc-400 text-cc-100 dark:bg-violet-600 `
                    }`}>
                    <h2>{message.message}</h2>
                  </div>
                  <span className="text-xs text-cc-400 dark:text-gray-400">
                    {format(message.createdAt)}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="grid place-content-center h-full text-center space-y-2 px-8">
            <div className="flex items-center -space-x-4 mx-auto">
              <img
                src={`data:image/svg+xml;base64,${currentUser?.avatarImage}`}
                alt="current user profile"
                className="w-20 aspect-square border-4 rounded-full border-cc-100 dark:border-neutral-900"
              />
              <img
                src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
                alt="current user profile"
                className="w-20 aspect-square border-4 rounded-full border-cc-100 dark:border-neutral-900"
              />
            </div>
            <h1>Hey {currentUser?.username}, let's chat...</h1>
            <p>
              No messages yet. Start by sending a message to{" "}
              {currentChat?.username}
            </p>
          </div>
        )}
      </div>
      {/* chat input */}
      <form
        onSubmit={handleSubmit}
        className="bg-cc-200 dark:bg-neutral-800 px-8 py-4 flex items-center justify-between sticky bottom-0">
        <div className="icon-style">
          <EmojiMultiple />
        </div>

        <input
          type="text"
          value={messageToSend}
          placeholder={`${currentUser?.username}, type you message here...`}
          className="bg-transparent w-full text-cc-400 dark:text-white"
          onChange={(e) => setMessageToSend(e.target.value)}
        />
        {messageToSend.trim() && (
          <button className="icon-style">
            <Send />
          </button>
        )}
      </form>
    </section>
  );
};

export default ChatContainer;
