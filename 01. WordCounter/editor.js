const words = document.getElementById("word");
const character = document.getElementById("character");
const editor = document.getElementById("text-editor");

const remainingCharFb = document.getElementById("remainCharFb");
const remainingCharTw = document.getElementById("remainCharTw");
const remainingCharGo = document.getElementById("remainCharGo");

const updateDisplay = (elementForUpdate, value) => {
  elementForUpdate.innerText = value;
};

const updateGroupDisplay = (elementForUpdate, value, template) => {
  elementForUpdate.innerText = parseInt(template) - parseInt(value);
};

const findDuplicate = (arr, value) => {
  const sameitem = [];
  arr.filter((item) => {
    if (item == value) {
      sameitem.push(arr.indexOf(item));
    }
  });
  return sameitem.length;
};

const getCharacter = (elementValueChar) => {
  let char = elementValueChar.value;
  let resultChar = char.length;

  return resultChar;
};

const getWords = (totalChar) => {
  let words = totalChar.split(" ");
  let resultWords = words.length;

  let checkDuplicate = findDuplicate(words, "");

  if (checkDuplicate > 1) {
    return resultWords - checkDuplicate;
  } else if (words.includes("")) {
    return resultWords - 1;
  } else {
    return resultWords;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  editor.addEventListener("input", function () {
    updateDisplay(character, getCharacter(editor));
    updateDisplay(words, getWords(this.value));
    updateGroupDisplay(remainingCharFb, getCharacter(editor), 250);
    updateGroupDisplay(remainingCharTw, getCharacter(editor), 280);
    updateGroupDisplay(remainingCharGo, getCharacter(editor), 300);
  });
});

export {
  editor,
  character,
  words,
  remainingCharFb,
  remainingCharTw,
  remainingCharGo,
  updateDisplay,
};
