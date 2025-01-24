// PatronContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const PatronContext = createContext();

export const usePatronContext = () => {
  const context = useContext(PatronContext);
  if (!context) {
    throw new Error("usePatronContext must be used within a PatronProvider");
  }
  return context;
};

export const PatronProvider = ({ children }) => {
  const storedPatron = JSON.parse(localStorage.getItem("newPatron")) || {
    firstName: "",
    lastName: "",
    email: "",
    mobilePhone: "",
    address: {
      city: "",
      zipCode: "",
      country: "",
      state: "",
      address1: "",
      address2: "",
    },
    userId: "",
  };

  const [newPatron, setNewPatron] = useState(storedPatron);

  const updateNewPatron = (newValues) => {
    setNewPatron((prevPatron) => ({
      ...prevPatron,
      ...newValues,
    }));
  };

  useEffect(() => {
    // Save to localStorage whenever newPatron changes
    localStorage.setItem("newPatron", JSON.stringify(newPatron));
  }, [newPatron]);

  return (
    <PatronContext.Provider value={{ newPatron, updateNewPatron }}>
      {children}
    </PatronContext.Provider>
  );
};
