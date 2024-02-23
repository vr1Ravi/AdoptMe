const fetchMorePets = async (page) => {
  const res = await fetch(
    ` http://pets-v2.dev-apis.com/pets?animal=dog&page=${page}`,
  );
  const data = await res.json();
  return data.pets;
};

export default fetchMorePets;
