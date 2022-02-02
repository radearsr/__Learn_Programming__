const calcConfig = {
  firstNumber: "0",
  secondNumber: "0",
  setOperator: false,
  setDoubleOperator: false,
  operatorInSet: false,
  resultOperation: null,
  operatorType: null,
  calculatorDisplay: null,
};

const displayCalc = document.querySelector(".display-calculator");
const buttons = document.querySelectorAll(".button");
const operators = document.querySelectorAll(".operator");
const buttonClear = document.querySelector(".clear");
const buttonResult = document.querySelector(".result");

const updateDisplay = (value) => {
  displayCalc.innerText = value;
};

const clear = () => {
  calcConfig.firstNumber = "0";
  calcConfig.secondNumber = "0";
  calcConfig.setOperator = false;
  calcConfig.setDoubleOperator = false;
  calcConfig.operatorType = "";
  calcConfig.calculatorDisplay = "";
};

const convertToNegative = (value) => {
  return (value *= -1);
};

const calculation = (firstNum, secondNum, operator) => {
  switch (operator) {
    case "+":
      return firstNum + secondNum;

    case "-":
      return firstNum - secondNum;

    case "x":
      return firstNum * secondNum;

    case "/":
      return firstNum / secondNum;

    case "%":
      return firstNum % secondNum;

    default:
      return;
  }
};

const handleDisplayNumber = (propertyName, element) => {
  if (
    calcConfig[propertyName] != "0" &&
    element.classList.contains("negative")
  ) {
    return (calcConfig[propertyName] = convertToNegative(
      calcConfig[propertyName]
    ));
  } else if (
    calcConfig[propertyName] == "0" &&
    element.classList.contains("negative")
  ) {
    return false;
  } else if (calcConfig[propertyName] == "0") {
    return (calcConfig[propertyName] = element.innerText);
  } else {
    return (calcConfig[propertyName] += element.innerText);
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    calcConfig.operatorInSet = false;

    if (calcConfig.setDoubleOperator) {
      calcConfig.calculatorDisplay += `${this.innerText}`;
      updateDisplay(calcConfig.calculatorDisplay);
    } else {
      if (!calcConfig.setOperator) {
        handleDisplayNumber("firstNumber", this);
        updateDisplay(calcConfig.firstNumber);
      } else {
        let checkValue = handleDisplayNumber("secondNumber", this);
        if (!checkValue) {
          alert("Tetapkan angka sebelum membuat menjadi negative");

          calcConfig.calculatorDisplay = `${calcConfig.firstNumber} ${calcConfig.operatorType}`;
        } else {
          calcConfig.calculatorDisplay = `${calcConfig.firstNumber} ${calcConfig.operatorType} ${calcConfig.secondNumber}`;
        }
        updateDisplay(calcConfig.calculatorDisplay);
      }
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", function () {
    if (calcConfig.operatorInSet) {
      alert("Anda telah menerapkan operator");
    } else {
      calcConfig.operatorInSet = true;
      if (calcConfig.setOperator) {
        calcConfig.setDoubleOperator = true;
        calcConfig.calculatorDisplay += ` ${this.innerText} `;
        updateDisplay(calcConfig.calculatorDisplay);
      } else {
        calcConfig.setOperator = true;
        calcConfig.operatorType = this.innerText;
        calcConfig.calculatorDisplay = `${calcConfig.firstNumber} ${calcConfig.operatorType} `;
        updateDisplay(calcConfig.calculatorDisplay);
      }
    }
  });
});

buttonClear.addEventListener("click", () => {
  clear();
  updateDisplay(calcConfig.firstNumber);
});

buttonResult.addEventListener("click", () => {
  const arrNumber = calcConfig.calculatorDisplay.split(" ");
  const index = arrNumber.length - 1;
  if (arrNumber[index] != "") {
    if (calcConfig.setDoubleOperator) {
      for (let i = 0; i < arrNumber.length; i++) {
        if (arrNumber[i] == "x") {
          arrNumber[i] = "*";
        }
      }
      calcConfig.resultOperation = eval(arrNumber.join(" "));
    } else {
      calcConfig.resultOperation = calculation(
        parseInt(calcConfig.firstNumber),
        parseInt(calcConfig.secondNumber),
        calcConfig.operatorType
      );
    }
    clear();
    calcConfig.firstNumber = calcConfig.resultOperation;
  } else {
    alert("Maaf hasil tidak dapat ditampilkan, silahkan cek inputan anda");
    calcConfig.resultOperation = `${calcConfig.calculatorDisplay}`;
  }
  updateDisplay(calcConfig.resultOperation);
});
