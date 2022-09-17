import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { AiOutlineLogout, AiOutlineMenu } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";

import { logo } from "../assets";
import { firebaseAuth } from "../utils/firebase";
import NavbarMobile from "./NavbarMobile";

const Navbar = ({ isScrolled }) => {
  const [showInputSearch, setShowInputSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [showNavMobile, setShowNavMobile] = useState(false);

  const navigate = useNavigate();

  const links = [
    { name: "Home", to: "/" },
    { name: "Movies", to: "/movies" },
    { name: "My List", to: "/my-list" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-[50] px-4 py-2 flex items-center gap-6 ease-out ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="flex-1">
        <AiOutlineMenu
          size={"1.5rem"}
          onClick={() => setShowNavMobile(true)}
          className="block md:hidden cursor-pointer "
        />
        <NavbarMobile onShow={showNavMobile} links={links} setShowNavMobile={setShowNavMobile} />
        <div className="hidden md:flex items-center justify-start">
          <div className="w-[5rem] md:w-[11rem]">
            <img src={logo} alt="logo" className="object-contain" />
          </div>
          <div className="flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.name}
                className={(nav) =>
                  "p-2 text-md md:text-2xl font-medium opacity-70 hover:opacity-100" +
                  (nav.isActive ? " opacity-100" : "")
                }
                to={link.to}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center hover:cursor-pointer opacity-80 hover:opacity-100">
        <BiSearch
          title="Search"
          size={"1.8rem"}
          onClick={() => setShowInputSearch(true)}
          onBlur={() => {
            if (!inputHover) setInputHover(false);
          }}
        />
        <input
          type="text"
          className={`ease-linear duration-300 w-0 invisible bg-transparent ${showInputSearch ? "input-black" : ""}`}
          onMouseEnter={() => setShowInputSearch(true)}
          onMouseLeave={() => setShowInputSearch(false)}
          onBlur={() => {
            setInputHover(false);
            setShowInputSearch(false);
          }}
        />
      </div>

      <div
        onClick={() => signOut(firebaseAuth)}
        className="flex items-center justify-center hover:cursor-pointer opacity-80 hover:opacity-100"
      >
        <AiOutlineLogout size={"1.8rem"} />
      </div>
    </nav>
  );
};

export default Navbar;
