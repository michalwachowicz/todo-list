import "../scss/index.scss";
import createMainSection from "./components/main";
import createSidebar from "./components/sidebar";
import navigator from "./utils/navigator";
import tasks from "./store/tasks";

createSidebar();
createMainSection();

navigator.updateNavigationDOM("btn-sidebar", "main-title");
tasks.renderTasks(document.querySelector(".task-list"));
