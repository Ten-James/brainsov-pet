import React, { useState, useEffect, createContext } from "react";
import Styled from "styled-components";
import { Routes, Route } from "react-router";
import Navigation from "./components/navbar";
import PetView from "./components/petView";
import FullPetView from "./components/fullPetView";
const AppContainer = Styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.blue};
`;

export const API = "petstore.swagger.io/v2";

export const Appcontext = createContext();

function App() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({ sold: false, available: false, reserved: false, category: "" });
  const [error, setError] = useState(null);

  //TODO separated file

  //TODO petID notworking good wasted 30 mins on this
  const changeStatus = (id, name, status) => {
    console.log(id, status);
    const encodedNameKey = encodeURIComponent("name");
    const encodedNameValue = encodeURIComponent(name);
    const encodedStatusKey = encodeURIComponent("status");
    const encodedStatusValue = encodeURIComponent(status);
    const formBody = encodedNameKey + "=" + encodedNameValue + "&" + encodedStatusKey + "=" + encodedStatusValue;
    console.log(formBody);
    fetch(`https://${API}/pet/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: formBody,
    })
      .then((res) => {
        if (res.ok) {
          setData(data.map((pet) => (pet.id === id ? { ...pet, status: status } : pet)));
        }
        console.log(res);
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    //TODO backend optimization send some data then rest
    try {
      fetch(`https://${API}/pet/findByStatus?status=sold&status=available&status=pending`, { method: "GET" }).then((res) => {
        res.json().then((res) => {
          setData(res);
          //get categories
          let cats = [""];
          res.forEach((pet) => {
            if (pet.category) {
              if (!cats.includes(pet.category.name)) {
                cats.push(pet.category.name);
              }
            }
          });
          setCategories(cats);
        });
      });
    } catch (e) {
      setError(e);
    }
    return () => {};
  }, []);
  if (error)
    return (
      <AppContainer>
        <h1>Something went wrong</h1>
      </AppContainer>
    );
  return (
    <Appcontext.Provider value={{ data, setData, filter, setFilter, categories, changeStatus }}>
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
