import { UNCOMP_LIST, COMP_LIST } from "./index.js";
import {
  updateLocalDataAndLocalStorage,
  updateDisplayTodoList,
} from "./displayElement.js";
import { showAlert } from "./alert.js";

const moveToCompleted = (index) => {
  COMP_LIST.push(UNCOMP_LIST[index]);
  UNCOMP_LIST.splice(index, 1);

  updateLocalDataAndLocalStorage();
  updateDisplayTodoList();

  showAlert("warning");
};

const removeTodo = (index) => {
  COMP_LIST.splice(index, 1);

  updateLocalDataAndLocalStorage();
  updateDisplayTodoList();

  showAlert("danger");
};

const restoreToUncompleted = (index) => {
  UNCOMP_LIST.push(COMP_LIST[index]);
  COMP_LIST.splice(index, 1);

  updateLocalDataAndLocalStorage();
  updateDisplayTodoList();

  showAlert("success");
};

export { moveToCompleted, restoreToUncompleted, removeTodo };
