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
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal && (
            <Modal>
              <div>
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          )}
        </h2>
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
