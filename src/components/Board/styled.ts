import styled from "styled-components";

type BoardProps = {
  rows: number;
  columns: number;
};

export const BoardContainer = styled.div<BoardProps>`
  display: grid;
  grid-template-rows: repeat(${(props: BoardProps) => props.rows}, 4.5rem);
  grid-template-columns: repeat(${(props: any) => props.columns}, 4.5rem);
`;
