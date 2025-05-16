import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { detailMovieData } from "../RTK/thunk";

export default function MovieDetail() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.detailMovie.results);

  useEffect(() => {
    setIsLoading(true);
    setIsImageLoaded(false);
    dispatch(detailMovieData(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  {
    if (isLoading || !data || data.id !== Number(params.id)) {
      return <Skeleton />;
    }
  }
  return (
    <div className="relative w-full h-[400px] md:h-[600px] text-white">
      <img
        src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        alt={data.title}
        onLoad={() => setIsImageLoaded(true)}
        className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${
          isImageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
      <div className="absolute bottom-6 left-4 md:bottom-10 md:left-12 max-w-full md:max-w-2xl space-y-3 md:space-y-6 z-20 px-2">
        <h1 className="text-xl sm:text-2xl md:text-5xl font-bold break-words">
          {data.title}
        </h1>
        <div className="text-sm sm:text-base md:text-xl text-gray-300">
          평점: {data.vote_average}
        </div>
        <div className="text-xs sm:text-sm md:text-base text-gray-300">
          장르: {data.genres?.map((el) => el.name).join(", ")}
        </div>
        <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed line-clamp-4">
          {data.overview}
        </p>
        <div className="flex gap-3 mt-3" />
      </div>
    </div>
  );
}
