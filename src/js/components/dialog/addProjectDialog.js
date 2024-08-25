const dialog = document.querySelector("dialog#add-project-dialog");
const form = document.querySelector("form#add-project-form");

const colorPicker = form.querySelector('label[for="color"]');
const colorPickerInput = form.querySelector("#color");
const colorPickerPopup = form.querySelector(".form-color-popup");
// const cancelBtn = form.querySelector("button.btn-cancel");

let pickerOpen = false;
const colors = [
  "#dc2626",
  "#ea580c",
  "#d97706",
  "#ca8a04",
  "#65a30d",
  "#16a34a",
  "#059669",
  "#0d9488",
  "#0891b2",
  "#0284c7",
  "#2563eb",
  "#4f46e5",
];

const openDialog = () => {
  dialog.showModal();
};

const openColorPicker = () => {
  pickerOpen = true;
  colorPickerPopup.classList.remove("hidden");
};

const closeColorPicker = () => {
  pickerOpen = false;
  colorPickerPopup.classList.add("hidden");
};

(function fillColors() {
  colors.forEach((color) => {
    const li = document.createElement("li");
    li.classList = "form-color-popup-item";

    const btn = document.createElement("button");
    btn.classList = "btn project-color project-color-m";
    btn.style.backgroundColor = color;
    btn.dataset.color = color;
    btn.type = "button";

    li.appendChild(btn);
    colorPickerPopup.appendChild(li);
  });

  const color = colors[0];
  colorPicker.style.backgroundColor = color;
  colorPickerInput.value = color;
})();

colorPicker.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  openColorPicker();
});

colorPickerPopup.addEventListener("click", (e) => {
  e.stopPropagation();

  const target = e.target;
  if (target.classList.contains("project-color")) {
    const color = target.dataset.color;

    colorPickerInput.value = color;
    colorPicker.style.backgroundColor = color;

    closeColorPicker();
  }
});

window.addEventListener("click", (e) => {
  if (
    pickerOpen &&
    !colorPicker.contains(e.target) &&
    !colorPickerPopup.contains(e.target)
  ) {
    closeColorPicker();
  }
});

export default { openDialog };
