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
  padding-top: 7em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  overflow-y: scroll;
`;

const RightDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
`;

const ButtonDiv = styled.div`
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
  const { data, filter, changeStatus } = useContext(Appcontext);
  useMemo(() => {
    setPets(
      data.filter((pet) => {
        if (filter.category && pet.category.name !== filter.category) return false;
        if (filter.Sold && pet.status !== "sold") return false;
        if (filter.Available && pet.status !== "available") return false;
        if (filter.Reserved && pet.status !== "reserved") return false;
        return true;
      })
    );
  }, [data, filter]);
  return (
    <PetViewContainer>
      {pets &&
        pets.map((pet, index) => {
          return <Pet key={index} pet={pet} changeStatus={changeStatus} />;
        })}
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
