// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import MovieLoad from "../api";
import { Link } from "react-router-dom";

export default function SwiperMovieCard({ swiperPage }) {
  const [movieData, setMovieData] = useState([]);

  const handleLoad = async (page) => {
    const data = await MovieLoad(page);
    setMovieData(data.results);
  };

  // 렌더링 후 1번만 영화 데이터 불러오기
  useEffect(() => {
    handleLoad(swiperPage);
  }, []);

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={4}
      navigation={true}
      modules={[Navigation, Pagination]}
      className="mySwiper w-full max-w-7xl mx-auto mt-8"
    >
      {movieData
        .filter((movie) => !movie.adult)
        .map((filterMovie) => (
          <SwiperSlide key={filterMovie.id}>
            <Link to={`detail/${filterMovie.id}`}>
              <div className="flex justify-center">
                <img
                  className="rounded-xl shadow-md w-[200px] h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                  src={`https://image.tmdb.org/t/p/w500${filterMovie.poster_path}`}
                  alt={filterMovie.title}
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
