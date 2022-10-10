import React, { useRef } from "react";
import styled from "styled-components";
import { Label } from "./label";
const Styledcombobox = styled.select`
  background-color: ${(props) => props.theme.colors.lightblue};
  color: ${(props) => props.theme.colors.black};
  border: none;
  margin: 0.5em;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
`;

const Styledoption = styled.option`
  background-color: ${(props) => props.theme.colors.lightblue};
  color: ${(props) => props.theme.colors.black};
`;

const Combobox = ({ OnClick, Options }) => {
  const ref = useRef();
  return (
    <>
      <Label htmlFor="combo">Category:</Label>
      <Styledcombobox ref={ref} onChange={() => OnClick(ref.current.value)} name="combo" id="combo">
        {Options.map((option, index) => {
          return (
            <Styledoption key={index} OnClick={() => OnClick(option)}>
              {option}{" "}
            </Styledoption>
          );
        })}
      </Styledcombobox>
    </>
  );
};

export default Combobox;
