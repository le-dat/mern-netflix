import React from "react";
import { background as bg } from "../assets";

const BackgroundImage = (background = bg) => {
  return (
    <div className="relative w-[100vw] h-[100vh]">
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <img src={background} alt="background" className="w-[100vw] h-[100vh] object-cover " />
    </div>
  );
};

export default BackgroundImage;
