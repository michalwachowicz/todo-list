import flagIcon from "!!raw-loader!../../../assets/icons/flag.svg";
import Select from "./select";

const PRIORITIES = [
  { id: 1, name: "High", classList: "btn-select-priority-1", icon: flagIcon },
  { id: 2, name: "Medium", classList: "btn-select-priority-2", icon: flagIcon },
  { id: 3, name: "Low", classList: "btn-select-priority-3", icon: flagIcon },
  {
    id: 4,
    name: "No Priority",
    classList: "btn-select-priority-4",
    icon: flagIcon,
  },
];

export default class PrioritySelect extends Select {
  constructor(button, popup, input) {
    super(button, popup, input, PRIORITIES, (e) => this.#onClick(e));
    this.setCurrentPriority(4);
  }

  setCurrentPriority(id) {
    for (let i = 0; i < PRIORITIES.length; i++) {
      this.getButton().classList.remove(
        `btn-label-priority-${PRIORITIES[i].id}`
      );
    }
    const priority = PRIORITIES.find((p) => p.id == id);

    this.getButton().classList.add(`btn-label-priority-${id}`);
    this.getButton().innerHTML = priority.icon + priority.name;
    this.getInput().value = id;
  }

  #onClick(e) {
    this.setCurrentPriority(e.target.dataset.id);
  }
}
