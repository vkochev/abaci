import { ComponentProps } from ".";
import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  position: fixed;
  width: 100%;
  background: #fff;
  bottom: 0;
  margin: auto;
  height: 30vh;
  box-shadow: -2px -2px 6px 1px #d2d2d2, 2px -2px 6px 1px #d2d2d2;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
`;
const Link = styled.a`
  &:hover {
    cursor: pointer;
  }
`;
export function Component(props: ComponentProps) {
  return (
    <Container>
      <Header>
        <h1>{props.selectedDateString}</h1>
        <Link children="Close" onClick={() => props.dispatch({ type: "unselect_date" })} />
      </Header>
    </Container>
  );
}
