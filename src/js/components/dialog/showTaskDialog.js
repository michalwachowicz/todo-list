import tasks from "../../store/tasks";
import createIconButton from "../button/iconButton";
import DatePicker from "../picker/datePicker";
import PrioritySelect from "../select/prioritySelect";
import ProjectSelect from "../select/projectSelect";
import closeIcon from "!!raw-loader!../../../assets/icons/close.svg";
import projects from "../../store/projects";
import navigator from "../../utils/navigator";
import visibility from "../../utils/visibility";
import Dialog from "./dialog";

class ShowTaskDialog extends Dialog {
  constructor() {
    super(".dialog-show-task", ".form-show-task");

    this.taskChecked = false;

    this.titleInput = this.form.querySelector(".form-input-title");
    this.descriptionInput = this.form.querySelector(".form-input-description");

    this.btnCheck = this.dialog.querySelector(".btn-check");
    this.btnCheck.addEventListener("click", () => {
      const checkedClass = "checked";
      this.taskChecked = !this.taskChecked;

      if (this.taskChecked) {
        this.btnCheck.classList.add(checkedClass);
        this.title.classList.add(checkedClass);

        visibility.hide(this.labelBtns);
        visibility.hide(this.hr);

        tasks.getTasks().delete(this.current.id);
      } else {
        this.uncheckTask(checkedClass);
        tasks.getTasks().add(this.current);
      }

      tasks.renderTasks(navigator.getActiveItem().filter);
    });

    this.info = this.dialog.querySelector(".dialog-task-info");
    this.info.addEventListener("click", () => {
      if (!this.taskChecked) this.showForm();
    });

    this.labelBtns = this.dialog.querySelector(".form-btns-label");
    this.hr = this.dialog.querySelector("hr");

    this.title = this.info.querySelector(".dialog-task-title");
    this.description = this.info.querySelector(".dialog-task-description");

    this.closeBtn = createIconButton(closeIcon, "Close dialog", () =>
      this.dialog.close()
    );

    this.dialog.appendChild(this.closeBtn);

    this.datePicker = new DatePicker(".dialog-show-task", () =>
      this.updateValue("dueDate", this.datePicker.getDate())
    );

    this.projectSelect = new ProjectSelect(".dialog-show-task", () =>
      this.updateValue("projectId", this.projectSelect.getCurrentProject().id)
    );

    this.prioritySelect = new PrioritySelect(".dialog-show-task", () => {
      const priority = this.prioritySelect.getCurrentPriority();

      this.updateValue("priority", priority);
      this.btnCheck.classList = `btn btn-check btn-check-${priority}`;
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const task = tasks.createTask(
      this.titleInput.value,
      this.descriptionInput.value || null,
      this.datePicker.getDate(),
      this.projectSelect.getInput().value,
      this.prioritySelect.getInput().value
    );

    if (this.current && this.current.id !== -1) {
      const id = this.current.id;

      tasks.getTasks().update(id, { ...task, id });
      tasks.renderTasks(navigator.getActiveItem().filter);

      this.title.textContent = task.title;
      this.description.textContent = task.description;
    }

    this.hideForm();
  }

  onCancel() {
    this.hideForm();
  }

  updateValue(key, value) {
    const updatedTask = { ...this.current, [key]: value };

    tasks.getTasks().update(this.current.id, updatedTask);
    tasks.renderTasks(navigator.getActiveItem().filter);

    this.current = updatedTask;
  }

  open(object) {
    super.open(object);
    this.taskChecked = false;

    this.projectSelect.updateList();

    const titleValue = (this.current && this.current.title) || "";

    this.titleInput.value = titleValue;
    this.title.textContent = titleValue;

    const descriptionValue = (this.current && this.current.description) || "";

    this.descriptionInput.value = descriptionValue;
    this.descriptionInput.parentNode.dataset.value = descriptionValue;
    this.description.textContent = descriptionValue;

    this.btnCheck.classList = "btn btn-check";
    if (this.current && this.current.priority)
      this.btnCheck.classList.add(`btn-check-${this.current.priority}`);

    this.datePicker.updateDate((this.current && this.current.dueDate) || null);
    this.projectSelect.setCurrentProject(
      this.current && this.current.projectId
        ? projects.find((project) => project.id == this.current.projectId)
        : null
    );
    this.prioritySelect.setCurrentPriority(
      (this.curent && this.current.priority) || 4
    );

    this.hideForm();
    this.uncheckTask();
  }

  showForm() {
    visibility.hide(this.info);
    visibility.show(this.form);

    this.titleInput.value = (this.current && this.current.title) || "";
    this.descriptionInput.value =
      (this.current && this.current.description) || "";

    this.btnCheck.disabled = true;
  }

  hideForm() {
    visibility.show(this.info);
    visibility.hide(this.form);

    this.btnCheck.disabled = false;
  }

  uncheckTask(checkedClass = "checked") {
    this.taskChecked = false;

    this.btnCheck.classList.remove(checkedClass);
    this.title.classList.remove(checkedClass);

    visibility.show(this.labelBtns);
    visibility.show(this.hr);
  }
}

export default new ShowTaskDialog();
