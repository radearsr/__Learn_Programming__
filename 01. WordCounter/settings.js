import {
  editor,
  character,
  words,
  remainingCharFb,
  remainingCharTw,
  remainingCharGo,
  updateDisplay,
} from "./editor.js";

const clearAllText = document.getElementById("clearAll");
const fontSizeEl = document.querySelectorAll(
  ".set__font-size > .setting-other-item"
);
const fontWeightEl = document.querySelectorAll(
  ".set__font-weight > .setting-other-item"
);

const setFontStyle = (arrElement, command) => {
  arrElement.forEach((value, index) => {
    value.addEventListener("click", function () {
      arrElement.forEach((value) => {
        value.classList.remove("active");
      });

      if (command == "fontSize") {
        let valueFontSize = "";

        switch (index) {
          case 0:
            valueFontSize = "1em";
            break;
          case 1:
            valueFontSize = "1.2em";
            break;
          case 2:
            valueFontSize = "1.4em";
            break;
        }
        editor.style.fontSize = valueFontSize;
      } else {
        let valueFontFamily = "";

        switch (index) {
          case 0:
            valueFontFamily = "sans-serif";
            break;
          case 1:
            valueFontFamily = "monospace";
            break;
          case 2:
            valueFontFamily = "serif";
            break;
        }
        editor.style.fontFamily = valueFontFamily;
      }

      this.classList.add("active");
    });
  });
};

clearAllText.addEventListener("click", () => {
  editor.value = "";
  updateDisplay(character, 0);
  updateDisplay(words, 0);
  updateDisplay(remainingCharFb, 250);
  updateDisplay(remainingCharTw, 280);
  updateDisplay(remainingCharGo, 300);
});

setFontStyle(fontWeightEl, "fontWeigth");
setFontStyle(fontSizeEl, "fontSize");
