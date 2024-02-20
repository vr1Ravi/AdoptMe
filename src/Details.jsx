import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";
const Details = () => {
  const { id } = useParams();
  const results = useQuery({
    queryKey: ["details", id],
    queryFn: fetchPet,
  }); /* First argument is an array having two values first is the cache key (it can be any random string), second is a value 
  for which we are making api call, now  useQuery will go to cache key and search for current id if present value will be returned
  other wise api will be called 
  */
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader"> 0 </h2>
      </div>
    );
  }
  const pet = results.data.pets[0];
  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
          <button>Adopt {pet.name}</button>
          <p>{pet.description}</p>
        </h2>
      </div>
    </div>
  );
};

export default Details;
