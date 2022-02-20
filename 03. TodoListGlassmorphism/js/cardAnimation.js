const buttonNavs = document.querySelectorAll(".nav-tab");
const tabContents = document.querySelectorAll(".tab__content");
const todoListWrapper = document.querySelector(".todo-list");

const cardAnimation = () => {
  buttonNavs.forEach((buttonNav) => {
    buttonNav.addEventListener("click", function () {
      buttonNavs.forEach((btnNav) => {
        btnNav.classList.remove("active");
      });
      tabContents.forEach((content) => {
        content.classList.remove("show");
      });
      buttonNav.classList.add("active");

      let attValue = this.getAttribute("data-target");
      let element = document.querySelector(attValue);

      if (element.parentElement.classList.contains("todo-list")) {
        element.parentElement.classList.remove("index-down");
      } else {
        todoListWrapper.classList.add("index-down");
      }

      element.classList.add("show");
    });
  });
};

export { cardAnimation };
