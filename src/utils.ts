import { DateTime } from "luxon";

export const formatDate = (date: string | Date) => {
  const dateFormatted = typeof date === 'object'
    ? date.toString()
    : date

  return DateTime.fromISO(dateFormatted, { zone: "utc" })
    .toLocal()
    .toFormat("yyyy-MM-dd HH:mm");
};
