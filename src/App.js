import React, { useState, useEffect, createContext } from "react";
import Styled from "styled-components";
import { Routes, Route } from "react-router";
import Navigation from "./components/navbar";
import PetView from "./components/petView";
import FullPetView from "./components/fullPetView";
import { FetchData, changeStatusAndUpdate } from "./ApiHandler";
const AppContainer = Styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.lightgray};
`;

export const API = "petstore.swagger.io/v2";

export const Appcontext = createContext();

function App() {
  // TODO merge these into one state, i dont like how it splits up the data.
  // its propably better to have them splitted, so we dont have to filter the data
  // everytime we want to change the status
  // also updetePet is stupidly complicated cause of this
  const [soldPets, setSoldPets] = useState([]);
  const [pendingPets, setPendingPets] = useState([]);
  const [availablePets, setAvailablePets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("sold");
  const [error, setError] = useState(null);

  // need to be initialized in this scope
  const updatePet = (id, status) => {
    //find in which array the pet is
    const getPetAndStatus = () => {
      let pet = undefined;
      pet = soldPets.find((pet) => pet.id === id);
      if (pet) return [pet, "sold"];
      pet = pendingPets.find((pet) => pet.id === id);
      if (pet) return [pet, "pending"];
      pet = availablePets.find((pet) => pet.id === id);
      if (pet) return [pet, "available"];
    };
    const [pet, oldStatus] = getPetAndStatus();
    //remove from old array and get the pet
    if (oldStatus === "sold") {
      setSoldPets(soldPets.filter((pet) => pet.id !== id));
    } else if (oldStatus === "pending") {
      setPendingPets(pendingPets.filter((pet) => pet.id !== id));
    } else if (oldStatus === "available") {
      setAvailablePets(availablePets.filter((pet) => pet.id !== id));
    }
    pet.status = status;
    //add to new array
    if (status === "sold") setSoldPets([...soldPets, pet]);
    else if (status === "pending") setPendingPets([...pendingPets, pet]);
    else if (status === "available") setAvailablePets([...availablePets, pet]);
  };

  //provided handlers
  const changeStatus = (id, status) => changeStatusAndUpdate(updatePet, setError, id, status);
  const FetchSold = () => FetchData("sold", setSoldPets, setError, setCategories);
  const FetchPending = () => FetchData("pending", setPendingPets, setError, setCategories);
  const FetchAvailable = () => FetchData("available", setAvailablePets, setError, setCategories);

  useEffect(() => {
    FetchSold();
    return () => {};
  }, []);
  if (error)
    return (
      <AppContainer>
        <h1>Something went wrong</h1>
      </AppContainer>
    );
  return (
    <Appcontext.Provider
      value={{
        soldPets,
        pendingPets,
        availablePets,
        FetchSold,
        FetchAvailable,
        FetchPending,
        statusFilter,
        setStatusFilter,
        categoryFilter,
        setCategoryFilter,
        categories,
        changeStatus,
      }}
    >
      <Routes>
        <Route path="/pet/*" element={<FullPetView />} />
        <Route
          path="*"
          element={
            <>
              <AppContainer>
                <Navigation />
                <PetView />
              </AppContainer>
            </>
          }
        />
      </Routes>
    </Appcontext.Provider>
  );
}

export default App;
