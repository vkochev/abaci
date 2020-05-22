export function* getDaysRange(firstDate: Date, lastDate: Date) {
  let date: Date = new Date(firstDate);
  yield date;

  while (date <= lastDate) {
    date = new Date(date);
    date.setDate(date.getDate() + 1);
    yield date;
  }
}

export function getFirstDate(currentDate: Date) {
  const firstDayOfTheMonth = getFirstDayOfTheMonth(currentDate);
  return getMondayOfTheWeek(firstDayOfTheMonth);
}

export function getLastDate(firstDate: Date) {
  return new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 40);
}

function getFirstDayOfTheMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1, ...getZeroLocalHhMmSsMs(date.getTimezoneOffset()));
}

function getMondayOfTheWeek(date: Date) {
  const dayNumber = date.getDay();
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - dayNumber + 1);
}

function getZeroLocalHhMmSsMs(minutesOffset: number) {
  return [0, 0 + minutesOffset, 0, 0];
}
