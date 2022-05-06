const buttonNexts = document.querySelectorAll(".btn-next");
const buttonPrevs = document.querySelectorAll(".btn-prev");
const cards = document.querySelectorAll(".card");
const progressStep = document.querySelectorAll(".step");
const togglePasswords = document.querySelectorAll(
  ".input-group.password .icon"
);

let stepNum = 0;
let currentStep = 0;
let nextStep = 1;

const stepAnimation = (
  currentIndex,
  nextIndex,
  beginClassNameAnim,
  finalClassNameAnim,
  staticClassName
) => {
  // Remove static class is active and add class begining animation
  cards[currentIndex].classList.remove(staticClassName);
  cards[currentIndex].classList.add(beginClassNameAnim);

  // function Start Animation
  const animationStart = () => {
    cards[currentIndex].classList.remove(beginClassNameAnim);
    cards[nextIndex].classList.add(finalClassNameAnim);
    cards[currentIndex].removeEventListener("animationend", animationStart);
  };

  // function End Animation
  const animationEnd = () => {
    cards[nextIndex].classList.add(staticClassName);
    cards[nextIndex].classList.remove(finalClassNameAnim);
    cards[nextIndex].removeEventListener("animationend", animationEnd);
  };

  // Add EventListener to remove class begin animation in current card in selected, then add final animation for next card in selected
  cards[currentIndex].addEventListener("animationend", animationStart);

  // Add EventListener to add static class in next card in selected, then remove final animation for next card in selected
  cards[nextIndex].addEventListener("animationend", animationEnd);
};

buttonNexts.forEach((btnNext) => {
  btnNext.addEventListener("click", () => {
    stepAnimation(currentStep, nextStep, "hide", "animation-next", "active");
    progressStep[nextStep].classList.add("active");
    currentStep++;
    nextStep++;
  });
});

buttonPrevs.forEach((btnPrev) => {
  btnPrev.addEventListener("click", () => {
    [currentStep, nextStep] = [nextStep, currentStep];
    currentStep--;
    nextStep--;

    stepAnimation(currentStep, nextStep, "hide", "animation-prev", "active");

    [currentStep, nextStep] = [nextStep, currentStep];

    progressStep[nextStep].classList.remove("active");
  });
});

togglePasswords.forEach((togglePass) => {
  togglePass.addEventListener("click", (el) => {
    if (el.target.classList.contains("hidden")) {
      el.target.classList.remove("hidden");
      el.target.classList.add("view");
      el.target.previousElementSibling.setAttribute("type", "text");
    } else {
      el.target.classList.remove("view");
      el.target.classList.add("hidden");
      el.target.previousElementSibling.setAttribute("type", "password");
    }
  });
});
