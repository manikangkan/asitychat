import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";

import Home from "./pages/Home";
import SetAvatar from "./pages/SetAvatar";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/home" element={<Home />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
