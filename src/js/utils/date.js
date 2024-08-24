import {
  isBefore,
  isToday,
  isYesterday,
  isTomorrow,
  startOfDay,
  format,
} from "date-fns";

export default function formatDate(date) {
  let formattedDate;
  const dateClass = isBefore(date, startOfDay()) ? "overdue" : "incoming";

  if (isToday(date)) {
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
