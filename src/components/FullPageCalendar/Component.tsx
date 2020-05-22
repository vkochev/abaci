import { ComponentProps } from ".";
import React from "react";
import styled, { css } from "styled-components";
import { shortWeekDays } from "./constants";
const Container = styled.div`
  margin: auto;
  background: ghostwhite;
  width: min-content;
  font-weight: 300;
  @media screen and (min-width: 640px) {
    padding: 20px;
  }
`;
const DaysGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  grid-template-columns: repeat(7, 1fr);
  width: calc(100vmin - 4px);
  grid-gap: 4px;

  @media screen and (min-width: 640px) {
    height: calc(100vmin - 80px - 5vmin);
    width: calc(100vmin - 40px);
    grid-gap: 20px;
  }
`;
const ColumnHeader = styled.div`
  font-size: 5vmin;
  align-self: center;
  color: #d3d3d3;
`;
const removeButtonStyled = css`
  border: none;
  font: inherit;
  background: none;

  &:hover {
    cursor: pointer;
  }
`;
const currentMonthCss = css`
  background: #e5f9ff;
  border: solid 1px #d4f2fb30;
  box-shadow: 0px 0px 1px 1px #f1f1f1;
`;
const otherMonthCss = css`
  background: #d3d3d340;
`;

const DayCard = styled.button<{ isCurrentMonth: boolean }>`
  ${removeButtonStyled}
  ${(props) => (props.isCurrentMonth ? currentMonthCss : otherMonthCss)}
  box-shadow: 0px 0px 1px 1px #f1f1f1;
  text-align: end;
  padding: 6px 10px;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 4px 2px #f1f1f1;
  }

  height: 100%;
  & > div {
    height: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 5vmin;
  margin: 10px 0;
`;
const YearContainer = styled.div``;
const ChangeMonthButton = styled.button`
  ${removeButtonStyled}
`;
export function Component(props: ComponentProps) {
  return (
    <Container>
      <Header>
        <ChangeMonthButton children="пред." onClick={props.showPrevMonth} />
        <YearContainer
          children={new Intl.DateTimeFormat(undefined, { month: "short", year: "numeric" }).format(props.anchorDate)}
        />
        <ChangeMonthButton children="след." onClick={props.showNextMonth} />
      </Header>
      <DaysGrid>
        {[...drawHeaders(shortWeekDays)]}
        {[...drawDays(props.daysRange, props.anchorDate)]}
      </DaysGrid>
    </Container>
  );
}

function* drawDays(range: Generator<Date>, now: Date) {
  while (true) {
    const next = range.next();
    if (next.done) return;

    yield (
      <DayCard isCurrentMonth={next.value.getMonth() === now.getMonth()}>
        <div>{next.value.getDate()}</div>
      </DayCard>
    );
  }
}

function* drawHeaders(range: Iterable<string>) {
  const iterator = range[Symbol.iterator]();
  while (true) {
    const next = iterator.next();
    if (next.done) return;
    yield <ColumnHeader>{next.value}</ColumnHeader>;
  }
}
