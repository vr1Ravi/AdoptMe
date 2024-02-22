import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "../apis/fetchBreedList";

export default function useBreedList(animal) {
  const results = useQuery({
    queryKey: ["animal", animal],
    queryFn: fetchBreedList,
  });
  return [results?.data?.breeds ?? [], results.status];
}
