import styled from "styled-components";

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.lightblue};
  color: ${(props) => props.theme.colors.black};
  border: none;
  border-radius: 5em;
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
