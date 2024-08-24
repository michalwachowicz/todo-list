import inboxIcon from "!!raw-loader!../../assets/icons/inbox.svg";
import starIcon from "!!raw-loader!../../assets/icons/star.svg";
import calendarIcon from "!!raw-loader!../../assets/icons/calendar.svg";

const createNavItem = (name, icon, dataName = null, active = false) => {
  if (dataName == null) dataName = name.toLowerCase();

  return { name, dataName, icon, active };
};

const mainNav = [
  createNavItem("All tasks", inboxIcon, "all"),
  createNavItem("Today", starIcon),
  createNavItem("Upcomng", calendarIcon),
];

export { mainNav };
