import inboxIcon from "!!raw-loader!../../assets/icons/inbox.svg";
import starIcon from "!!raw-loader!../../assets/icons/star.svg";
import calendarIcon from "!!raw-loader!../../assets/icons/calendar.svg";

const createNavItem = (name, icon, dataName = null, active = false) => {
  if (dataName == null) dataName = name.toLowerCase();

  return { name, dataName, icon, active };
};

const mainNav = [
  createNavItem("All tasks", inboxIcon, "all", true),
  createNavItem("Today", starIcon),
  createNavItem("Upcoming", calendarIcon),
];

const getActiveItem = () => mainNav.find((item) => item.active);

const activate = (navItem) =>
  mainNav.forEach((item) => (item.active = item == navItem ? true : false));

const updateNavigationDOM = (btnClass, titleClass) => {
  const btns = [...document.querySelectorAll(`button.${btnClass}`)];
  const activeBtn = btns.find((btn) => btn.classList.contains("active"));
  const activeItem = getActiveItem();

  if (activeBtn && activeBtn.dataset.name == activeItem.dataName) return;

  const targetBtn = btns.find((btn) => btn.dataset.name == activeItem.dataName);
  if (!targetBtn) return;

  btns.forEach((btn) => btn.classList.remove("active"));
  targetBtn.classList.add("active");

  const titleElement = document.querySelector(`.${titleClass}`);
  titleElement.textContent = activeItem.name;
};

export default { mainNav, activate, updateNavigationDOM };
