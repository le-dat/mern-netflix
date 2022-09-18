import React, { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { watchMovie } from "../redux/NetflixSlice";
import { getToast } from "../utils/toast";
import { video } from "../assets";

const Player = () => {
  const { detail, watchList } = useSelector((state) => state.netflix.movie);

  const { movieId } = useParams(); // movieId from route in app.jsx
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(watchMovie({ movieId }));
    } catch (err) {
      getToast({ type: "error", msg: err.message });
    }
  }, []);

  return (
    <div className="relative w-full h-[100vh]">
      <BsArrowLeft onClick={() => navigate(-1)} className="absolute left-5 top-5 z-[50]" size="2rem" />
      <div className="flex items-center gap-10 p-5 pt-16">
        <img
          src={`https://image.tmdb.org/t/p/w500${detail.image}`}
          alt={detail.name}
          className="hidden md:block object-cover"
        />
        <div className="flex flex-col justify-center gap-4 md:pr-20">
          <h1 className="text-3xl md:text-4xl font-bold ">{detail.name}</h1>
          <p className="text-xl text-justify">{detail.description}</p>
        </div>
      </div>

      {watchList.length > 0 ? (
        <div className="flex flex-col justify-center lg:gap-10 p-5">
          <h1 className="text-3xl font-medium">Trailer</h1>
          {watchList
            .filter(({ type }) => type === "Trailer")
            .map((watch) => (
              <iframe
                key={watch.id}
                className="w-full h-[12rem] max-w-[120rem] md:h-[50rem] self-center"
                src={`https://www.youtube.com/embed/${watch.key}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            ))}
        </div>
      ) : (
        <video src={video} controls autoPlay muted className="w-full h-full object-contain"></video>
      )}
    </div>
  );
};

export default Player;
