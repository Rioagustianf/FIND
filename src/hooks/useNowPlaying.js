import { useEffect, useState } from "react";
import { getMovieNowPlaying } from "../services/api.service";

const useNowPlaying = (selectedGenre, page = 1, itemsPerPage = 20) => {
  const [nowPlaying, setNowPlaying] = useState({
    results: [],
    total_results: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      setLoading(true);
      try {
        const response = await getMovieNowPlaying(
          selectedGenre,
          page,
          itemsPerPage
        );
        console.log("Now Playing Response:", response); // Log response
        setNowPlaying(response); // Pastikan response memiliki total_results
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
  }, [selectedGenre, page, itemsPerPage]);

  return { nowPlaying, loading, error }; // Kembalikan seluruh respons
};

export default useNowPlaying;
