import { useState, useEffect } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import requestPets from "./api";
const ANIMALS = ["bird", "dog", "cat", "rabbit", "reptile"];
const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  useEffect(() => {
    requestPets(setPets, animal, location, breed);
  }, []);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets(setPets, animal, location, breed);
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            type="text"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name=""
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
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
            name=""
            id="breed"
            value={breed}
            disabled={!breeds.length}
            onChange={(e) => setBreed(e.target.value)}
          >
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
