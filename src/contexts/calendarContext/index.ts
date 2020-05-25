import { createContext, useReducer, useContext, PropsWithChildren, createElement, Dispatch } from "react";
import { getLastDate, getFirstDate } from "../../components/FullPageCalendar/utils";

type CalendarState = {
  firstDate: Date;
  lastDate: Date;
  anchorDate: Date;
  selectedDate: Date | null;
};
type CalendarAction =
  | {
      type: "show_prev_month";
    }
  | { type: "show_next_month" }
  | { type: "select_date"; value: Date }
  | { type: "unselect_date" };

export type DispatchCalendarAction = Dispatch<CalendarAction>;
const CalendarContext = createContext<[CalendarState, DispatchCalendarAction]>([
  initState({ anchorDate: new Date() }),
  () => {},
]);

export function CalendarContextProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(calendarContextReducer, { anchorDate: new Date() }, initState);
  return createElement(CalendarContext.Provider, { children, value: [state, dispatch] });
}

export function useCalendarContext() {
  return useContext(CalendarContext);
}

function calendarContextReducer(state: CalendarState, action: CalendarAction) {
  switch (action.type) {
    case "show_prev_month": {
      const prevDate = new Date(state.firstDate);
      prevDate.setDate(prevDate.getDate() - 1);
      return initState({ anchorDate: prevDate, selectedDate: state.selectedDate });
    }
    case "show_next_month": {
      const nextDate = new Date(state.lastDate);
      nextDate.setDate(nextDate.getDate() + 1);
      return initState({ anchorDate: nextDate, selectedDate: state.selectedDate });
    }
    case "select_date": {
      return initState({ anchorDate: state.anchorDate, selectedDate: action.value });
    }
    case "unselect_date": {
      return initState({ anchorDate: state.anchorDate });
    }
  }
}

type InitArgType = { anchorDate: Date; selectedDate?: Date | null };
function initState({ anchorDate, selectedDate }: InitArgType) {
  const firstDate = getFirstDate(anchorDate);
  const lastDate = getLastDate(firstDate);
  return {
    firstDate,
    lastDate,
    anchorDate: new Date(anchorDate),
    selectedDate: selectedDate ? new Date(selectedDate) : null,
  };
}
