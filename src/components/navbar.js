import React from "react";
import styled from "styled-components";
import { Button } from "./button";
import FilterPanel from "./filterpanel";

const Fixed = styled.div`
  position: fixed;
  width: 100%;
`;
const Navbar = styled.div`
  width: auto;
  background-color: ${(props) => props.theme.colors.lightblue};
  display: grid;
  padding: 0 20px;
  grid-template-columns: 1fr auto;
  > h1 {
    color: ${(props) => props.theme.colors.darkblue};
  }
  > div {
    display: grid;
    grid-template-columns: auto auto auto;
    align-items: center;
    justify-content: flex-end;
    gap: 2em;
  }
  button {
    background-color: ${(props) => props.theme.colors.darkblue};
    color: ${(props) => props.theme.colors.lightblue};
  }
`;
//TODO move to another file.
const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 5em;
  background-color: ${(props) => props.theme.colors.darkblue};
  color: ${(props) => props.theme.colors.lightblue};
  display: flex;
  justify-content: center;
  align-items: center;
  pointer: none;
`;

const Navigation = () => {
  return (
    <Fixed>
      <Navbar>
        <h1>PET CENTER</h1>
        <div>
          <Button>Add</Button>
          <Button disabled={true}>Log in</Button>
          <Avatar>
            <span className="material-symbols-outlined">person</span>
          </Avatar>
        </div>
      </Navbar>
      <FilterPanel />
    </Fixed>
  );
};

export default Navigation;
