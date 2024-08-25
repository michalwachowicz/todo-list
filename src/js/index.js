import "../scss/index.scss";
import createMainSection from "./components/main";
import createSidebar from "./components/sidebar";
import navigator from "./utils/navigator";
import tasks from "./store/tasks";

createSidebar();
createMainSection();

navigator.updateFullNav();
navigator.updateNavigationDOM();

tasks.renderTasks(document.querySelector(".task-list"));
