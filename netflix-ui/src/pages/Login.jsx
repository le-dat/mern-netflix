import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase";
import { getToast } from "../utils/toast";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = values;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      getToast({ type: "success", msg: "User logged successfully !" });
    } catch (err) {
      getToast({ type: "error", msg: err.message });
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <div className="relative flex items-center justify-center ">
      <BackgroundImage />
      <Header />

      <form
        className="absolute z-20 px-20 py-16 bg-[rgba(0,0,0,.75)] flex flex-col gap-4 md:gap-8"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-white text-4xl font-medium">Login</h2>
        <input
          autoFocus
          require="true"
          id="email"
          type="email"
          name="email"
          value={values.email}
          onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          className="input-black"
          placeholder="Enter your email address"
        />
        <input
          require="true"
          id="password"
          type="password"
          name="password"
          value={values.password}
          onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          className="input-black"
          placeholder="Enter your password"
        />
        <button className="button">Login</button>
      </form>
    </div>
  );
};

export default Login;
