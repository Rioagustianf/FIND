import { Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { getMovieTopRated } from "../../services/api.service";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const CarouselComponent = () => {
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const responses = await getMovieTopRated();
        setTopRated(responses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopRated();
  }, []);

  return (
    <div className="relative h-96 sm:h-64 xl:h-[570px] 2xl:h-96">
      <Carousel slideInterval={5000}>
        {topRated.slice(0, 15).map((movie) => (
          <div key={movie.id} className="relative">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              className="h-full w-full object-cover"
              alt={movie.title}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="text-white text-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
                <Link to={`/movie/${movie.id}`}>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">
                    {movie.title}
                  </h2>
                </Link>
                <div className="flex justify-center items-center mb-2">
                  <FaStar className="text-yellow-500 mr-1" />{" "}
                  {movie.vote_average.toFixed(1)}
                </div>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-2">
                  {movie.overview}
                </p>
                <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg">
                  {new Date(movie.release_date).getFullYear()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
