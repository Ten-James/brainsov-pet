import React from "react";
import styled from "styled-components";
import { Label } from "./label";

const StyledCheckbox = styled.input`
  background-color: ${(props) => props.theme.colors.lightblue};
  color: ${(props) => props.theme.colors.black};
  border: none;
  margin: 0.5em;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
`;

const Radiobox = ({ OnClick, name, checked }) => {
  return (
    <>
      <Label htmlFor={name}>{name}</Label>
      <StyledCheckbox type="radio" name={name} id={name} onClick={OnClick} checked={checked} />
    </>
  );
};

export default Radiobox;
