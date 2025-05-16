import { Link } from "react-router-dom";
import styled from "styled-components";
import SwiperMovieCard from "../components/SwiperMovieCard";
import { useSelector } from "react-redux";

const Spiner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #5389c3;
  border-top: 5px solid #53c377;
  border-radius: 50%;
  animation: rotatespinner 1s infinite;
  animation-timing-function: linear;

  @keyframes rotatespinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function MovieCard({
  swiperPages,
  isImageLoading,
  setisImageLoading,
}) {
  const movieData = useSelector((state) => state.movie).results;
  return (
    <>
      {swiperPages?.map((swiperPage) => (
        <SwiperMovieCard key={swiperPage} swiperPage={swiperPage} />
      ))}
      <ul className="flex justify-center flex-wrap gap-10 p-6 bg-gray-50">
        {movieData
          .filter((movie) => !movie.adult)
          .map((filterMovie) => (
            <li
              key={filterMovie.id}
              className="w-[300px]  bg-white rounded-2xl shadow-lg "
            >
              <Link to={`detail/${filterMovie.id}`} className="flex flex-col">
                {isImageLoading ? <Spiner></Spiner> : null}
                <img
                  onLoad={() => setisImageLoading(false)}
                  className="rounded-2xl w-full aspect-[2/3] object-cover"
                  src={`https://image.tmdb.org/t/p/w500${filterMovie.poster_path}`}
                  alt={filterMovie.title}
                  style={{ display: isImageLoading ? "none" : " block" }}
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {filterMovie.title}
                  </h3>
                  <p className="text-s text-gray-600">
                    ⭐ 평점: {filterMovie.vote_average.toFixed(1)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
