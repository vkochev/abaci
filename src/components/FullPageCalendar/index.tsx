import React from 'react';
import { Component } from './Component';
import { getDaysRange } from './utils';
import { useCalendarContext } from '../../contexts/calendarContext';

type Props = {};

export function FullPageCalendar(props: Props) {
  const componentProps = useComponentProps();

  return <Component {...componentProps} />;
}

function useComponentProps() {
  const [{ anchorDate, firstDate, lastDate, nonRecurringIncomes, fixedIncomes }, dispatch] = useCalendarContext();
  const daysRange = getDaysRange(firstDate, lastDate);
  const monthYearString = new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' }).format(anchorDate);
  return {
    nonRecurringIncomes,
    fixedIncomes,
    daysRange,
    anchorDate,
    monthYearString,
    dispatch,
  };
}

export type ComponentProps = ReturnType<typeof useComponentProps>;
