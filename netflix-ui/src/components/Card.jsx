import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { AiFillPlayCircle, AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { RiThumbDownFill, RiThumbUpFill } from "react-icons/ri";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMovieDetail, removeMovieFromLiked } from "../redux/NetflixSlice";
import { firebaseAuth } from "../utils/firebase";
import { getToast } from "../utils/toast";

const Card = ({ movieData, isLiked = false }) => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToList = async () => {
    try {
      const {
        data: { success, msg },
      } = await axios.post(`http://localhost:5000/api/user/add`, { email, data: movieData });
      return success ? getToast({ type: "success", msg }) : getToast({ type: "warn", msg });
    } catch (err) {
      getToast({ type: "warn", msg: err.message });
    }
  };

  const handleWatchMovie = () => {
    try {
      dispatch(addMovieDetail(movieData));
      navigate(`/player/${movieData.id}`);
    } catch (err) {
      getToast({ type: "warn", msg: err.message });
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
  });

  return (
    <div className="group relative mr-[1rem] h-full bg-gray-900/60 overflow-hidden cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt={movieData.name}
        className="object-cover"
        onClick={handleWatchMovie}
      />
      <p className="des h-[3.2rem] md:h-[4.8rem] text-sm p-2 md:text-2xl">{movieData.name}</p>

      <div className="absolute inset-x-0 top-full group-hover:-translate-y-full transition ease-in-out duration-500 h-[8rem] overflow-hidden text-lg p-3 bg-gray-800 rounded overflow-y-auto">
        <div className="flex items-center justify-start gap-5">
          <AiFillPlayCircle size="2rem" title="Play" onClick={handleWatchMovie} />
          {isLiked ? (
            <AiOutlineCheck
              size="2rem"
              title="Remove from list"
              onClick={() => dispatch(removeMovieFromLiked({ email, movieId: movieData.id }))}
            />
          ) : (
            <AiOutlinePlus size="2rem" title="Add to my list" onClick={handleAddToList} />
          )}
        </div>
        <ul className="hidden lg:flex flex-wrap items-center justify-between mt-2 list-disc ">
          {movieData.genres.map((genre, i) => (
            <li key={genre.id} className="first:list-none">
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
