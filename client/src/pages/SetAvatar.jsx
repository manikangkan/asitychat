import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Buffer } from "buffer";
import { setAvatar } from "../../utils/apiRoutes";

import { ArrowClockwise } from "../../icons/ArrowClockwise";

const SetAvatar = () => {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const [isLoading, setIsLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState(null);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = async () => {
      localStorage.getItem("asitychat-user")
        ? setCurrentUser(JSON.parse(localStorage.getItem("asitychat-user")))
        : navigate("/home");
    };
    token();
  }, []);

  useEffect(() => {
    const getAvatars = async () => {
      const data = [];
      for (let i = 0; i < 6; i++) {
        const image = await axios.get(
          `https://api.multiavatar.com/${Math.round(
            Math.random() * 1000
          )}?apikey=pvkunVAEHbjoQJ`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    getAvatars();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      setError(
        `Dear ${currentUser?.username}, select an avatar before continuing😊`
      );
    } else {
      const user = await JSON.parse(localStorage.getItem("asitychat-user"));

      const { data } = await axios.post(`${setAvatar}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("asitychat-user", JSON.stringify(user));
        navigate("/");
      } else {
        setError("Error setting avatar. Please try again.");
      }
    }
  };

  return (
    <div className="bg-cc-100 dark:bg-neutral-900 h-screen flex items-center justify-center text-cc-400 dark:text-white">
      <div className="w-1/2 mx-auto text-cc-400 dark:text-white">
        {isLoading ? (
          <div className="text-center space-y-4">
            <ArrowClockwise />
            <p>
              Hello {currentUser?.username}, please wait a moment untill I fetch
              the data for you😊
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-10 text-center">
            <h1>
              Hey {currentUser?.username}, pick an avatar as your profile
              picture
            </h1>
            <div className="w-full flex flex-wrap gap-8 items-center justify-evenly">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className={`w-20 aspect-square cursor-pointer rounded-full ${
                    selectedAvatar === index &&
                    `bg-cc-400 dark:bg-violet-600 p-1`
                  }`}
                  onClick={() => setSelectedAvatar(index)}>
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                  />
                </div>
              ))}
            </div>
            <button
              className="bg-cc-400 dark:bg-violet-600 dark:text-white py-2 px-4 outline-none border-none rounded-sm font-semibold text-cc-100"
              onClick={setProfilePicture}>
              Set as Profile Picture
            </button>
            <p className="text-red-500">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetAvatar;
