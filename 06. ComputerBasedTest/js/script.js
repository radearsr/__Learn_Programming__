const questionNumbers = document.querySelectorAll(".aside__content__item");
const btnSidebar = document.querySelector(".aside__nav");
const contentActive = document.querySelector(".aside__nav > h2 ~ span");
const contentNonActive = document.querySelector(".aside__nav > h2");

let tempElement = "";

const classListCss = ["warning", "passed"];

const randomNum = (max) => {
  return Math.floor(Math.random() * max);
};

btnSidebar.addEventListener("click", function () {
  this.classList.toggle("active");
  contentNonActive.classList.toggle("d-none");
  contentActive.classList.toggle("d-none");
});

questionNumbers.forEach((el) => {
  el.addEventListener("click", function () {
    let contentItem = this.lastElementChild.lastElementChild;

    questionNumbers.forEach((number) => {
      number.classList.remove("active");
    });

    if (tempElement != "") {
      let className = classListCss[randomNum(2)];
      tempElement.classList.add(className);
      tempElement = "";
    }

    if (contentItem.innerText != "") {
      if (this.classList.contains("passed")) {
        this.classList.remove("passed");
      } else if (this.classList.contains("warning")) {
        this.classList.remove("warning");
      }
      tempElement = this;
    }

    this.classList.add("active");
  });
});
