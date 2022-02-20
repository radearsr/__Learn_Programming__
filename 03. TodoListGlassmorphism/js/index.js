let UNCOMP_LIST = [];
let COMP_LIST = [];

import { cardAnimation } from "./cardAnimation.js";
import { showAlert } from "./alert.js";
import {
  makeFullElementUncompleted,
  makeFullElementCompleted,
} from "./makeFullElement.js";
import {
  filterTodo,
  displayListComponent,
  updateDisplayTodoList,
  searchUncomp,
  searchComp,
  uncompParentEl,
  compParentEl,
} from "./displayElement.js";
import {
  isStorageExist,
  saveData,
  loadDataFromStorage,
  DATA_FOR_LOCAL_STORAGE as dtForLoStorage,
} from "./storage.js";

const formEl = document.forms["form-add-todo"];

document.addEventListener("DOMContentLoaded", function () {
  cardAnimation();

  if (isStorageExist()) {
    loadDataFromStorage();
  }

  formEl.addEventListener("submit", function (event) {
    const titleTodo = formEl["title-todo"].value;
    const dateTodo = formEl["date-todo"].value;

    UNCOMP_LIST.push({
      title: titleTodo,
      date: dateTodo,
    });

    saveData();

    updateDisplayTodoList();

    formEl.reset();

    event.preventDefault();

    showAlert("success");
  });

  searchUncomp.addEventListener("keyup", function () {
    displayListComponent(
      filterTodo(this.value, UNCOMP_LIST),
      uncompParentEl,
      makeFullElementUncompleted
    );
  });

  searchComp.addEventListener("keyup", function () {
    displayListComponent(
      filterTodo(this.value, COMP_LIST),
      compParentEl,
      makeFullElementCompleted
    );
  });
});

document.addEventListener("ondataloaded", function () {
  UNCOMP_LIST = dtForLoStorage.unComp;
  COMP_LIST = dtForLoStorage.comp;
  updateDisplayTodoList();
});

export { UNCOMP_LIST, COMP_LIST };
