import React from "react";
import { Component } from "./Component";
import { useCalendarContext } from "../../contexts/calendarContext";

type Props = {};

export function DayCard(props: Props) {
  const componentProps = useComponentProps();

  if (!componentProps.show) return null;
  return <Component {...componentProps} />;
}

function useComponentProps() {
  const [{ selectedDate }, dispatch] = useCalendarContext();
  const selectedDateString = selectedDate
    ? new Intl.DateTimeFormat(undefined, { month: "short", year: "numeric", day: "2-digit" }).format(selectedDate)
    : null;
  return { selectedDateString, dispatch, show: Boolean(selectedDate) };
}

export type ComponentProps = ReturnType<typeof useComponentProps>;
