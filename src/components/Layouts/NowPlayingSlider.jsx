import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getMovieNowPlaying } from "../../services/api.service";
import CardSlider from "../Elements/Card";
import { Link } from "react-router-dom";

const NowPlayingSlider = (props) => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const { title } = props;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // untuk mode mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024, // untuk mode tablet
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const responses = await getMovieNowPlaying();
        console.log(responses); // Log respons API untuk pemeriksaan
        // Jika respons adalah objek, ambil array yang benar
        setNowPlaying(responses.results || []); // Sesuaikan dengan struktur data
      } catch (error) {
        console.log(error);
      }
    };

    fetchNowPlaying();
  }, []);

  return (
    <div className="mx-16 my-10">
      <Link to={"/now-playing"} className="font-yatra text-5xl text-white">
        {title}
      </Link>
      <Slider {...settings}>
        {nowPlaying.slice(0, 10).map((movie) => (
          <CardSlider
            imageSrc={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            title={movie.title}
            key={movie.id}
            movieId={movie.id}
            rating={movie.vote_average.toFixed(1)}
          />
        ))}
      </Slider>
    </div>
  );
};

export default NowPlayingSlider;
