import { UNCOMP_LIST, COMP_LIST } from "./index.js";
import {
  makeFullElementUncompleted,
  makeFullElementCompleted,
} from "./makeFullElement.js";
import {
  saveData,
  DATA_FOR_LOCAL_STORAGE as LOCAL_STORAGE,
} from "./storage.js";

const uncompParentEl = document.getElementById("todo-uncompleted");
const compParentEl = document.getElementById("todo-completed");
const searchUncomp = document.getElementById("search-uncomplete");
const searchComp = document.getElementById("search-complete");

const displayListComponent = (array, listElement, funcEl) => {
  listElement.innerHTML = "";

  if (array.length != 0) {
    for (let i = 0; i < array.length; i++) {
      const itemTodo = funcEl(array[i].title, array[i].date, i);
      listElement.appendChild(itemTodo);
    }
  } else {
    listElement.innerHTML = `<h2 class="list-not-found">== List Not Found ==</h2>`;
  }
};

const filterTodo = (keyword, listArray) => {
  let filteredList = listArray.filter((value) =>
    value.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return filteredList;
};

const updateLocalDataAndLocalStorage = () => {
  LOCAL_STORAGE.unComp = UNCOMP_LIST;
  LOCAL_STORAGE.comp = COMP_LIST;
  saveData();
};

const updateDisplayTodoList = () => {
  displayListComponent(UNCOMP_LIST, uncompParentEl, makeFullElementUncompleted);
  displayListComponent(COMP_LIST, compParentEl, makeFullElementCompleted);
};

export {
  filterTodo,
  displayListComponent,
  updateDisplayTodoList,
  updateLocalDataAndLocalStorage,
  searchUncomp,
  searchComp,
  uncompParentEl,
  compParentEl,
};
