import {
  isBefore,
  isToday,
  isYesterday,
  isTomorrow,
  format,
  startOfToday,
} from "date-fns";

export default function formatDate(date) {
  let formattedDate;
  const dateClass = isBefore(date, startOfToday()) ? "overdue" : "incoming";

  if (!date) {
    formattedDate = "Due date";
  } else if (isToday(date)) {
    formattedDate = "Today";
  } else if (isTomorrow(date)) {
    formattedDate = "Tomorrow";
  } else if (isYesterday(date)) {
    formattedDate = "Yesterday";
  } else {
    formattedDate = format(date, "dd MMM yyyy");
  }

  return { formattedDate, dateClass };
}
