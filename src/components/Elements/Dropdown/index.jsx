import { Accordion } from "flowbite-react";
import { useEffect, useState } from "react";
import { getGenres } from "../../../services/api.service";
import PropTypes from "prop-types";

const Filter = ({ onSelectGenre }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreData = await getGenres();
        if (genreData && genreData.genres) {
          setGenres(genreData.genres);
        } else {
          console.error("Invalid genre data", genreData);
        }
      } catch (error) {
        console.error("Failed to fetch genres", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="w-full">
      <Accordion collapseAll>
        <Accordion.Panel>
          <Accordion.Title>Filter by Genre</Accordion.Title>
          <Accordion.Content>
            <div className="flex flex-wrap gap-2">
              <div className="gap-2">
                <button
                  className="bg-slate-700 p-2 rounded hover:bg-slate-600"
                  onClick={() => onSelectGenre(null)} // Handle "All Genres" selection
                >
                  All Genres
                </button>
              </div>
              {genres.length > 0 ? (
                genres.map((genre) => (
                  <div key={genre.id} className="gap-2">
                    <button
                      className="bg-slate-700 p-2 rounded hover:bg-slate-600"
                      onClick={() => onSelectGenre(genre.id)} // Handle genre selection
                    >
                      {genre.name}
                    </button>
                  </div>
                ))
              ) : (
                <li>No genres available</li>
              )}
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

// Definisikan tipe props
Filter.propTypes = {
  onSelectGenre: PropTypes.func.isRequired,
};

export default Filter;
