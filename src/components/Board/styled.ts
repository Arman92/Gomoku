import styled from "styled-components";

type BoardProps = {
  rows: number;
  columns: number;
};

export const BoardContainer = styled.div<BoardProps>`
  width: 100vw;
  height: 100vw;
  max-width: 100vh;
  max-height: 100vh;
  object-fit: contain;
  display: grid;
  grid-template-rows: repeat(${props => props.rows}, minmax(1rem, 1fr));
  grid-template-columns: repeat(${props => props.columns}, minmax(1rem, 1fr));
`;

export const ButtonContainer = styled.div<BoardProps>`
  position: relative;
  z-index: 0;

  &:before {
    content: "";
    position: absolute;
    border-bottom: 1px black solid;
    height: 50%;
    width: 100%;
    z-index: -1;
  }

  &:after {
    content: "";
    position: absolute;
    border-right: 1px black solid;
    height: 100%;
    width: 50%;
    z-index: -1;
  }

  /* first row of the grid */
  &:nth-child(-n + ${props => props.columns}) {
    &:after {
      height: 50%;
      bottom: 0;
    }
  }

  /* last column of the grid */
  &:nth-child(${props => props.rows}n) {
    &:before {
      width: 50%;
    }
  }

  /* first column of the grid */
  &:nth-child(${props => props.rows}n + 1) {
    &:before {
      width: 50%;
      left: 50%;
    }
  }

  /* last row of the grid */
  &:nth-child(n + ${props => props.rows * (props.columns - 1) + 1}) {
    &:after {
      height: 50%;
      top: 0;
    }
  }
`;

export const Button = styled.button`
  width: 75%;
  height: 75%;
  background: transparent;
  opacity: 0.6;
  border: none;
  position: absolute;
  cursor: pointer;
  transform: translate(15%, 15%);
  border-radius: 100%;
  z-index: 1;

  &.btn-free {
    &:hover {
      background: black;
      background: radial-gradient(circle at 30% 30%, #8c8c8c, #000);
    }

    &:active {
      opacity: 1;
      background: black;
      background: radial-gradient(circle at 30% 30%, #8c8c8c, #000);
    }
  }

  &.btn-selected-1 {
    opacity: 1;
    background: black;
    background: radial-gradient(circle at 30% 30%, blue, #000);
  }

  &.btn-selected-2 {
    opacity: 1;
    background: black;
    background: radial-gradient(circle at 30% 30%, red, #000);
  }
`;
