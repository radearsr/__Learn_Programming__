const homePage = document.querySelector(".home");
const gameoverPage = document.querySelector(".gameover");

const btnStart = document.querySelector(".btn-start");
const btnRestart = document.querySelector(".btn-restart");
const btnBackHome = document.querySelector(".btn-home");

const currentScore = document.querySelector(".result__score span");
const bestScore = document.querySelector(".best__score span");

const dirts = document.querySelectorAll(".dirt");
const moles = document.querySelectorAll(".mole");

const sound = document.querySelector("#sound");

const gameConfiguration = {
  dirtAppear: null,
  endGame: false,
  currentDirt: null,
  scoreBoard: 0,
  time: 11000,
};

const resetConfiguration = () => {
  gameConfiguration.currentDirt = null;
  gameConfiguration.dirtAppear = null;
  gameConfiguration.endGame = false;
  gameConfiguration.scoreBoard = 0;
  scoreBoardUpdate(gameConfiguration.scoreBoard);
};

const randomDirtForAppear = (dirt) => {
  const randDirt = Math.floor(Math.random() * dirt.length);
  if (gameConfiguration.dirtAppear == randDirt) {
    randomDirtForAppear(dirts);
  } else {
    gameConfiguration.dirtAppear = randDirt;
    return randDirt;
  }
};

const randTimeAppear = (minTime, maxTime) => {
  return Math.round(Math.random() * (maxTime - minTime) + minTime);
};

const appearMole = () => {
  const randDirt = randomDirtForAppear(dirts);
  const randomDelay = randTimeAppear(300, 2000);

  if (randDirt != undefined) {
    dirts[randDirt].firstElementChild.classList.add("appear");

    gameConfiguration.currentDirt = dirts[randDirt];
  }

  setTimeout(() => {
    gameConfiguration.currentDirt.firstElementChild.classList.remove("appear");
    if (!gameConfiguration.endGame) {
      appearMole();
    }
  }, randomDelay);
};

const scoreBoardUpdate = (scoreResult) => {
  const scoreBoard = document.querySelector(".score__board span");
  gameConfiguration.scoreBoard = scoreResult;
  scoreBoard.innerText = scoreResult;
};

const remainingTime = (milSecond) => {
  const timestampDateNow = new Date().getTime();
  const timestampCountDown = timestampDateNow + milSecond;

  const timeGame = setInterval(() => {
    const timeElement = document.querySelector(".remaining__time span");

    let timeNow = new Date().getTime();
    let remainTime = timestampCountDown - timeNow;
    let countDownNow = Math.floor((remainTime % (1000 * 60)) / 1000);

    if (remainTime < 0) {
      clearInterval(timeGame);
      currentScore.innerText = gameConfiguration.scoreBoard;
      bestScore.innerText = gameConfiguration.scoreBoard;
      gameoverPage.classList.add("active");
      return false;
    }

    timeElement.innerText = countDownNow;
  }, 1000);
};

const startGame = () => {
  resetConfiguration();
  remainingTime(gameConfiguration.time);
  appearMole();
  setTimeout(() => {
    gameConfiguration.endGame = true;
  }, gameConfiguration.time);
};

document.addEventListener("DOMContentLoaded", () => {
  currentScore.innerText = gameConfiguration.scoreBoard;
  bestScore.innerText = gameConfiguration.scoreBoard;

  moles.forEach((mole) => {
    mole.addEventListener("click", function () {
      sound.play();

      if (this.classList.contains("appear")) {
        this.classList.remove("appear");
      }
      gameConfiguration.scoreBoard++;
      scoreBoardUpdate(gameConfiguration.scoreBoard);
    });
  });

  btnStart.addEventListener("click", () => {
    homePage.classList.remove("active");
    homePage.addEventListener("transitionend", () => {
      if (!homePage.classList.contains("active")) {
        startGame();
      }
    });
  });

  btnRestart.addEventListener("click", () => {
    gameoverPage.classList.remove("active");
    gameoverPage.addEventListener("transitionend", () => {
      if (!gameoverPage.classList.contains("active")) {
        startGame();
      }
    });
  });

  btnBackHome.addEventListener("click", () => {
    homePage.classList.toggle("active");
    gameoverPage.classList.toggle("active");
  });
});
