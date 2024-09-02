import navigator from "../../utils/navigator";
import tasks from "../../store/tasks";
import DatePicker from "../picker/datePicker";
import ProjectSelect from "../select/projectSelect";
import projects from "../../store/projects";
import PrioritySelect from "../select/prioritySelect";
import Dialog from "./dialog";

const DIALOG_CLASS = ".dialog-add-edit";

class AddEditDialog extends Dialog {
  constructor() {
    super(DIALOG_CLASS, ".form-add-edit");

    this.datePicker = new DatePicker(DIALOG_CLASS);
    this.projectSelect = new ProjectSelect(DIALOG_CLASS);
    this.prioritySelect = new PrioritySelect(DIALOG_CLASS);

    this.nameInput = this.form.querySelector(".form-input-title");
    this.descriptionInput = this.form.querySelector(".form-input-description");
  }

  open(object) {
    super.open(object);

    this.projectSelect.updateList();
    const description = (this.current && this.current.description) || "";

    this.descriptionInput.value = description;
    this.descriptionInput.parentNode.dataset.value = description;

    this.nameInput.value = (this.current && this.current.title) || "";
    this.submitBtn.textContent = this.current ? "Edit task" : "Add task";
    this.datePicker.updateDate((this.current && this.current.dueDate) || null);
    this.projectSelect.setCurrentProject(
      this.current && this.current.projectId
        ? projects.find((project) => project.id == this.current.projectId)
        : null
    );
    this.prioritySelect.setCurrentPriority(
      (this.current && this.current.priority) || 4
    );
  }

  onSubmit(e) {
    e.preventDefault();

    const task = tasks.createTask(
      this.nameInput.value,
      this.descriptionInput.value || null,
      this.datePicker.getDate(),
      this.projectSelect.getInput().value,
      this.prioritySelect.getInput().value
    );

    if (this.current && this.current.id !== -1) {
      const id = this.current.id;
      tasks.getTasks().update(id, { ...task, id });
    } else {
      tasks.getTasks().add(task);
    }

    tasks.renderTasks(navigator.getActiveItem().filter);
    this.close();
  }
}

export default new AddEditDialog();
