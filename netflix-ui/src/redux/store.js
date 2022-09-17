import { configureStore } from "@reduxjs/toolkit";
import netflixReducer from "./NetflixSlice";

export default configureStore({
  reducer: {
    netflix: netflixReducer,
  },
});
