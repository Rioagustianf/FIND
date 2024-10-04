import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getMoviePopular } from "../../services/api.service";
import CardSlider from "../Elements/Card";
import { Link } from "react-router-dom";

const ComponentSlider = (props) => {
  const [popular, setPopular] = useState([]);
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
    const fetchPopular = async () => {
      try {
        const responses = await getMoviePopular();
        setPopular(responses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPopular();
  }, []);

  return (
    <div className=" mx-16 my-10">
      <Link to={"/popular"} className="font-yatra text-5xl text-white">
        {title}
      </Link>
      <Slider {...settings}>
        {popular.slice(0, 10).map((movie) => (
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

export default ComponentSlider;
