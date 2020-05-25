import React from "react";
import "./App.css";
import { FullPageCalendar } from "./components/FullPageCalendar";
import { CalendarContextProvider } from "./contexts/calendarContext";
import { DayCard } from "./components/DayCard";

function App() {
  return (
    <CalendarContextProvider>
      <div className="App">
        <FullPageCalendar />
        <DayCard />
      </div>
    </CalendarContextProvider>
  );
}

export default App;
