const questionContainer = document.querySelector(".container");
const questionEl = document.querySelector(".question");
const wrapperAnswer = document.querySelector(".wrapper-options");
const bannerEl = document.querySelector("main > .container .banner-end");

const remainingTimeEl = document.querySelector(".remaining-time");
const currentNumQuestion = document.querySelector("#current-question");
const totalNumQuestion = document.querySelector("#total-question");
const totalCurrentPoint = document.querySelector("#current-point");
const toggleFullscreen = document.querySelector(".fullscreen");
const toggleExitFullscreen = document.querySelector(".exit-fullscreen");
const toggleMusicInfo = document.querySelector(".toggle-info span");
const windowElement = document.documentElement;

const alertCorrect = document.querySelector(".correct-alert");
const alertIncorrect = document.querySelector(".incorrect-alert");
const firstBars = document.querySelectorAll(".first-bar");
const secondBars = document.querySelectorAll(".second-bar");

const toggleMusic = document.querySelector(".toggle-music");
const audioMusic = document.querySelector("#audio");
const timer = document.querySelector("#timer");
const music = document.querySelector("#music");

const buttonStart = document.querySelector(".btn-start");
const buttonRetry = document.querySelector(".btn-retry");
const homePage = document.querySelector(".home-page");
const endPage = document.querySelector(".end-page");

const accuracyRange = document.querySelector(".range-success");
const accuracyToggle = document.querySelector(".toggle-range");
const displayTotalPoint = document.querySelector("#total-point");
const resultCorrect = document.querySelector("#result-correct");
const resultIncorrect = document.querySelector("#result-incorrect");

let currentQuestionIndex;
let timeQuestion;
let audioPlaying;

const quizQuestion = [
  {
    question: "What is 4 X 4 ?",
    answers: [
      {
        content: "12",
        correct: false,
      },
      {
        content: "16",
        correct: true,
      },
      {
        content: "8",
        correct: false,
      },
      {
        content: "4",
        correct: false,
      },
    ],
    score: 100,
  },
  {
    question: "What is 6 + 6 ?",
    answers: [
      {
        content: "12",
        correct: true,
      },
      {
        content: "16",
        correct: false,
      },
      {
        content: "8",
        correct: false,
      },
      {
        content: "4",
        correct: false,
      },
    ],
    score: 100,
  },
  {
    question: "What is 12 + 12 ?",
    answers: [
      {
        content: "8",
        correct: false,
      },
      {
        content: "10",
        correct: false,
      },
      {
        content: "4",
        correct: false,
      },
      {
        content: "24",
        correct: true,
      },
    ],
    score: 100,
  },
  {
    question: "What is 20 x 2 ?",
    answers: [
      {
        content: "20",
        correct: false,
      },
      {
        content: "40",
        correct: true,
      },
      {
        content: "22",
        correct: false,
      },
      {
        content: "10",
        correct: false,
      },
    ],
    score: 100,
  },
  {
    question: "What is 20 / 2 ?",
    answers: [
      {
        content: "10",
        correct: true,
      },
      {
        content: "20",
        correct: false,
      },
      {
        content: "40",
        correct: false,
      },
      {
        content: "22",
        correct: false,
      },
    ],
    score: 100,
  },
  {
    question: "What is 20 - 2 ?",
    answers: [
      {
        content: "16",
        correct: false,
      },
      {
        content: "22",
        correct: false,
      },
      {
        content: "18",
        correct: true,
      },
      {
        content: "10",
        correct: false,
      },
    ],
    score: 100,
  },
];

const quizConfig = {
  delayBeforeNextQuestion: 3000,
  incorrectAnswer: 0,
  correctAnswer: 0,
  totalCurrentPoint: 0,
  workingStatus: false,
};

function startGame() {
  if (music.checked) {
    toggleMusic.firstElementChild.classList.remove("active");
    toggleMusicInfo.innerText = "on";
    playMusic();
  }
  quizConfig.correctAnswer = 0;
  quizConfig.incorrectAnswer = 0;
  quizConfig.totalCurrentPoint = 0;
  currentQuestionIndex = 0;
  nextQuestion(currentQuestionIndex);
}

function playMusic() {
  audioPlaying = setInterval(() => {
    if (audioMusic.paused) {
      audioMusic.play();
    }
  }, 100);
}

// function for Handle content question and answer from array
function nextQuestion(index) {
  currentNumQuestion.innerText = index + 1;
  totalNumQuestion.innerText = quizQuestion.length;
  totalCurrentPoint.innerText = quizConfig.totalCurrentPoint;

  questionEl.innerText = quizQuestion[index].question;
  quizQuestion[index].answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.content;
    if (answer.correct) {
      button.dataset.correct = answer.correct;
      button.dataset.score = quizQuestion[index].score;
    }
    button.classList.add("option");
    button.addEventListener("click", selectAnswer);
    wrapperAnswer.appendChild(button);
  });

  if (timer.checked) {
    remainingTimeEl.classList.remove("d-none");
    questionTimeRemaining();
  }
}

// function for reset display in container question and button answer
function resetDisplayConfig() {
  questionEl.innerText = "";
  let buttonAnswers = Array.from(wrapperAnswer.children);
  buttonAnswers.forEach((btn) => btn.remove());

  firstBars.forEach((bar) => {
    bar.style.width = 0;
  });

  secondBars.forEach((bar) => {
    bar.style.width = 0;
  });

  remainingTimeEl.style.backgroundColor = "rgb(172, 172, 172)";
  remainingTimeEl.style.right = "0";
}

// function for handle when button answer clicked
function selectAnswer(e) {
  clearInterval(timeQuestion);
  const buttonTarget = e.target;
  const buttons = Array.from(wrapperAnswer.children);
  buttons.forEach((btn) => {
    btn.removeEventListener("click", selectAnswer);
  });

  let filteredButton;

  if (buttonTarget.dataset.correct) {
    quizConfig.correctAnswer++;
    if (quizConfig.totalCurrentPoint > 0) {
      let total =
        parseInt(quizConfig.totalCurrentPoint) +
        parseInt(buttonTarget.dataset.score);
      quizConfig.totalCurrentPoint = total;
    } else {
      quizConfig.totalCurrentPoint = buttonTarget.dataset.score;
    }

    buttonTarget.classList.add("success-selected");
    filteredButton = buttons.filter((btn) => !btn.dataset.correct);
    alertAppear(alertCorrect, quizConfig.delayBeforeNextQuestion);
    fullTimeDelay(140, firstBars, 0);
  } else {
    quizConfig.incorrectAnswer++;

    buttonTarget.classList.add("danger");
    filteredButton = buttons.filter((btn) => {
      if (!btn.dataset.correct && btn != buttonTarget) {
        return btn;
      } else if (btn.dataset.correct) {
        btn.classList.add("success");
      }
    });
    alertAppear(alertIncorrect, quizConfig.delayBeforeNextQuestion);
    fullTimeDelay(140, firstBars, 1);
  }

  filteredButton.forEach((button) => {
    button.classList.add("hide");
  });
}

// function remaining time before next question
function questionTimeRemaining() {
  let rightValue = 0;

  timeQuestion = setInterval(() => {
    if (rightValue >= 100) {
      clearInterval(timeQuestion);
      let buttonAnswers = Array.from(wrapperAnswer.children);
      quizConfig.incorrectAnswer++;

      buttonAnswers.forEach((btn) => {
        btn.removeEventListener("click", selectAnswer);

        if (btn.dataset.correct) {
          btn.classList.add("success");
        }
      });
      buttonAnswers.forEach((btn) => {
        if (!btn.dataset.correct) {
          btn.classList.add("hide");
        }
      });
      alertAppear(alertIncorrect, quizConfig.delayBeforeNextQuestion);
      fullTimeDelay(140, firstBars, 1);
    } else {
      rightValue += 1;
      remainingTimeEl.style.right = rightValue + "%";
      if (rightValue >= 50 && rightValue <= 69) {
        remainingTimeEl.style.backgroundColor = "yellow";
      } else if (rightValue >= 70) {
        remainingTimeEl.style.backgroundColor = "red";
      }
    }
  }, 100);
}

// function for handle appear alert when answer correct or incorrect
function alertAppear(alertEl, delay) {
  alertEl.classList.add("appear");

  setTimeout(() => {
    resetDisplayConfig();
    currentQuestionIndex++;
    alertEl.classList.remove("appear");
    questionContainer.classList.add("hide");
    questionContainer.addEventListener("transitionend", handleNextQuestion);
  }, delay);
}

// function for eventListener question container
function handleNestedFromNextQuestion() {
  if (currentQuestionIndex >= quizQuestion.length) {
    endQuiz();
    setTimeout(() => {
      calculationResultQuiz();
      endPage.classList.add("page-active");
    }, 1000);
  } else {
    nextQuestion(currentQuestionIndex);
    questionContainer.removeEventListener(
      "transitionend",
      handleNestedFromNextQuestion
    );
  }
}

function handleNextQuestion(e) {
  if (e.propertyName == "transform") {
    questionContainer.classList.remove("hide");
    questionContainer.addEventListener(
      "transitionend",
      handleNestedFromNextQuestion
    );
  }
}

// function for display banner end quizQuestion and reset all event listener
function endQuiz() {
  clearInterval(audioPlaying);
  audioMusic.currentTime = 0;
  audioMusic.pause();

  bannerEl.classList.add("show");
  homePage.removeEventListener("transitionend", handleStartquizQuestion);
  questionContainer.removeEventListener("transitionend", handleNextQuestion);
  questionContainer.removeEventListener(
    "transitionend",
    handleNestedFromNextQuestion
  );
  resetDisplayConfig();
}

// function for display result score quiz
function calculationResultQuiz() {
  displayTotalPoint.innerText = quizConfig.totalCurrentPoint;
  resultCorrect.innerText = quizConfig.correctAnswer;
  resultIncorrect.innerText = quizConfig.incorrectAnswer;

  const resultQuiz = (quizConfig.correctAnswer / quizQuestion.length) * 100;
  const fixedResult = resultQuiz.toFixed();
  const valueAccuracy = 100 - fixedResult;

  accuracyToggle.innerText = fixedResult + "%";
  accuracyRange.style.right = valueAccuracy + "%";
}

// function for eventlistner homepage
function handleStartquizQuestion(event) {
  if (event.propertyName == "opacity") {
    startGame();
    this.classList.add("d-none");
    questionContainer.classList.remove("hide");
  }
}

function timeDelay(element, delay) {
  let width = 0;
  return new Promise((resolve) => {
    let progressBar = setInterval(() => {
      if (width >= 100) {
        clearInterval(progressBar);
        resolve(secondBars);
      } else {
        width += 10;
        element.style.width = width + "%";
      }
    }, delay);
  });
}

// Async function for delay before next question
async function fullTimeDelay(delay, firstEl, index) {
  let secondEl = await timeDelay(firstEl[index], delay);

  timeDelay(secondEl[index], delay);
}

document.addEventListener("DOMContentLoaded", () => {
  toggleMusic.addEventListener("click", function () {
    this.firstElementChild.classList.toggle("active");
    if (this.firstElementChild.classList.contains("active")) {
      toggleMusicInfo.innerText = "off";
      audioMusic.pause();
      clearInterval(audioPlaying);
    } else {
      toggleMusicInfo.innerText = "on";
      playMusic();
    }
  });

  buttonStart.addEventListener("click", () => {
    homePage.classList.add("hidden");
    homePage.addEventListener("transitionend", handleStartquizQuestion);
  });

  buttonRetry.addEventListener("click", function () {
    homePage.classList.remove("hidden");
    homePage.classList.remove("d-none");
    bannerEl.classList.remove("show");
    endPage.classList.remove("page-active");
  });

  toggleFullscreen.addEventListener("click", () => {
    toggleFullscreen.classList.toggle("d-none");
    toggleExitFullscreen.classList.toggle("d-none");
    windowElement.requestFullscreen();
  });

  toggleExitFullscreen.addEventListener("click", () => {
    toggleExitFullscreen.classList.toggle("d-none");
    toggleFullscreen.classList.toggle("d-none");
    document.exitFullscreen();
  });
});
