import { useEffect, useState } from "react";
import { getMovieCredits } from "../../services/api.service";

const Credit = ({ movieId }) => {
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const data = await getMovieCredits(movieId);
        setCredits(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCredits();
  }, [movieId]);

  if (!credits) {
    return <div>Loading...</div>;
  }

  return (
    <div className="credits-section mx-4 sm:mx-8 lg:mx-16 my-12">
      <div className="casts">
        <h2 className="text-3xl text-white mb-4 font-yatra">Cast</h2>
        <div className="cast-list overflow-x-auto overflow-hidden flex space-x-4 py-2">
          {credits.cast.map((castMember) => (
            <div
              key={castMember.cast_id}
              className="cast-card bg-gray-800 p-4 rounded-lg flex-shrink-0 w-48"
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${castMember.profile_path}`}
                alt={castMember.name}
                className="rounded-full mb-2 w-24 h-24 object-cover"
              />
              <div>
                <h3 className="text-xl text-white">{castMember.name}</h3>
                <p className="text-sm text-gray-400">
                  as {castMember.character}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="crew mt-10">
        <h2 className="text-3xl text-white mb-4">Crew</h2>
        <div className="crew-list grid grid-cols-2 md:grid-cols-4 gap-4">
          {credits.crew.slice(0, 16).map((crewMember) => (
            <div
              key={crewMember.credit_id}
              className="crew-card bg-gray-800 p-4 rounded-lg"
            >
              <h3 className="text-xl text-white">{crewMember.name}</h3>
              <p className="text-sm text-gray-400">{crewMember.job}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Credit;
