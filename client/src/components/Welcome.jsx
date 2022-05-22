import Logo from "./Logo";

const Welcome = ({ username }) => {
  return (
    <section className="grid place-content-center h-screen text-center space-y-2 px-8">
      <Logo />
      <h1>Welcome {username}, to chat.asity.tech</h1>
      <p>
        Powered by{" "}
        <a href="http://asity.tech" target="_blank">
          asity.tech
        </a>
      </p>
    </section>
  );
};

export default Welcome;
