import React, { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllFav } from "../utils/api";

const useFavourites = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();                                                          //a type of useref hook
  const { user } = useAuth0();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allFavourites",                                                            //important to make a cache
    queryFn: () => getAllFav(user?.email, userDetails?.token),
    onSuccess: (data) =>
      setUserDetails((prev) => ({ ...prev, favourites: data })),                        //include recent data onto fav array
    enabled: user !== undefined,
    staleTime: 30000,                                                                         //after how much time we should refetch from server
  });

  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);                                                                               //whenever token is updated we have to refetch again

  return { data, isError, isLoading, refetch };
};

export default useFavourites;
