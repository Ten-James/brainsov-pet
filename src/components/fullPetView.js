import React, { useState, useEffect, useContext } from "react";
import { API, Appcontext } from "../App";
import styled from "styled-components";
import { Button } from "./button";
const FakeImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  color: ${(props) => props.theme.colors.lightblue};
  > span {
    font-size: 5em;
  }
`;
const Maindiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: ${(props) => props.theme.colors.darkblue};
  padding: 1em;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
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
const FullPetView = () => {
  const [pet, setPet] = useState(null);
  const { changeStatus } = useContext(Appcontext);
  useEffect(() => {
    fetch(`https://${API}${window.location.pathname}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPet(data);
      });
  }, []);
  if (!pet) return <div>Not Found</div>;

  return (
    <Maindiv>
      <FakeImg>
        <span className="material-symbols-outlined">pets</span>
      </FakeImg>
      <div>
        <h1>{Capital(pet.name)}</h1>
        {pet.category && <h2>Category: {Capital(pet.category.name)}</h2>}
        <h3>Tags:</h3>
        {pet.tags && pet.tags.map((tag, index) => <p key={index}>{Capital(tag.name)}</p>)}
        <h2>Status: {Capital(pet.status)}</h2>
      </div>
      <ButtonDiv>
        {pet.status !== "available" && <Button onClick={() => changeStatus(pet.id, pet.name, "available")}>Set available</Button>}
        {pet.status !== "sold" && <Button onClick={() => changeStatus(pet.id, pet.name, "sold")}>Set sold</Button>}
        {pet.status !== "pending" && <Button onClick={() => changeStatus(pet.id, pet.name, "pending")}>Set pending</Button>}
      </ButtonDiv>
      <ButtonDiv>
        <Button onClick={() => (window.location = "/")}>Back</Button>
      </ButtonDiv>
    </Maindiv>
  );
};

export default FullPetView;
