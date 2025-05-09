import { configureStore } from "@reduxjs/toolkit";
import {
  detailMovieSlice,
  movieSlice,
  searchMovieSlice,
  userInfoSlice,
} from "./slice";

export const store = configureStore({
  reducer: {
    movie: movieSlice.reducer,
    searchMovie: searchMovieSlice.reducer,
    detailMovie: detailMovieSlice.reducer,
    getLocaluserInfo: userInfoSlice.reducer,
  },
});
