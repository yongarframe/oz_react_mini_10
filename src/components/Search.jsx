import { Link, useSearchParams } from "react-router-dom";
import SwiperMovieCard from "./SwiperMovieCard";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchMovieData } from "../RTK/thunk";

export default function Search({
  swiperPages,
  isImageLoading,
  setisImageLoading,
}) {
  const dispatch = useDispatch();

  const filteredData = useSelector((state) => state.searchMovie.results);
  const [searchParms] = useSearchParams();
  const params = searchParms.get("movie");

  useEffect(() => {
    dispatch(searchMovieData(params)); // thunk 함수실행하여 redux 상태 업데이트
  }, [params]);

  return (
    <>
      {swiperPages?.map((swiperPage) => (
        <SwiperMovieCard key={swiperPage} swiperPage={swiperPage} />
      ))}
      <ul className="flex justify-center flex-wrap gap-10 p-6 bg-gray-50">
        {filteredData.map((filterMovie) => (
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
