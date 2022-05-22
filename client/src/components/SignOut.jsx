import axios from "axios";
import { useNavigate } from "react-router-dom";

import { SignOut as SignOutIcon } from "../../icons/SignOut";

import { signOut } from "../../utils/apiRoutes";

const SignOut = () => {
  const navigate = useNavigate();

  const handleLogOut = async (id) => {
    const data = await axios.get(`${signOut}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/home");
    }
  };

  return (
    <div className="icon-style" onClick={handleLogOut}>
      <SignOutIcon />
    </div>
  );
};

export default SignOut;
