import styled from "styled-components";
import backgroundImage from "@gobang/assets/imgs/wood-bg.jpg";

export const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${backgroundImage});
`;
