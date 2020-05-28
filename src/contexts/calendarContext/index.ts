import { createContext, useReducer, useContext, PropsWithChildren, createElement, Dispatch } from 'react';
import { getLastDate, getFirstDate } from '../../components/FullPageCalendar/utils';
import { Immutable, produce as p } from 'immer';
import { localStorageSaverMiddleware as lsm, getFromLocalStorage } from '../../localStorage';
const localStorageKey = 'calendarContext';
type CalendarState = {
  firstDate: Date;
  lastDate: Date;
  anchorDate: Date;
  selectedDate: Date | null;
  nonRecurringIncomes: Map<number, Income[]>;
  fixedIncomes: Map<number, Income[]>;
};
type CalendarAction =
  | {
      type: 'show_prev_month';
    }
  | { type: 'show_next_month' }
  | { type: 'select_date'; value: Date }
  | { type: 'unselect_date' }
  | { type: 'add_income'; date: Date; value: Income; incomeType: 'fixed' | 'nonRecurring' };

export type Income = { tag: string; value: number };
export const incomeTypes = ['fixed', 'nonRecurring'] as const;
export type IncomeTypes = typeof incomeTypes[number];
export type Incomes = Immutable<CalendarState>['nonRecurringIncomes'];
const initialDate = new Date();
const initialState: CalendarState = getFromLocalStorage(localStorageKey) ?? {
  anchorDate: initialDate,
  firstDate: initialDate,
  lastDate: initialDate,
  selectedDate: null,
  nonRecurringIncomes: new Map(),
  fixedIncomes: new Map(),
};
export type DispatchCalendarAction = Dispatch<CalendarAction>;
const CalendarContext = createContext<[Immutable<CalendarState>, DispatchCalendarAction]>([
  recalculateFirstAndLastDate(initialState),
  () => {},
]);

export function CalendarContextProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(
    calendarContextReducer,
    recalculateFirstAndLastDate(initialState),
    recalculateFirstAndLastDate
  );
  return createElement(CalendarContext.Provider, { children, value: [state, dispatch] });
}

export function useCalendarContext() {
  return useContext(CalendarContext);
}

const calendarContextReducer = lsm(localStorageKey)(
  p((draft: CalendarState, action: CalendarAction) => {
    switch (action.type) {
      case 'show_prev_month': {
        const prevDate = new Date(draft.firstDate);
        prevDate.setDate(prevDate.getDate() - 1);
        draft.anchorDate = prevDate;
        return recalculateFirstAndLastDate(draft);
      }
      case 'show_next_month': {
        const nextDate = new Date(draft.lastDate);
        nextDate.setDate(nextDate.getDate() + 1);
        draft.anchorDate = nextDate;
        return recalculateFirstAndLastDate(draft);
      }
      case 'select_date': {
        draft.selectedDate = action.value;
        break;
      }
      case 'unselect_date': {
        draft.selectedDate = null;
        break;
      }
      case 'add_income': {
        const key = action.date.valueOf();
        switch (action.incomeType) {
          case 'nonRecurring': {
            const draftValue = draft.nonRecurringIncomes.get(key);
            if (draftValue) {
              draftValue.push(action.value);
            } else {
              draft.nonRecurringIncomes.set(key, [action.value]);
            }
            break;
          }
          case 'fixed': {
            const draftValue = draft.fixedIncomes.get(key);
            if (draftValue) {
              draftValue.push(action.value);
            } else {
              draft.fixedIncomes.set(key, [action.value]);
            }
            break;
          }
        }
      }
    }
    return draft;
  })
);

function recalculateFirstAndLastDate(state: CalendarState): CalendarState {
  state.firstDate = getFirstDate(state.anchorDate);
  state.lastDate = getLastDate(state.firstDate);

  return state;
}
