import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "../AdoptedPetContext";
import Carousel from "./Carousel";
import fetchPet from "../apis/fetchPet";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
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
    <div className=" mx-auto h-screen  w-4/5 rounded-2xl bg-red-50 shadow-2xl">
      <Carousel images={pet.images} />
      <div className=" flex h-1/5 flex-col items-center justify-center">
        <h1 className=" mb-3 font-mono text-6xl font-extrabold">{pet.name}</h1>
        <h2 className="font-mono text-xl font-extrabold">
          {pet.animal} - {pet.breed} - {pet.city} - {pet.state}{" "}
        </h2>
        <button
          className="rounded-lg bg-rose-700 px-5 py-1 font-mono text-white"
          onClick={() => setShowModal(true)}
        >
          Adopt {pet.name}
        </button>
        <p className="p-3 text-center font-mono text-lg font-extrabold">
          {pet.description}
        </p>
        {showModal && (
          <Modal>
            <div className=" absolute left-1/2 top-2/3 flex h-1/3 w-1/2 -translate-x-1/2 -translate-y-1/2 flex-col justify-evenly  bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-3 text-white">
              <h1 className="mb-2 text-center font-mono text-3xl font-extrabold">
                Would you like to adopt {pet.name}?
              </h1>
              <div className="mx-auto flex w-1/4 justify-between">
                <button
                  className=" text-2xl"
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button
                  className=" text-2xl"
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

function detailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default detailsErrorBoundary;
