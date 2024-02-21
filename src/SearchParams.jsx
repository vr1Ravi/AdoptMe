import { useState, useContext } from "react";
import useBreedList from "./useBreedList";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
const ANIMALS = ["bird", "dog", "cat", "rabbit", "reptile"];
const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [page, setPage] = useState(0);
  const [breeds] = useBreedList(animal);
  const results = useQuery({
    queryKey: ["searchPets", requestParams],
    queryFn: fetchSearch,
  });
  const [adoptedPet, _] = useContext(AdoptedPetContext);
  let pets = results?.data?.pets ?? [];
  console.log(pets);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            location: formData.get("location") ?? "",
            animal: animal,
            breed: formData.get("breed") ?? "",
          };
          console.log(obj);
          setRequestParams(obj);
        }}
      >
        {adoptedPet && (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        )}
        <label htmlFor="location">
          Location
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
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
          <select name="breed" id="breed" disabled={!breeds.length}>
            <option></option>
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>

      <Results pets={pets} />
      <button onClick={() => setPage(page + 1)}>More</button>
    </div>
  );
};

export default SearchParams;
