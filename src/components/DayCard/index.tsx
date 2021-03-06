import React from 'react';
import { Component } from './Component';
import { useCalendarContext } from '../../contexts/calendarContext';

type Props = {};

export function DayCard(props: Props) {
  const componentProps = useComponentProps();

  if (!componentProps.show) return null;
  return <Component {...componentProps} />;
}

function useComponentProps() {
  const [{ selectedDate, nonRecurringIncomes, fixedIncomes }, dispatch] = useCalendarContext();
  const selectedDateString = selectedDate
    ? new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric', day: '2-digit' }).format(selectedDate)
    : null;
  return {
    selectedDate: selectedDate!,
    nonRecurringIncomes: selectedDate ? nonRecurringIncomes.get(selectedDate.valueOf()) : [],
    monthlyIncomes: selectedDate ? fixedIncomes.get('monthly')?.get(selectedDate.getUTCDate()) : [],
    selectedDateString,
    dispatch,
    show: Boolean(selectedDate),
  };
}

export type ComponentProps = ReturnType<typeof useComponentProps>;
