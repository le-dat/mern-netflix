import React, { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase";
import { getToast } from "../utils/toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [showInputPassword, setShowInputPassword] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = values;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      getToast({ type: "success", msg: "Welcome new user !" });
    } catch (err) {
      getToast({ type: "error", msg: err.message });
    }
  };

  return (
    <div className="relative flex items-center justify-center ">
      <BackgroundImage />
      <Header login />

      <div className="absolute z-20 text-center flex flex-col items-center justify-center">
        <h1 className="px-4 text-white text-md md:text-7xl font-medium">Unlimited movies, TV shows, and more.</h1>
        <p className="p-4 text-white text-sm md:text-4xl ">Watch anywhere. Cancel anytime.</p>
        <p className="p-4 text-white text-sm md:text-4xl ">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className=" flex flex-col md:flex-row gap-4 md:gap-2 items-center justify-center ">
          <input
            autoFocus
            require="true"
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
            className="input-white"
            placeholder="Enter your email address"
          />
          {showInputPassword ? (
            <>
              <input
                require="true"
                id="password"
                type="password"
                name="password"
                value={values.password}
                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                className="input-white"
                placeholder="Enter your password"
              />
              <button
                onClick={(e) => handleSubmit(e)}
                className="button p-2 md:px-4 md:py-6 md:w-[24rem] md:text-2xl rounded-sm outline-none flex items-center justify-center gap-2 max-w-[12rem] "
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowInputPassword(true)}
              className="button p-2 md:px-4 md:py-6 md:w-[24rem] md:text-2xl rounded-sm outline-none flex items-center justify-center gap-2 max-w-[12rem] "
            >
              Get Started
              <AiOutlineRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
