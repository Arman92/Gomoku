import styled from "styled-components";

import boardBg from "@gobang/assets/imgs/2551066.jpg";

export const BoardContainer = styled.div`
  width: 90vw;
  height: 90vw;
  max-width: 120vh;
  max-height: 90vh;

  border-radius: 1rem;
  background-image: url(${boardBg});

  display: flex;
  flex-direction: column;
  user-select: none;
  box-shadow: inset 0 0 3px #ffdebe, 1px 2px 7px #2d2d2d;
`;

export const Header = styled.header`
  text-align: center;
  color: #9c5321;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5), 0 -1px 1px rgba(0, 0, 0, 0.5);

  h1 {
    font-size: 2.5rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    letter-spacing: 0.3rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const GameContainer = styled.div`
  flex: 0.9;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.3;
  justify-content: center;
  align-items: stretch;

  button {
    margin: 2rem 1rem;
  }
`;
