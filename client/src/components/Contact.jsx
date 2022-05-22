const Contact = ({ user, active }) => {
  return (
    <>
      <img
        src={`data:image/svg+xml;base64,${user?.avatarImage}`}
        alt="current user profile"
        className="w-10 aspect-square"
      />
      {active && (
        <div className="w-4 aspect-square rounded-full bg-green-500 absolute right-0 bottom-0 border-2 border-cc-200 dark:border-neutral-800"></div>
      )}
      <div className="hidden lg:block leading-relaxed">
        <h1>{user?.username}</h1>
        <p>{user?.email}</p>
      </div>
    </>
  );
};

export default Contact;
