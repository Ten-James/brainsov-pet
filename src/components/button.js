import styled from "styled-components";

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 3px black;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  ${(props) =>
    !props.disabled
      ? `
  &:hover {
    scale: 1.3;
  }`
      : `
  opacity: 0.5;
  pointer: none;
  `}
`;
