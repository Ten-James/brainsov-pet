import React, { useContext } from "react";
import styled from "styled-components";
import Combobox from "./combobox";
import Radiobox from "./radio";
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
  const { setCategoryFilter, statusFilter, setStatusFilter, categories } = useContext(Appcontext);
  return (
    <StyledFilterPanel>
      <div>
        <Combobox
          OnClick={(opt) => {
            setCategoryFilter(opt);
          }}
          Options={categories}
        />
      </div>
      <div>
        <Radiobox
          OnClick={() => {
            setStatusFilter("sold");
            setCategoryFilter("All");
          }}
          name="Sold"
          checked={statusFilter === "sold"}
        />
        <Radiobox
          OnClick={() => {
            setStatusFilter("available");
            setCategoryFilter("All");
          }}
          name="Available"
          checked={statusFilter === "available"}
        />
        <Radiobox
          OnClick={() => {
            setStatusFilter("pending");
            setCategoryFilter("All");
          }}
          name="Pending"
          checked={statusFilter === "pending"}
        />
      </div>
    </StyledFilterPanel>
  );
};

export default FilterPanel;
