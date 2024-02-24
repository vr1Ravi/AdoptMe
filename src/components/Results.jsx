import Pet from "./Pet";
import { useDispatch } from "react-redux";
import { setShowMoreBtn } from "../slices/Pet";
const Results = ({ pets }) => {
  const dispatch = useDispatch();
  if (!pets.length) dispatch(setShowMoreBtn(false));
  return (
    <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {!pets.length ? (
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xl font-extrabold ">
          No Pets Found
        </h1>
      ) : (
        pets.map((pet) => (
          <Pet
            animal={pet.animal}
            name={pet.name}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            key={pet.id}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
