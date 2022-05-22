import { useContext, useState } from "react";

import SignOut from "./SignOut";

import { Theme } from "../../icons/Theme";
import { ThemeContext } from "../mode/ThemeContext";
import Logo from "./Logo";
import Contact from "./Contact";

const Contacts = ({ contacts, currentUser, changeChat, setCurrentChat }) => {
  const [selectedChat, setSelectedChat] = useState(undefined);

  const { theme, setTheme } = useContext(ThemeContext);

  const changeCurrentChat = (contact, index) => {
    changeChat(contact);
    setSelectedChat(index);
  };

  return (
    <section className="bg-cc-200 text-cc-400 dark:text-white dark:bg-neutral-800  flex flex-col col-span-1 lg:col-span-2 xl:col-span-1 h-screen">
      {/* logo */}
      <div className="cursor-pointer" onClick={() => changeChat(undefined)}>
        <Logo />
      </div>
      <div className="flex items-center justify-center lg:justify-between px-8 py-4 sticky bottom-0">
        <h1 className="hidden lg:block">Change mode</h1>
        <div
          className="icon-style active:rotate-180"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <Theme />
        </div>
      </div>
      <h1 className="px-8 hidden lg:block">
        Select contact to start a conversation😀
      </h1>
      <div className="space-y-2 py-0.5 lg:py-4 flex-1 overflow-y-scroll">
        {contacts.map((contact, index) => {
          return (
            <div
              key={contact?._id}
              className={`flex items-center justify-center lg:justify-start space-x-4 hover:bg-cc-100 dark:hover:bg-neutral-900 cursor-pointer lg:px-8 py-4 ${
                selectedChat === index &&
                `border-l-4 border-cc-400 bg-cc-100 dark:border-violet-600 dark:bg-neutral-900 rounded-r-sm`
              }`}
              onClick={() => changeCurrentChat(contact, index)}>
              <Contact user={contact} />
            </div>
          );
        })}
      </div>
      {/* current user */}
      <div className="flex items-center justify-center lg:justify-between px-8 py-4 sticky bottom-0">
        <div className="hidden lg:flex items-center space-x-4 cursor-pointer">
          <Contact user={currentUser} />
        </div>
        <SignOut id={currentUser?._id} />
      </div>
    </section>
  );
};

export default Contacts;
