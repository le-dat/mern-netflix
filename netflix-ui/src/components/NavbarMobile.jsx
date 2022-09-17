import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { logo } from "../assets";

const NavbarMobile = ({ onShow, links, setShowNavMobile }) => {
  return (
    <div
      className={`fixed left-0 inset-0 z-[100] p-4 flex flex-col items-start bg-black ease-linear duration-300 border-b-gray-500 md:hidden translate-x-[-100%] ${
        onShow ? "translate-x-0" : ""
      }`}
    >
      <IoMdClose size={"1.8rem"} className="absolute right-4 top-4" onClick={() => setShowNavMobile(false)} />
      <div className="w-[5rem] md:w-[11rem]">
        <img src={logo} alt="logo" className="object-contain" />
      </div>
      <div className="flex flex-col items-start gap-1">
        {links.map((link) => (
          <NavLink
            key={link.name}
            className={(nav) =>
              "p-2 text-md md:text-2xl font-medium opacity-70 hover:opacity-100" + (nav.isActive ? " opacity-100" : "")
            }
            to={link.to}
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default NavbarMobile;
