export default class Dialog {
  constructor(dialog, form) {
    this.dialog = document.querySelector(dialog);
    this.form = document.querySelector(form);

    this.current = null;

    this.submitBtn = this.form.querySelector('button[type="submit"]');
    this.cancelBtn = this.form.querySelector(".btn-cancel");

    this.cancelBtn.addEventListener("click", this.onCancel.bind(this));
    this.form.addEventListener("submit", this.onSubmit.bind(this));
  }

  open(object = null) {
    this.current = object;
    this.dialog.showModal();
  }

  close() {
    this.dialog.close();
  }

  onSubmit(e) {
    e.preventDefault();
    throw new Error("onSubmit method must be implemented in the subclass");
  }

  onCancel() {
    this.close();
  }
}
