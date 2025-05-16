import { configureStore } from "@reduxjs/toolkit";
import {
  detailMovieSlice,
  kakaoTokenSlice,
  movieSlice,
  searchMovieSlice,
  userInfoSlice,
  userLoginSlice,
} from "./slice";

export const store = configureStore({
  reducer: {
    movie: movieSlice.reducer,
    searchMovie: searchMovieSlice.reducer,
    detailMovie: detailMovieSlice.reducer,
    getLocaluserInfo: userInfoSlice.reducer,
    isUserLogin: userLoginSlice.reducer,
    getKakaoToken: kakaoTokenSlice.reducer,
  },
});
