const alertElements = document.querySelectorAll(".alert");

const showAlert = (className) => {
  alertElements.forEach((alert) => {
    alert.classList.remove("show");
  });
  alertElements.forEach((alert) => {
    if (alert.classList.contains(className)) {
      alert.classList.add("show");
      alert.addEventListener("click", function () {
        this.classList.remove("show");
      });
      setTimeout(function () {
        alert.classList.remove("show");
      }, 5000);
    }
  });
};

export { showAlert };
