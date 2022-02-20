const displayCalc = document.querySelector(".display-calculator");
const buttons = document.querySelectorAll(".button");

const calcConfig = {
  firstNumber: "0",
  secondNumber: "0",
  setOperator: false,
  multipleOperator: false,
  operatorInSet: false,
  resultOperation: null,
  operatorType: null,
  calculatorDisplay: null,
};

const updateDisplay = (value) => {
  displayCalc.innerText = value;
};

const clearAllDisplay = () => {
  calcConfig.firstNumber = "0";
  calcConfig.secondNumber = "0";
  calcConfig.setOperator = false;
  calcConfig.multipleOperator = false;
  calcConfig.operatorType = "";
  calcConfig.calculatorDisplay = "";
};

const convertToNegative = (value) => {
  return (value *= -1);
};

const singleCalculation = (firstNum, secondNum, operator) => {
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

const handleDisplayNumber = (propertyName, element, multiOperator = false) => {
  if (multiOperator == true && element.classList.contains("negative") == true) {
    const numberForNegative = calcConfig[propertyName].split(" ");
    numberForNegative[numberForNegative.length - 1] = convertToNegative(
      numberForNegative[numberForNegative.length - 1]
    );
    calcConfig[propertyName] = numberForNegative.join(" ");
  } else if (
    multiOperator == true &&
    element.classList.contains("negative") != true
  ) {
    return (calcConfig[propertyName] += element.innerText);
  } else if (
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

const handleDisplayOperator = (element) => {
  if (calcConfig.operatorInSet) {
    alert("Anda telah menerapkan operator");
  } else {
    calcConfig.operatorInSet = true;
    if (calcConfig.setOperator) {
      calcConfig.multipleOperator = true;
      calcConfig.calculatorDisplay += ` ${element.innerText} `;
      updateDisplay(calcConfig.calculatorDisplay);
    } else {
      calcConfig.setOperator = true;
      calcConfig.operatorType = element.innerText;
      calcConfig.calculatorDisplay = `${calcConfig.firstNumber} ${calcConfig.operatorType} `;
      updateDisplay(calcConfig.calculatorDisplay);
    }
  }
};

const handleButtonsNumber = (element) => {
  if (calcConfig.multipleOperator) {
    let checkValue = calcConfig.calculatorDisplay.split(" ");
    if (
      checkValue[checkValue.length - 1] == "" &&
      element.classList.contains("negative")
    ) {
      alert("Tetapkan angka sebelum membuat menjadi negative");
    } else {
      handleDisplayNumber(
        "calculatorDisplay",
        element,
        calcConfig.multipleOperator
      );
    }

    updateDisplay(calcConfig.calculatorDisplay);
  } else {
    if (!calcConfig.setOperator) {
      handleDisplayNumber("firstNumber", element);
      updateDisplay(calcConfig.firstNumber);
    } else {
      let checkValue = handleDisplayNumber("secondNumber", element);
      if (!checkValue) {
        alert("Tetapkan angka sebelum membuat menjadi negative");

        calcConfig.calculatorDisplay = `${calcConfig.firstNumber} ${calcConfig.operatorType}`;
      } else {
        calcConfig.calculatorDisplay = `${calcConfig.firstNumber} ${calcConfig.operatorType} ${calcConfig.secondNumber}`;
      }
      updateDisplay(calcConfig.calculatorDisplay);
    }
  }
};

const resultCalculation = () => {
  const arrNumber = calcConfig.calculatorDisplay.split(" ");
  const index = arrNumber.length - 1;
  if (arrNumber[index] != "") {
    if (calcConfig.multipleOperator) {
      for (let i = 0; i < arrNumber.length; i++) {
        if (arrNumber[i] == "x") {
          arrNumber[i] = "*";
        }
      }
      calcConfig.resultOperation = eval(arrNumber.join(" "));
    } else {
      calcConfig.resultOperation = singleCalculation(
        parseInt(calcConfig.firstNumber),
        parseInt(calcConfig.secondNumber),
        calcConfig.operatorType
      );
    }
    clearAllDisplay();
    calcConfig.firstNumber = calcConfig.resultOperation;
  } else {
    alert("Maaf hasil tidak dapat ditampilkan, silahkan cek inputan anda");
    calcConfig.resultOperation = `${calcConfig.calculatorDisplay}`;
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    if (this.classList.contains("operator")) {
      handleDisplayOperator(this);
    } else if (this.classList.contains("clear")) {
      clearAllDisplay();
      updateDisplay(calcConfig.firstNumber);
    } else if (this.classList.contains("result")) {
      resultCalculation();
      updateDisplay(calcConfig.resultOperation);
    } else {
      calcConfig.operatorInSet = false;
      handleButtonsNumber(this);
    }
  });
});
