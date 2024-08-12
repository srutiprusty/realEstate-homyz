import React, { useContext, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import "../Properties/Properties.css";
import UserDetailContext from "../../context/UserDetailContext";

const Bookings = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  const {
    userDetails: { bookings = [] } = {}, // Fallback to empty array if undefined
  } = useContext(UserDetailContext);

  // Ensure data and bookings are correctly populated
  console.log("Bookings:", bookings);
  console.log("Properties Data:", data);

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter">
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  // Ensure that `data` and `bookings` are arrays
  const filteredProperties = data
    ? data
        .filter((property) => bookings.some((booking) => booking.id === property.id)) // Check if the property id is in the bookings
        .filter(
          (property) =>
            property.title.toLowerCase().includes(filter.toLowerCase()) ||
            property.city.toLowerCase().includes(filter.toLowerCase()) ||
            property.country.toLowerCase().includes(filter.toLowerCase())
        )
    : []; // Fallback to empty array if data is undefined

  return (
    <div className="wrapper" >
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="paddings flexCenter properties">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((card, i) => (
              <PropertyCard card={card} key={i} />
            ))
          ) : (
            <span>No bookings found</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
