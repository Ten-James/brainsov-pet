import React, { useContext } from "react";
import styled from "styled-components";
import Combobox from "./combobox";
import Checkbox from "./checkbox";
import { Appcontext } from "../App";
const StyledFilterPanel = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  position: relative;
  border-radius: 0.5rem;
  box-shadow: 3px 3px 5px black;
  transform: translate(-0.5em, -0.5em);
  padding: 0.5em 1em;
  display: flex;
  gap: 4em;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  width: fit-content;
`;

const FilterPanel = () => {
  const { filter, setFilter, categories } = useContext(Appcontext);
  return (
    <StyledFilterPanel>
      <div>
        <Combobox
          OnClick={(opt) => {
            setFilter({ ...filter, category: opt });
          }}
          Options={categories}
        />
      </div>
      <div>
        <Checkbox
          OnClick={() => {
            setFilter({ ...filter, Sold: !filter.Sold });
          }}
          name="Sold"
        />
        <Checkbox
          OnClick={() => {
            setFilter({ ...filter, Available: !filter.Available });
          }}
          name="Available"
        />
        <Checkbox
          OnClick={() => {
            setFilter({ ...filter, Pending: !filter.Pending });
          }}
          name="Pending"
        />
      </div>
    </StyledFilterPanel>
  );
};

export default FilterPanel;
