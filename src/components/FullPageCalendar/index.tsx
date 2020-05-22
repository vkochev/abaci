import React, { useState } from "react";
import { Component } from "./Component";
import { getFirstDate, getLastDate, getDaysRange } from "./utils";

type Props = {};

export function FullPageCalendar(props: Props) {
  const componentProps = useComponentProps(props);
  return <Component {...componentProps} />;
}

function useComponentProps(props: Props) {
  const [anchorDate, setAnchorDate] = useState(new Date());
  const firstDate = getFirstDate(anchorDate);
  const lastDate = getLastDate(firstDate);

  const daysRange = getDaysRange(firstDate, lastDate);

  return {
    daysRange,
    anchorDate,
    showPrevMonth() {
      const newAnchorDate = new Date(firstDate);
      newAnchorDate.setDate(newAnchorDate.getDate() - 1);
      setAnchorDate(newAnchorDate);
    },
    showNextMonth() {
      const newAnchorDate = new Date(lastDate);
      newAnchorDate.setDate(newAnchorDate.getDate() + 1);
      setAnchorDate(newAnchorDate);
    },
  };
}

export type ComponentProps = ReturnType<typeof useComponentProps>;
