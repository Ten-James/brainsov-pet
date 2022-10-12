import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { Appcontext } from "../App";
import { Button } from "./button";
const StyledView = styled.div`
  background-color: ${(props) => props.theme.colors.darkgray};
  color: ${(props) => props.theme.colors.white};
  display: grid;
  grid-template-columns: 1fr 2fr;
  border: none;
  width: min(100%, 35em);
  height: 20em;
  margin: 0.5em;
  padding: 10px 20px;
  box-shadow: 3px 3px 5px black;
  border-radius: 0.5rem;
`;

const FakeImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  color: ${(props) => props.theme.colors.blue};
  > span {
    font-size: 3em;
  }
`;

const PetViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  width: 100%;
  padding-top: 15vh;
  height: 90vh;
  flex-wrap: wrap;
  overflow-y: scroll;
`;

const RightDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
`;

const ButtonDiv = styled.div`
  psition: relative;
  right: 0;
  width: fit-content;
  text-align: right;
  transform: translate(3em, 0.3em);
  background-color: ${(props) => props.theme.colors.white};
  padding: 0.8em;
  border-radius: 0.5rem;
  box-shadow: 3px 3px 5px black;
  display: flex;
  justify-content: spac-between;
  align-items: center;
  gap: 1em;
`;

const Capital = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const PetView = () => {
  const [pets, setPets] = useState([]);
  const {
    soldPets,
    availablePets,
    pendingPets,
    FetchSold,
    FetchAvailable,
    FetchPending,
    statusFilter,
    categoryFilter,
    changeStatus,
  } = useContext(Appcontext);

  useMemo(() => {
    if (statusFilter === "sold") FetchSold();
    if (statusFilter === "available") FetchAvailable();
    if (statusFilter === "pending") FetchPending();
  }, [statusFilter]);
  useMemo(() => {
    const tryGetCategoryName = (pet) => {
      if (!pet.category) return "";
      return pet.category.name;
    };
    if (statusFilter === "sold") {
      if (!soldPets) return;
      setPets(soldPets.filter((pet) => tryGetCategoryName(pet) === categoryFilter || categoryFilter === "All"));
    }
    if (statusFilter === "available") {
      if (!availablePets) return;
      setPets(availablePets.filter((pet) => tryGetCategoryName(pet) === categoryFilter || categoryFilter === "All"));
    }
    if (statusFilter === "pending") {
      if (!pendingPets) return;
      setPets(pendingPets.filter((pet) => tryGetCategoryName(pet) === categoryFilter || categoryFilter === "All"));
    }
  }, [soldPets, availablePets, pendingPets, statusFilter, categoryFilter]);
  console.log(soldPets && soldPets.length, availablePets && availablePets.length, pendingPets && pendingPets.length);
  return (
    <PetViewContainer>
      {pets ? (
        pets.map((pet, index) => {
          return <Pet key={index} pet={pet} changeStatus={changeStatus} />;
        })
      ) : (
        <h1>Loading...</h1>
      )}
    </PetViewContainer>
  );
};

const Pet = ({ pet, changeStatus }) => {
  return (
    <>
      <StyledView>
        <FakeImg>
          <span className="material-symbols-outlined">pets</span>
        </FakeImg>
        <RightDiv>
          <div>
            <h1>{Capital(pet.name)}</h1>
            {pet.category && <h2>Category: {Capital(pet.category.name)}</h2>}
            <h3>Tags:</h3>
            {pet.tags[0] && <p>{Capital(pet.tags[0].name)}</p>}
            <h2>Status: {Capital(pet.status)}</h2>
          </div>
          <ButtonDiv>
            <Button onClick={() => (window.location = `/pet/${pet.id}`)}>View</Button>
            {pet.status !== "available" && <Button onClick={() => changeStatus(pet.id, pet.name, "available")}>Set available</Button>}
            {pet.status !== "sold" && <Button onClick={() => changeStatus(pet.id, pet.name, "sold")}>Set sold</Button>}
            {pet.status !== "pending" && <Button onClick={() => changeStatus(pet.id, pet.name, "pending")}>Set pending</Button>}
          </ButtonDiv>
        </RightDiv>
      </StyledView>
    </>
  );
};
export default PetView;
