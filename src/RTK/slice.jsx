import { createSlice } from "@reduxjs/toolkit";
import { detailMovieData, fetchMovieData, searchMovieData } from "./thunk";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    results: [],
    page: 1,
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchMovieData.fulfilled, (state, action) => {
        state.loading = false;
        const newResults = action.payload.results;
        state.results.push(...newResults);
        state.page = action.payload.page;
      });
  },
});

//search Silce
export const searchMovieSlice = createSlice({
  name: "searchMovie",
  initialState: {
    results: [],
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchMovieData.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchMovieData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(searchMovieData.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      });
  },
});

//detail Silce
export const detailMovieSlice = createSlice({
  name: "searchMovie",
  initialState: {
    results: [],
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(detailMovieData.pending, (state) => {
        state.loading = true;
      })
      .addCase(detailMovieData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(detailMovieData.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      });
  },
});

//userInfo Silce
export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: "",
  reducers: {
    update(state, action) {
      return action.payload;
    },
  },
});

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: false,
  reducers: {
    isLogin(state, action) {
      return action.payload;
    },
  },
});

export const kakaoTokenSlice = createSlice({
  name: "kakaoToken",
  initialState: "",
  reducers: {
    update(state, action) {
      return action.payload;
    },
  },
});
