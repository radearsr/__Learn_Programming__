const navbar = document.querySelector("nav.navbar");
const navbarToggle = document.querySelector("#menu-bars");
const navbarItems = document.querySelectorAll("nav.navbar > .navbar-item");

const searchElement = document.querySelector(".form-search");
const searchOpen = document.querySelector("#menu-search");
const searchClose = document.querySelector("#close");

const spyScroll = () => {
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    const scrollPos =
      document.documentElement.scrollTop || document.body.scrollTop;

    for (let index in sections) {
      if (scrollPos >= sections[index].offsetTop - 70) {
        // console.log(sections[index]);
        // console.log(`Scroll position : ${scrollPos}`);
        // console.log(`Offset Section : ${sections[index].offsetTop}`);

        const idSection = sections[index].getAttribute("id");

        navbarItems.forEach((navItem) => {
          navItem.classList.remove("active");
        });

        navbarItems.forEach((navItem) => {
          if (navItem.getAttribute("href") == `#${idSection}`) {
            navItem.classList.add("active");
          }
        });
      }
    }
  });
};
spyScroll();

navbarItems.forEach((navItem) => {
  navItem.addEventListener("click", function () {
    navbarItems.forEach((navItem) => {
      navItem.classList.remove("active");
    });
    this.classList.add("active");
  });
});

navbarToggle.addEventListener("click", function () {
  if (this.classList.contains("fa-bars")) {
    this.classList.remove("fa-bars");
    this.classList.add("fa-xmark");
  } else {
    this.classList.remove("fa-xmark");
    this.classList.add("fa-bars");
  }
  navbar.classList.toggle("active");
});

searchOpen.addEventListener("click", () => {
  searchElement.classList.add("active");
});

searchClose.addEventListener("click", () => {
  searchElement.classList.remove("active");
});

const swiper = new Swiper(".container", {
  loop: true,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    clickable: true,
  },
});

const review = new Swiper(".review", {
  spaceBetween: 10,
  loop: true,
  autoplay: {
    delay: 3000,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
