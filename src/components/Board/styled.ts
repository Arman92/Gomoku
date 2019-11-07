import styled from "styled-components";
import backgroundImage from "@gobang/assets/imgs/14103.jpg";

type BoardProps = {
  rows: number;
  columns: number;
};

export const BoardContainer = styled.div<BoardProps>`
  display: grid;
  grid-template-rows: repeat(${props => props.rows}, 4.5rem);
  grid-template-columns: repeat(${(props: any) => props.columns}, 4.5rem);
  /* background-image: url(${backgroundImage}); */
  background: #e6e6e6;
  /* grid-gap: 1rem; */
  padding: 10rem;

`;

export const ButtonContainer = styled.div`
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
  &:nth-child(-n + 8) {
    &:after {
      height: 50%;
      bottom: 0;
    }
  }

  /* last column of the grid */
  &:nth-child(8n) {
    &:before {
      width: 50%;
    }
  }

  /* first column of the grid */
  &:nth-child(8n + 1) {
    &:before {
      width: 50%;
      left: 50%;
    }
  }

  /* last row of the grid */
  &:nth-child(n + 57) {
    &:after {
      height: 50%;
      top: 0;
    }
  }
`;

export const Button = styled.button`
  width: 95%;
  height: 95%;
  background: gray;
  opacity: 0.6;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  transform: translate(2.5%, 2.5%);
  border-radius: 95%;
  z-index: 1;
`;
