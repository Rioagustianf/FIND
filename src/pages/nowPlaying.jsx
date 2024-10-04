import CardSlider from "../components/Elements/Card";
import Filter from "../components/Elements/Dropdown";
import ComponentNavbar from "../components/Elements/Navbar";
import useNowPlaying from "../hooks/useNowPlaying";
import { useState, useEffect } from "react";
import { Pagination } from "flowbite-react";
import FooterComponent from "../components/Elements/Footer";
import { useSearchParams } from "react-router-dom";

const itemsPerPage = 20;

export default function NowPlaying() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams(); // Menggunakan useSearchParams
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  ); // Ambil query dari search params
  const { nowPlaying, loading, error } = useNowPlaying(
    selectedGenre,
    currentPage,
    itemsPerPage
  );

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || ""); // Update searchQuery ketika searchParams berubah
  }, [searchParams]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(nowPlaying.total_results / itemsPerPage) || 1;

  const filteredMovies = nowPlaying.results.filter((movie) => {
    const matchesGenre = selectedGenre
      ? movie.genre_ids.includes(selectedGenre)
      : true;
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesGenre && matchesSearch;
  });

  return (
    <>
      <ComponentNavbar onSearch={setSearchQuery} />
      <div className="container mx-auto text-white my-10">
        <h1 className="font-yatra text-2xl mb-5">Now Playing</h1>
        <div className="flex gap-5">
          <div className="py-8 w-1/4">
            <Filter onSelectGenre={setSelectedGenre} />
          </div>
          <div className="w-3/4 p-5">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredMovies.map((movie) => (
                <CardSlider
                  imageSrc={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  title={movie.title}
                  key={movie.id}
                  movieId={movie.id}
                  rating={movie.vote_average.toFixed(1)}
                />
              ))}
            </div>
            <div className="flex justify-center mt-5">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="pagination-container"
                showIcons
              />
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
