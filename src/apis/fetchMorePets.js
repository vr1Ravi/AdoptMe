const fetchMorePets = async (animal, page) => {
  const res = await fetch(
    ` https://pets-v2.dev-apis.com/pets?animal=${animal}&page=${page}`,
  );
  return res.json();
};

export default fetchMorePets;
