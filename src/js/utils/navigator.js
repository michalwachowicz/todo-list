import projects from "../store/projects";
import deleteProjectButton from "../components/button/deleteProjectButton";
import editProjectButton from "../components/button/editProjectButton";

import inboxIcon from "!!raw-loader!../../assets/icons/inbox.svg";
import starIcon from "!!raw-loader!../../assets/icons/star.svg";
import calendarIcon from "!!raw-loader!../../assets/icons/calendar.svg";

const createNavItem = (name, icon, active, filter) => {
  return {
    name,
    dataName: name.replace(" ", "_").toLowerCase(),
    icon,
    active,
    filter,
  };
};

const mainNav = [
  createNavItem("All tasks", inboxIcon, true, (task) => task),
  createNavItem("Today", starIcon, false, (task) => task),
  createNavItem("Upcoming", calendarIcon, false, (task) => task),
];
let fullNav = [];

const updateFullNav = () =>
  (fullNav = [...mainNav, ...projects.getProjects().getList()]);

const getActiveItem = () => fullNav.find((item) => item.active);

const activate = (navItem) => {
  updateFullNav();

  fullNav.forEach(
    (item) => (item.active = item.dataName == navItem.dataName ? true : false)
  );
};

const exists = (title) =>
  !!fullNav.find((i) => i.name.toLowerCase() == title.toLowerCase());

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

    deleteProjectButton.showButton(targetBtn.dataset.id);
    editProjectButton.showButton(targetBtn.dataset.id);
  } else {
    colorElement.classList.add("hidden");

    deleteProjectButton.hideButton();
    editProjectButton.hideButton();
  }

  const titleElement = document.querySelector(`.main-title`);
  titleElement.textContent = activeItem.name;
};

export default {
  mainNav,
  getActiveItem,
  activate,
  updateFullNav,
  exists,
  updateNavigationDOM,
};
