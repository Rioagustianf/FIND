import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getMovieDetails,
  getMovieVideos,
  getSimilarMovies,
} from "../services/api.service";
import Credit from "../components/Layouts/Credit";
import ComponentNavbar from "../components/Elements/Navbar";
import { FaStar } from "react-icons/fa";
import FooterComponent from "../components/Elements/Footer";
import { Modal, Button } from "flowbite-react";

const DetailPage = () => {
  const { id: movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieVideos, setMovieVideos] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const details = await getMovieDetails(movieId);
        const videos = await getMovieVideos(movieId);
        const similar = await getSimilarMovies(movieId);
        setMovieDetails(details);
        setMovieVideos(videos);
        setSimilarMovies(similar);
      } catch (error) {
        console.error("Failed to fetch movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (!movieDetails) {
    return <div>No movie details found.</div>;
  }

  const trailer = movieVideos.find((video) => video.type === "Trailer");
  const trailerKey = trailer ? trailer.key : "";

  const handleOpenModal = () => {
    if (trailerKey) {
      setSelectedVideo(trailerKey);
      setOpenModal(true);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <ComponentNavbar />
      <div className="relative">
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
            alt={movieDetails.title}
            className="w-full h-full blur-sm object-cover opacity-50 rounded-md"
          />
          <div className="container absolute top-1/2 left-0 w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <img
                src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
                alt="poster"
                className="relative z-10 rounded-3xl w-3/4 sm:w-1/3 lg:w-2/3 lg:max-w-sm lg:max-h-[500px] sm:max-h-[400px] h-auto"
              />
              <div className="mt-4 sm:mt-0 sm:ml-6 text-white w-full sm:w-2/3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-yellow-400 font-bold mb-3">
                  {movieDetails.title}
                </h1>
                <div className="mt-2 py-2">
                  <p className="text-lg sm:text-xl md:text-2xl">
                    {new Date(movieDetails.release_date).getFullYear()}
                  </p>
                  <p className="py-1 sm:py-2">
                    {movieDetails.genres.map((genre) => genre.name).join(", ")}
                  </p>
                  <p className="flex items-center text-lg sm:text-xl">
                    <FaStar className="text-yellow-500 mr-1" />
                    {movieDetails.vote_average.toFixed(1)}
                  </p>
                </div>
                <Button onClick={handleOpenModal} className="mt-4">
                  Watch Trailer
                </Button>
                <div className="text-lg sm:text-xl mt-2">
                  <p className="font-yatra">Tagline:</p>
                  <p className="">"{movieDetails.tagline}"</p>
                </div>
                <h3 className="font-yatra text-2xl sm:text-3xl lg:text-4xl mt-6">
                  About Film
                </h3>
                <div className="w-full sm:w-2/3 rounded-lg drop-shadow-xl p-3 bg-gray-800 mt-4">
                  <p className="text-white">{movieDetails.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container lg:mt-72 md:mt-[20rem] mt-[50rem] sm:mt-[20rem] mt-[48rem] px-4">
        <Credit movieId={movieId} />

        <div className="container mx-4 sm:mx-8 lg:mx-8 my-12 ">
          <h1 className="text-2xl font-yatra sm:text-3xl md:text-4xl lg:text-5xl text-yellow-400 font-bold mb-3">
            Similar Movies
          </h1>
          <div className="flex overflow-x-auto py-2 scrollbar-hide">
            {similarMovies.length > 0 ? (
              similarMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex-none w-56 h-90 bg-gray-800 rounded-lg overflow-hidden mx-2"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-5/6"
                  />
                  <div className="p-2">
                    <Link
                      to={{
                        pathname: `/detail/${movie.id}`,
                        state: { from: location },
                      }}
                      className="text-white truncate text-xl"
                      onClick={handleScrollToTop}
                    >
                      {movie.title}
                    </Link>
                    <p className="flex items-center text-yellow-400 text-md">
                      <FaStar className="text-yellow-500 mr-1" />
                      {movie.vote_average.toFixed(1)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white">No similar movies found.</p>
            )}
          </div>
        </div>
      </div>
      <FooterComponent />

      {/* Modal for video */}
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="5xl">
        <Modal.Header>Play Trailer</Modal.Header>
        {selectedVideo && (
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${selectedVideo}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </Modal>
    </>
  );
};

export default DetailPage;
