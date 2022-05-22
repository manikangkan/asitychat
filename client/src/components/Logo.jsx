const Logo = ({ isHome = false }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-4">
      <img
        src="https://avatars.githubusercontent.com/u/75943412?v=4"
        alt="profile logo"
        className="w-10 aspect-auto rounded-full"
      />
      <div className={`${!isHome && `hidden lg:block`} leading-relaxed`}>
        <h1>asitychat</h1>
        <p className="text-xs">by manikangkandas</p>
      </div>
    </div>
  );
};

export default Logo;
