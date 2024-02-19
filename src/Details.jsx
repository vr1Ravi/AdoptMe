import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const Details = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default Details;
