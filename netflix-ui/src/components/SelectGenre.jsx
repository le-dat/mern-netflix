import React from "react";
import { useDispatch } from "react-redux";
import { fetchMoviesByGenre } from "../redux/NetflixSlice";

const SelectGenre = ({ genres, type }) => {
  const dispatch = useDispatch();

  return (
    <select
      className="bg-black border border-gray-300 text-lg md:text-2xl ml-7 px-4 py-2"
      onChange={(e) => dispatch(fetchMoviesByGenre({ genres, genre: e.target.value, type }))}
    >
      {genres.map((genre) => (
        <option key={genre.id} value={genre.name} className="text-sm md:text-2xl ">
          {genre.name}
        </option>
      ))}
    </select>
  );
};

export default SelectGenre;
