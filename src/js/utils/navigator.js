import inboxIcon from "!!raw-loader!../../assets/icons/inbox.svg";
import starIcon from "!!raw-loader!../../assets/icons/star.svg";
import calendarIcon from "!!raw-loader!../../assets/icons/calendar.svg";
import projects from "../store/projects";

const createNavItem = (name, icon, dataName, active, filter) => {
  if (dataName == null) dataName = name.toLowerCase();

  return { name, dataName, icon, active, filter };
};

const mainNav = [
  createNavItem("All tasks", inboxIcon, "all", true, (task) => task),
  createNavItem("Today", starIcon, null, false, (task) => task),
  createNavItem("Upcoming", calendarIcon, null, false, (task) => task),
];
let fullNav = [];

const updateFullNav = () =>
  (fullNav = [...mainNav, ...projects.getProjects().getList()]);

const getActiveItem = () => fullNav.find((item) => item.active);

const activate = (navItem) => {
  updateFullNav();

  fullNav.forEach((item) => (item.active = item == navItem ? true : false));
};

const updateNavigationDOM = () => {
  const btns = [...document.querySelectorAll(`button.btn-sidebar`)];
  const activeBtn = btns.find((btn) => btn.classList.contains("active"));
  const activeItem = getActiveItem();

  if (activeBtn && activeBtn.dataset.name == activeItem.dataName) return;

  const targetBtn = btns.find((btn) => btn.dataset.name == activeItem.dataName);
  if (!targetBtn) return;

  btns.forEach((btn) => btn.classList.remove("active"));
  targetBtn.classList.add("active");

  const colorElement = document.querySelector(".main-title-project");

  if (activeItem.color) {
    colorElement.style.backgroundColor = activeItem.color;
    colorElement.classList.remove("hidden");
  } else {
    colorElement.classList.add("hidden");
  }

  const titleElement = document.querySelector(`.main-title`);
  titleElement.textContent = activeItem.name;
};

export default {
  mainNav,
  getActiveItem,
  activate,
  updateFullNav,
  updateNavigationDOM,
};
