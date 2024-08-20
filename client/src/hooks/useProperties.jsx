import React from "react";
import { useQuery } from "react-query";
import { getAllProperties } from "../utils/api";

const useProperties = () => {
  const { data, isLoading, isError, refetch } = useQuery(                       /* this 4 imported from usequery */
    "allProperties",                                                                // or  queryKey:"allProperties"
    getAllProperties,                                                               //query function
    { refetchOnWindowFocus: false }                                                //everytime focused windows will too much network consuming
  );

  return {                                                                            /* should be curly braces to be used as object */
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useProperties;
