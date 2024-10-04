import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const CardSlider = ({ imageSrc, title, rating, movieId }) => {
  return (
    <div className="rounded-lg mx-3 my-4 relative group">
      <div className="max-w-sm">
        <img
          src={imageSrc}
          alt="image"
          className="rounded-lg h-80 w-full object-cover"
        />
        <div className="p-4 absolute  inset-0 rounded-lg flex flex-col justify-center translate-y-10 group-hover:translate-y-0 items-center bg-opacity-0 bg-gray-700 transition-all duration-300 ease-in-out group-hover:bg-opacity-80">
          <Link
            to={`/detail/${movieId}`}
            className="font-bold text-lg text-white opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-300 text-center mb-2"
          >
            {title}
          </Link>
          <p className="flex justify-center items-center gap-1 text-white opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-300">
            <FaStar className="text-yellow-500" /> {rating}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
