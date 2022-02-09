import {
  moveToCompleted,
  restoreToUncompleted,
  removeTodo,
} from "./buttonAction.js";

const createWrapperBtn = () => {
  const buttonEl = document.createElement("div");
  buttonEl.setAttribute("class", "button-content");

  return buttonEl;
};

const makeBtnGroupUncompleted = (index) => {
  const buttonEl = createWrapperBtn();

  const btnDone = document.createElement("button");
  btnDone.setAttribute("class", "btn btn-done");
  buttonEl.appendChild(btnDone);

  btnDone.addEventListener("click", function () {
    const itemElement = this.parentElement.parentElement;
    itemElement.classList.add("animation");

    itemElement.addEventListener("transitionend", () => {
      moveToCompleted(index);
    });
  });

  return buttonEl;
};

const makeBtnGroupCompleted = (index) => {
  const buttonEl = createWrapperBtn();

  const btnRestore = document.createElement("button");
  btnRestore.setAttribute("class", "btn btn-restore");

  buttonEl.appendChild(btnRestore);

  btnRestore.addEventListener("click", function () {
    const itemElement = this.parentElement.parentElement;

    itemElement.classList.add("animation");

    itemElement.addEventListener("transitionend", () => {
      restoreToUncompleted(index);
    });
  });

  const btnRemove = document.createElement("button");
  btnRemove.setAttribute("class", "btn btn-remove");

  buttonEl.appendChild(btnRemove);

  btnRemove.addEventListener("click", function () {
    const itemElement = this.parentElement.parentElement;

    itemElement.classList.add("animation");

    itemElement.addEventListener("transitionend", () => {
      removeTodo(index);
    });
  });

  return buttonEl;
};

export { makeBtnGroupCompleted, makeBtnGroupUncompleted };
