import { useEffect, useState } from "react";
import { getPopularPeople } from "../../services/api.service";

const ListPopularPeople = () => {
  const [popularPeople, setPopularPeople] = useState([]);

  useEffect(() => {
    const fetchPopularPeople = async () => {
      try {
        const responses = await getPopularPeople();
        setPopularPeople(responses);
        console.log(responses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPopularPeople();
  }, []);

  return (
    <div className="flex gap-6 justify-center">
      {popularPeople.slice(0, 5).map((person) => (
        <div key={person.id} className="flex flex-col items-center">
          <div className="rounded-full overflow-hidden w-40 h-40 mb-4 shadow-md">
            <img
              className="object-cover w-full h-full"
              src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
              alt={person.name}
            />
          </div>
          <span className="text-white font-mono text-lg text-center">
            {person.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ListPopularPeople;
