import { useState, useContext, useEffect } from "react";
import useBreedList from "../hooks/useBreedList";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "../AdoptedPetContext";
import Results from "./Results";
import fetchSearch from "../apis/fetchSearch";
import fetchMorePets from "../apis/fetchMorePets";
const ANIMALS = ["bird", "dog", "cat", "rabbit", "reptile"];
const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [page, setPage] = useState(0);
  const [morePets, setMorePets] = useState([]);
  const [breeds] = useBreedList(animal);

  const results = useQuery({
    queryKey: ["searchPets", requestParams],
    queryFn: fetchSearch,
  });
  const [adoptedPet, _] = useContext(AdoptedPetContext);
  let pets = results?.data?.pets ?? [];

  useEffect(() => {
    if (page === 0) return;
    async function paginate() {
      const pets = await fetchMorePets(page);
      setMorePets([...morePets, ...pets]);
    }
    paginate();
  }, [page]);
  return (
    <>
      <div className="relative mx-auto my-0 w-11/12">
        <form
          className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const obj = {
              location: formData.get("location") ?? "",
              animal: animal,
              breed: formData.get("breed") ?? "",
            };
            setRequestParams(obj);
          }}
        >
          {adoptedPet && (
            <div>
              <img
                className=" h-14 w-14 cursor-pointer rounded-full border-2 border-black  md:h-24 md:w-24"
                src={adoptedPet.images[0]}
                alt={adoptedPet.name}
              />
            </div>
          )}
          <label htmlFor="location">
            Location
            <input
              id="location"
              type="text"
              name="location"
              placeholder="Location"
              className="search-input"
            />
          </label>
          <label htmlFor="animal">
            Animal
            <select
              className="search-input"
              id="animal"
              value={animal}
              onChange={(e) => {
                setAnimal(e.target.value);
              }}
            >
              <option value=""></option>
              {ANIMALS.map((animal) => (
                <option key={animal}>{animal}</option>
              ))}
            </select>
          </label>
          <label htmlFor="breed">
            Breed
            <select
              className="search-input grayed-out-disabled"
              name="breed"
              id="breed"
              disabled={!breeds.length}
            >
              <option></option>
              {breeds.map((breed) => (
                <option key={breed}>{breed}</option>
              ))}
            </select>
          </label>
          <button className="rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50">
            Submit
          </button>
        </form>

        <Results pets={morePets ? [...pets, ...morePets] : pets} />
        <button
          className=" absolute bottom-0 left-1/2 -translate-y-full cursor-not-allowed rounded-lg bg-rose-700 px-4 py-2 font-mono text-white opacity-80"
          onClick={() => setPage(page + 1)}
          disabled={true}
        >
          More
        </button>
      </div>
    </>
  );
};

export default SearchParams;
