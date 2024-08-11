// UserDetailContext.jsx
import React, { createContext, useState } from 'react';

const UserDetailContext = createContext();

const UserDetailProvider = ({ children }) => {
  // Initialize state with default values
  const [userDetails, setUserDetails] = useState({
    bookings: [], // Default to an empty array
    // Add other default values as needed
  });

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailContext.Provider>
  );
};

export { UserDetailProvider };
export default UserDetailContext;
