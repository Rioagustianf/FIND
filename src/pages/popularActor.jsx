import ListPopularPeople from "../components/Layouts/ListPopularPeople";

const PopularActor = () => {
  return (
    <div className="mx-16 my-10">
      <div className="text-white text-5xl font-yatra">Popular Actor</div>;
      <div>
        <ListPopularPeople></ListPopularPeople>
      </div>
    </div>
  );
};

export default PopularActor;
