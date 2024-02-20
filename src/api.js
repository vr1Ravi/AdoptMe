async function requestPets(setPets, animal, location, breed) {
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );
  const json = await res.json();
  setPets(json.pets);
}
export default requestPets;
