import { createAsyncThunk } from "@reduxjs/toolkit";

const API = import.meta.env.VITE_API_TOKEN;

//메인 Movie Data 받아오기
export const fetchMovieData = createAsyncThunk(
  "movie/fetchMovieData",
  async (page) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API}`,
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko&page=${page}&region=ko`,
      options
    );
    const data = await res.json();
    return { ...data, page };
  }
);

//검색받아오기
export const searchMovieData = createAsyncThunk(
  "serchMovie/fetchSearchMovieData",
  async (params) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API}`,
      },
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${params}&include_adult=false&language=ko&page=1`,
      options
    );
    const data = await res.json();
    return data.results;
  }
);

//Detail API 받아오기
export const detailMovieData = createAsyncThunk(
  "detailMovie/fetchDetailMovieData",
  async (movieId) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API}`,
      },
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=ko`,
      options
    );
    const data = await res.json();
    return data;
  }
);
