import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import MyList from "./pages/MyList";
import Player from "./pages/Player";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/player/:movieId" element={<Player />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>

      {/* toastify */}
      <ToastContainer />
    </div>
  );
};

export default App;
