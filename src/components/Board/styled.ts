import styled from "styled-components";

import boardBg from "@gobang/assets/imgs/2551066.jpg";

export const BoardContainer = styled.div`
  width: 90vw;
  height: 90vw;
  max-width: 90vh;
  max-height: 90vh;

  border-radius: 1rem;
  background-image: url(${boardBg});
`;
