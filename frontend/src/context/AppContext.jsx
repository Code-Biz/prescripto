import React, { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const currencySymbol = "$";

const AppContextProvider = (props) => {
  const value = {
    doctors,
    currencySymbol,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

// 1. Without Provider → no sharing happens     2. value → data being shared globally   3. props.children = whatever will be wrapped inside the <AppContextProvider></AppContextProvider> such as Navbar + Doctors + Footer or App etc elements in the main.jsx folder
// THINK OF CONTEXT AS A COMMON NOTICE BOARD
// Any file that will be wrapped inside AppContextProvider element not the AppContext.Provider, will recieve what is being provided in the value-attribute also called as explicit-prop
// of AppContext.Provider by the return statement above and related funcitonality
// elelments wrapped inside a functional component are treated as implicit props and are called as props.children where children are represnt those wrapped components

// Simply:
// <AppContextProvider>
// <TopDoctors /> (THIS IS AN IMPLICIT PROP TO Parent component)
// </AppContextProvider>
// TopDoctors becomes a child (i.e props.children)
// Provider shares doctors globally via the value attribute
// TopDoctors can use:
// const {doctors} = useContext(AppContext)
