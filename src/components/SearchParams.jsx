import { useState, useEffect } from "react";
import useBreedList from "../hooks/useBreedList";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setShowMoreBtn } from "../slices/Pet";
import Results from "./Results";
import fetchSearch from "../apis/fetchSearch";
import fetchMorePets from "../apis/fetchMorePets";
import { Hearts } from "react-loader-spinner";

const ANIMALS = ["bird", "dog", "cat", "rabbit", "reptile"];
const SearchParams = () => {
  const [animal, setAnimal] = useState(localStorage.getItem("animal") ?? "");
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: animal,
    breed: "",
  });
  const [page, setPage] = useState(0);

  const [morePets, setMorePets] = useState([]);
  const [breeds] = useBreedList(animal);
  const dispatch = useDispatch();
  const { showMoreBtn } = useSelector((state) => state.pet);
  const { aboptedPet } = useSelector((state) => state.pet);

  const results = useQuery({
    queryKey: ["searchPets", requestParams],
    queryFn: fetchSearch,
  });

  let pets = results?.data?.pets ?? [];
  useEffect(() => {
    if (page === 0) return;
    async function paginate() {
      const data = await fetchMorePets(animal, page);
      const pets = data.pets;

      if (!data.hasNext) dispatch(setShowMoreBtn(false));
      setMorePets([...morePets, ...pets]);
    }
    paginate();
  }, [page]);

  if (results.isLoading) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Hearts
          height="80"
          width="80"
          color="#ef4741"
          ariaLabel="hearts-loading"
          visible={true}
        />
      </div>
    );
  }
  return (
    <>
      <div className="relative mx-auto my-0 w-11/12">
        <form
          className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
          onSubmit={(e) => {
            e.preventDefault();
            if (animal) dispatch(setShowMoreBtn(true));
            const formData = new FormData(e.target);
            const obj = {
              location: formData.get("location") ?? "",
              animal: animal,
              breed: formData.get("breed") ?? "",
            };
            setRequestParams(obj);
          }}
        >
          {aboptedPet && (
            <div>
              <img
                className=" h-14 w-14 cursor-pointer rounded-full border-2 border-black  md:h-24 md:w-24"
                src={aboptedPet.images[0]}
                alt={aboptedPet.name}
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
                setPage(0);
                setMorePets([]);
                localStorage.setItem("animal", e.target.value);
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
          className={`${!showMoreBtn && "hidden"} absolute bottom-0 left-1/2  -translate-x-1/2 -translate-y-full  rounded-lg bg-rose-700 px-4 py-2 font-mono text-white`}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          More
        </button>
      </div>
    </>
  );
};

export default SearchParams;
