import {
  makeBtnGroupCompleted,
  makeBtnGroupUncompleted,
} from "./buttonElement.js";

const createWrapperEl = (title, date) => {
  const todoItem = document.createElement("div");
  todoItem.setAttribute(
    "class",
    "item-component row justify-content-between glass__effect"
  );

  const contentElement = createContentEl(title, date);

  todoItem.appendChild(contentElement);

  return todoItem;
};

const createContentEl = (title, date) => {
  const textContentEl = document.createElement("div");
  textContentEl.setAttribute("class", "text-content");

  const titleElement = document.createElement("h2");
  titleElement.setAttribute("class", "title-todo__component");

  titleElement.innerText = title;

  const dateElement = document.createElement("p");
  dateElement.setAttribute("class", "date-todo__component");

  dateElement.innerText = date;

  textContentEl.appendChild(titleElement);
  textContentEl.appendChild(dateElement);

  return textContentEl;
};

const makeFullElementUncompleted = (title, date, index) => {
  const todoItemEl = createWrapperEl(title, date);
  todoItemEl.appendChild(makeBtnGroupUncompleted(index));
  return todoItemEl;
};

const makeFullElementCompleted = (title, date, index) => {
  const todoItemEl = createWrapperEl(title, date);
  todoItemEl.appendChild(makeBtnGroupCompleted(index));
  return todoItemEl;
};

export { makeFullElementUncompleted, makeFullElementCompleted };
