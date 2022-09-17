import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "./constants";
import { cardImage } from "../assets";

export const netflixSlice = createSlice({
  name: "netflix",
  initialState: {
    movie: {
      detail: {},
      watchList: [],
    },
    movies: [],
    genres: [],
    genresLoaded: false,
    myList: [],
  },
  reducers: {
    addMovieDetail: (state, action) => {
      state.movie.detail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
      state.myList = action.payload;
    });
    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
      state.myList = action.payload;
    });
    builder.addCase(watchMovie.fulfilled, (state, action) => {
      state.movie.watchList = action.payload;
    });
  },
});

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return genres;
});

const createArrayFromData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name);
    });

    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie.original_name || movie.original_title,
        image: movie.backdrop_path || cardImage,
        description: movie.overview,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchMovies = createAsyncThunk("netflix/trending", async ({ type }, thunkApi) => {
  const {
    netflix: { genres },
  } = thunkApi.getState();
  return getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true);
});

export const fetchMoviesByGenre = createAsyncThunk("netflix/genre", async ({ genre, type }, thunkApi) => {
  const {
    netflix: { genres },
  } = thunkApi.getState();
  return getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`, genres, true);
});

export const getUserLikedMovies = createAsyncThunk("netflix/getLiked", async ({ email }) => {
  const {
    data: { movies },
  } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
  return movies;
});

export const removeMovieFromLiked = createAsyncThunk("netflix/removeLiked", async ({ email, movieId }) => {
  const {
    data: { movies },
  } = await axios.put(`http://localhost:5000/api/user/remove`, { email, movieId });
  return movies;
});

export const watchMovie = createAsyncThunk("netflix/watch", async ({ movieId }) => {
  const {
    data: { results },
  } = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
  return results;
});

export const { addMovieDetail } = netflixSlice.actions;
export default netflixSlice.reducer;
