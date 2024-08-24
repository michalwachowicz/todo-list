import "../scss/index.scss";
import createMainSection from "./components/main";
import createSidebar from "./components/sidebar";
import navigator from "./utils/navigator";
import { renderTasks } from "./task";

createSidebar();
createMainSection();
navigator.updateNavigationDOM("btn-sidebar", "main-title");
renderTasks(document.querySelector(".task-list"));
