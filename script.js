const calculatorDisplayTop = document.querySelector(".calculator_display_top");
const calculatorDisplayBottom = document.querySelector(
  ".calculator_display_bottom"
);
const operandButtons = document.querySelectorAll(".operand");
const operatorButtons = document.querySelectorAll(".operator");
const allClearButton = document.querySelector(".all_clear");
const backspaceButton = document.querySelector(".backspace");
const percentButton = document.querySelector(".percent");
const plusMinusButton = document.querySelector(".plus_minus");
const decimalButton = document.querySelector(".decimal");
const equalsButton = document.querySelector(".equals");

let firstNumber = "";
let secondNumber = "";
currentOperator = null;
isSecondOperand = false;

const removeLeadingZeros = (value) =>
  value.length > 1 && value[0] === "0" ? value.replace(/^0+(?!\.)/, "") : value;

const handleEmptyOperand = (number) => (number === "" ? "0" : number);

const operandButtonsValueClick = (event) => {
  const button = event.target;
  if (isSecondOperand) {
    secondNumber += button.value;
    secondNumber = removeLeadingZeros(secondNumber);
    secondNumber = handleEmptyOperand(secondNumber);
    calculatorDisplayBottom.textContent = secondNumber;
  } else {
    firstNumber += button.value;
    firstNumber = removeLeadingZeros(firstNumber);
    firstNumber = handleEmptyOperand(firstNumber);
    calculatorDisplayBottom.textContent = firstNumber;
  }
};

const operatorButtonsValueClick = (button) => {
  if (firstNumber !== "") {
    if (secondNumber !== "") {
      firstNumber = operate(
        firstNumber,
        currentOperator,
        secondNumber
      ).toString();
      secondNumber = "";
      calculatorDisplayBottom.textContent = firstNumber;
    }
  }
  if (firstNumber !== "" || secondNumber !== "") {
    currentOperator = button.value;
    isSecondOperand = true;
    calculatorDisplayTop.textContent = `${firstNumber} ${currentOperator}`;
  }
};

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (a, operator, b) => {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "−":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return b === 0 ? "Error" : divide(a, b);
    default:
      return null;
  }
};

const equalsButtonClick = () => {
  if (firstNumber === "" || currentOperator === null || secondNumber === "") {
    return;
  } else {
    let result = operate(firstNumber, currentOperator, secondNumber);
    calculatorDisplayTop.textContent = `${firstNumber} ${currentOperator} ${secondNumber} =`;
    calculatorDisplayBottom.textContent = result;
    firstNumber = result.toString();
    secondNumber = "";
    currentOperator = null;
    isSecondOperand = false;
  }
};

const allClearButtonClick = () => {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  isSecondOperand = false;
  calculatorDisplayTop.textContent = "";
  calculatorDisplayBottom.textContent = "0";
};

const backspaceButtonClick = () => {
  if (isSecondOperand) {
    secondNumber = secondNumber.slice(0, -1);
    calculatorDisplayBottom.textContent = secondNumber || "0";
  } else {
    firstNumber = firstNumber.slice(0, -1);
    calculatorDisplayBottom.textContent = firstNumber || "0";
  }
};

const plusMinusButtonClick = () => {
  if (isSecondOperand && secondNumber !== "") {
    secondNumber = (-parseFloat(secondNumber)).toString();
    calculatorDisplayBottom.textContent = secondNumber;
  } else if (firstNumber !== "") {
    firstNumber = (-parseFloat(firstNumber)).toString();
    calculatorDisplayBottom.textContent = firstNumber;
  }
};

const percentButtonClick = () => {
  if (isSecondOperand && secondNumber !== "") {
    secondNumber = (parseFloat(secondNumber) / 100).toString();
    calculatorDisplay.textContent = secondNumber;
  } else if (firstNumber !== "") {
    firstNumber = (parseFloat(firstNumber) / 100).toString();
    calculatorDisplayBottom.textContent = firstNumber;
  }
};

const decimalButtonClick = () => {
  if (isSecondOperand) {
    secondNumber = handleEmptyOperand(secondNumber);
    if (!secondNumber.includes(".")) {
      secondNumber += ".";
      calculatorDisplayBottom.textContent = secondNumber;
    }
  } else {
    firstNumber = handleEmptyOperand(firstNumber);
    if (!firstNumber.includes(".")) {
      firstNumber += ".";
      calculatorDisplayBottom.textContent = firstNumber;
    }
  }
};

document
  .querySelector(".calculator_frame")
  .addEventListener("dblclick", (e) => {
    e.preventDefault();
  });
operandButtons.forEach((button) =>
  button.addEventListener("click", operandButtonsValueClick)
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => operatorButtonsValueClick(button))
);
equalsButton.addEventListener("click", equalsButtonClick);
allClearButton.addEventListener("click", allClearButtonClick);
backspaceButton.addEventListener("click", backspaceButtonClick);
plusMinusButton.addEventListener("click", plusMinusButtonClick);
percentButton.addEventListener("click", percentButtonClick);
decimalButton.addEventListener("click", decimalButtonClick);
