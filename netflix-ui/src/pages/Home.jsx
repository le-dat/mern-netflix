import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { AiFillInfoCircle, AiFillPlayCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchMovies, getGenres } from "../redux/NetflixSlice";
import { homeImage, homeTitle } from "../assets";
import { firebaseAuth } from "../utils/firebase";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset > 50 ? true : false);
      return () => (window.onscroll = null);
    };
  }, []);

  return (
    <div>
      <Navbar isScrolled={isScrolled} />

      <div className="relative">
        <div className="absolute inset-0 bg-[rgba(0,0,0,.3)]"></div>
        <img src={homeImage} alt="background" className="object-contain" />
        <div className="absolute left-2 bottom-2 md:left-8 md:bottom-8 max-w-[15rem] md:max-w-[60rem]">
          <img src={homeTitle} alt="title" className="object-contain" />
          <div className="flex items-center justify-start gap-6 mt-4">
            <div
              onClick={() => navigate("/player")}
              className="p-2 md:p-4 cursor-pointer hover:opacity-80 flex items-center gap-2 bg-black/90 text-white md:text-2xl"
            >
              <AiFillPlayCircle size="1.8rem" /> Play
            </div>
            <div className="p-2 md:p-4 cursor-pointer hover:opacity-80 flex items-center gap-2 bg-gray-700/70 md:text-2xl">
              <AiFillInfoCircle size="1.8rem" /> More Info
            </div>
          </div>
        </div>
      </div>

      <Slider movies={movies} />
    </div>
  );
};

export default Home;
