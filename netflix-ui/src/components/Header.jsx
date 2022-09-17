import React from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../assets";

const Header = ({ login }) => {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-3 md:py-1 w-full fixed top-0 inset-x-0 z-50 flex items-center justify-between ">
      <div className="w-[5rem] md:w-[11rem]">
        <img src={logo} alt="logo" className="object-cover" />
      </div>
      <button
        onClick={() => (login ? navigate("/") : navigate("/sign-up"))}
        className="p-2 md:p-3 text-lg md:text-2xl text-white bg-primary rounded-md shadow-md hover:opacity-80"
      >
        {login ? "Login" : "Sign up"}
      </button>
    </div>
  );
};

export default Header;
