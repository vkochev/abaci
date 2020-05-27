import React from 'react';
import { FullPageCalendar } from './components/FullPageCalendar';
import { CalendarContextProvider } from './contexts/calendarContext';
import { DayCard } from './components/DayCard';
import styled from 'styled-components';
import { shadow1Mixin } from './styledMixins';

const Container = styled.div`
  margin: 0 auto;
  background: ghostwhite;
  ${shadow1Mixin}
  width: min-content;
  font-weight: 300;
  width: calc(100vmin - 4px);
  @media screen and (min-width: 640px) {
    width: calc(100vmin - 40px);
  }

  h1 {
    margin: 6px 0;
    font-weight: 300;
    font-size: 24px;
  }
`;

function App() {
  return (
    <CalendarContextProvider>
      <Container>
        <FullPageCalendar />
        <DayCard />
      </Container>
    </CalendarContextProvider>
  );
}

export default App;
