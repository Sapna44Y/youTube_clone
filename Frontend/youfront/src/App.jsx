// import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VideoPage from "./pages/VideoPage";
import ChannelPage from "./pages/ChannelPage";
import RegisterPage from "./pages/RegisterPage";
import CreateChannel from "./pages/CreateChannel";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/video/:id" element={<VideoPage />} />
      <Route path="/channel/:id" element={<ChannelPage />} />
      <Route path="/create-channel" element={<CreateChannel />} />
    </Routes>
  );
}

export default App;
