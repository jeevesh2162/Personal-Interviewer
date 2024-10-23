import React, { createContext, useState } from 'react';

// Create a context to store user information
export const UserContext = createContext();

// Provider component to wrap around your application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial state is null, meaning no user is logged in
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
