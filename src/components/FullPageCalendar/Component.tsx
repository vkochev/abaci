import { ComponentProps } from '.';
import React from 'react';
import styled, { css } from 'styled-components';
import { shortWeekDays } from './constants';
import { DispatchCalendarAction, Incomes } from '../../contexts/calendarContext';
import { spaceBetweenFlexMixin } from '../../styledMixins';
const Container = styled.div`
  @media screen and (min-width: 640px) {
    padding: 20px;
  }
`;
const DaysGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 4px;

  @media screen and (min-width: 640px) {
    height: calc(100vmin - 60px - 5vmin);
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
  ${spaceBetweenFlexMixin}
  font-size: 5vmin;
`;
const YearContainer = styled.div``;
const ChangeMonthButton = styled.button`
  ${removeButtonStyled}
`;
export function Component(props: ComponentProps) {
  return (
    <Container>
      <Header>
        <ChangeMonthButton children="пред." onClick={() => props.dispatch({ type: 'show_prev_month' })} />
        <YearContainer children={props.monthYearString} />
        <ChangeMonthButton children="след." onClick={() => props.dispatch({ type: 'show_next_month' })} />
      </Header>
      <DaysGrid>
        {[...drawHeaders(shortWeekDays)]}
        {[...drawDays(props.daysRange, props.anchorDate, props.incomes, props.dispatch)]}
      </DaysGrid>
    </Container>
  );
}
const DayNumberContainer = styled.div`
  font-size: 1.5vh;
`;
function* drawDays(range: Generator<Date>, now: Date, incomes: Incomes, dispatch: DispatchCalendarAction) {
  while (true) {
    const { value, done } = range.next();
    if (done) return;

    const totalIncome = (incomes.get(value.valueOf()) ?? []).reduce((acc, cur) => acc + cur.value, 0);
    yield (
      <DayCard
        key={value.toISOString()}
        isCurrentMonth={value.getMonth() === now.getMonth()}
        onClick={() => dispatch({ type: 'select_date', value })}
      >
        <div>
          <DayNumberContainer>{value.getDate()}</DayNumberContainer>
          <div>{totalIncome}</div>
        </div>
      </DayCard>
    );
  }
}

function* drawHeaders(range: Iterable<string>) {
  const iterator = range[Symbol.iterator]();
  while (true) {
    const { value, done } = iterator.next();
    if (done) return;
    yield <ColumnHeader key={value}>{value}</ColumnHeader>;
  }
}
