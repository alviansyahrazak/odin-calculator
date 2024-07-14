const calculatorDisplayTop = document.querySelector(".calculator_display_top")
const calculatorDisplayBottom = document.querySelector(".calculator_display_bottom")
const operandButtons = document.querySelectorAll(".operand")
const operatorButtons = document.querySelectorAll(".operator")
const allClearButton = document.querySelector(".all_clear")
const backspaceButton = document.querySelector(".backspace")
const percentButton = document.querySelector(".percent")
const plusMinusButton = document.querySelector(".plus_minus")
const decimalButton = document.querySelector(".decimal")
const equalsButton = document.querySelector(".equals")

let firstNumber = ""
let secondNumber = ""
currentOperator = null
isSecondOperand = false

const removeLeadingZeros = (value) => {
    if (value.length > 1 && value[0] === '0') {
        return value.replace(/^0+(?!$)/, "0");
    }
    return value;
}

const operandButtonsValueClick = (event) => {
    let button = event.target
    if(isSecondOperand) {
        secondNumber += button.value
        secondNumber = removeLeadingZeros(secondNumber)
        calculatorDisplayBottom.textContent = secondNumber
    } else {
        firstNumber += button.value
        firstNumber = removeLeadingZeros(firstNumber)
        console.log(firstNumber)
        calculatorDisplayBottom.textContent = firstNumber
    }
}

const operatorButtonsValueClick = (button) => {
    if(firstNumber !== "") {
        if(secondNumber !== "") {
            firstNumber = operate(firstNumber, currentOperator, secondNumber)
            secondNumber = ""
            calculatorDisplayBottom.textContent = firstNumber
        }
    }
    currentOperator = button.value
    isSecondOperand = true
    calculatorDisplayTop.textContent =`${firstNumber} ${currentOperator}`
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (a, operator, b) => {
    a = parseFloat(a)
    b = parseFloat(b)
    if (operator === "+") {
        return add(a, b)
    } else if (operator === "−") {
        return subtract(a, b)
    } else if (operator === "×") {
        return multiply(a, b)
    } else if (operator === "÷") {
        return (b === 0) ? "Error" : divide(a, b)
    }
}

const equalsButtonClick = () => {
    if(firstNumber === "" || currentOperator === null || secondNumber === "") {
        return;
    } else {
        let result = operate(firstNumber, currentOperator, secondNumber)
        calculatorDisplayTop.textContent = `${firstNumber} ${currentOperator} ${secondNumber} =`
        calculatorDisplayBottom.textContent = result
        firstNumber = result.toString()
        secondNumber = ""
        currentOperator = null
        isSecondOperand = false
    }
}

const allClearButtonClick = () => {
    firstNumber = ""
    secondNumber = ""
    currentOperator = null
    isSecondOperand = false
    calculatorDisplayTop.textContent = ""
    calculatorDisplayBottom.textContent = "0"
}

const backspaceButtonClick = () => {
    if(isSecondOperand) {
        secondNumber = secondNumber.slice(0, -1)
        calculatorDisplayBottom.textContent = secondNumber || "0"
    } else {
        firstNumber = firstNumber.slice(0, -1)
        calculatorDisplayBottom.textContent = firstNumber || "0"
    }
}

const plusMinusButtonClick = () => {
    if(isSecondOperand && secondNumber !== "") {
        secondNumber = (-parseFloat(secondNumber)).toString()
        calculatorDisplayBottom.textContent = secondNumber
    } else if (firstNumber !== "") {
        firstNumber = (-parseFloat(firstNumber)).toString()
        calculatorDisplayBottom.textContent = firstNumber
    }
}

const percentButtonClick = () => {
    if(isSecondOperand && secondNumber !== "") {
        secondNumber = (parseFloat(secondNumber) / 100).toString()
        calculatorDisplay.textContent = secondNumber
    } else if (firstNumber !== "") {
        firstNumber = (parseFloat(firstNumber) / 100).toString()
        calculatorDisplayBottom.textContent = firstNumber
    }
}

const decimalButtonClick = () => {
    if(isSecondOperand) {
        if(secondNumber === "") {
            secondNumber = "0"
        }
        if(isSecondOperand && secondNumber !== "") {
            if(!secondNumber.includes(".")) {
                secondNumber = parseFloat(secondNumber) + "."
                calculatorDisplayBottom.textContent = secondNumber
            }
        }
    } else {
        if(firstNumber === "") {
            firstNumber = "0"
        }
        if(!firstNumber.includes(".")) {
            firstNumber = parseFloat(firstNumber) + "."
            calculatorDisplayBottom.textContent = firstNumber
        }
    }
}

operandButtons.forEach(button => button.addEventListener("click", operandButtonsValueClick))
operatorButtons.forEach(button => button.addEventListener("click", () => operatorButtonsValueClick(button)))
equalsButton.addEventListener("click", equalsButtonClick)
allClearButton.addEventListener("click", allClearButtonClick)
backspaceButton.addEventListener("click", backspaceButtonClick)
plusMinusButton.addEventListener("click", plusMinusButtonClick)
percentButton.addEventListener("click", percentButtonClick)
decimalButton.addEventListener("click", decimalButtonClick)

