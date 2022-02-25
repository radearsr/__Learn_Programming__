const navbar = document.querySelector(".navbar");
const hamburgerMenu = document.querySelector(".navbar-bars");
const navList = document.querySelector(".navbar-list");

hamburgerMenu.addEventListener("click", function () {
  this.classList.toggle("active");
  navList.classList.toggle("collapse");
  navbar.classList.toggle("nav-collapse");
});

window.addEventListener("scroll", function () {
  let scrollPos = document.documentElement.scrollTop;

  if (scrollPos >= 550) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
