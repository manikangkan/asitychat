import { useEffect, useState } from "react";

import axios from "axios";

import { signIn, signUp } from "../../utils/apiRoutes";

import { ArrowClockwise } from "../../icons/ArrowClockwise";

import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const Home = () => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    localStorage.getItem("asitychat-user") && navigate("/");
  }, []);

  const handleSignInSignUp = (e) => {
    e.preventDefault();
    setIsSignUp(!isSignUp);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = formData;
    if (isSignUp) {
      if (!username || !email || !password || !confirmPassword) {
        setError("Please filled all the fields.");
        return false;
      } else if (username.length < 5) {
        setError("Username should be greater than 5 characters.");
        return false;
      } else if (email === "") {
        setError("Email is required.");
        return false;
      } else if (password !== confirmPassword) {
        setError("Password and confirm password should be same.");
        return false;
      } else if (password.length < 5) {
        setError("Password should be equal or greater than 5 characters.");
        return false;
      }
    } else {
      if (!username || !password) {
        setError("Please filled all the fields.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      setError("");
      const { username, email, password } = formData;
      if (isSignUp) {
        setLoading(true);
        const { data } = await axios.post(signUp, {
          username,
          email,
          password,
        });

        !data.status && setError(data.msg);
        data.status &&
          localStorage.setItem("asitychat-user", JSON.stringify(data.user));
        setLoading(false);
      } else {
        setLoading(true);
        const { data } = await axios.post(signIn, {
          username,
          password,
        });
        !data.status && setError(data.msg);
        data.status &&
          localStorage.setItem("asitychat-user", JSON.stringify(data.user));
        setLoading(false);
      }
      navigate("/");
    }
  };

  return (
    <div className="bg-cc-100 dark:bg-neutral-900 h-screen flex items-center justify-center">
      <div className="p-4 sm:p-0 w-full sm:w-2/3 xl:w-1/3 mx-auto space-y-4 relative">
        <form
          className="bg-cc-200/80 dark:bg-neutral-800/80 backdrop-blur-md flex flex-col p-8 sm:p-12 rounded-sm space-y-4"
          onSubmit={handleSubmit}>
          <Logo isHome={true} />

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          {isSignUp && (
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
            />
          )}
          <button
            type="submit"
            className="bg-cc-400 dark:bg-violet-600 dark:text-white py-2 px-4 outline-none border-none rounded-sm font-semibold text-cc-100">
            {isSignUp ? (
              loading ? (
                <ArrowClockwise />
              ) : (
                "Sign up"
              )
            ) : loading ? (
              <ArrowClockwise />
            ) : (
              "Sign in"
            )}
          </button>
          <button
            onClick={handleSignInSignUp}
            className="outline-none border-none rounded-sm font-semibold text-cc-400 dark:text-white">
            {!isSignUp ? `Sign up` : `Sign in`}
          </button>
        </form>
        {error && (
          <div className="bg-red-500 py-2 px-4 rounded-sm text-white text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
