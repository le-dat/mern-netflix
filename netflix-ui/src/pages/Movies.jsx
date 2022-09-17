import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import { fetchMovies, getGenres } from "../redux/NetflixSlice";
import { firebaseAuth } from "../utils/firebase";
import NotAvailable from "./NotAvailable";

const Movies = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
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
    if (genresLoaded) dispatch(fetchMovies({ genres, type: "movie" }));
  }, [genresLoaded]);

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset > 0 ? true : false);
      return () => (window.onscroll = null);
    };
  }, []);

  return (
    <div>
      <Navbar isScrolled={isScrolled} />

      <div className="mt-20 md:mt-36">
        <SelectGenre genres={genres} type="movie" />
        {movies.length > 0 ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </div>
  );
};

export default Movies;
