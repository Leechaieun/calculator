const display = document.getElementById('display');
const buttons = document.getElementsByClassName('button');
let currentInput = '';
let currentOperator = null;
let previousInput = null;

function clearDisplay() {
  currentInput = '';
  currentOperator = null;
  previousInput = null;
  display.innerText = '';
}

function handleNumberClick(e) {
  const number = e.target.innerText;
  currentInput += number;
  display.innerText = currentInput;
}

function handleOperatorClick(e) {
  const operator = e.target.innerText;
  if (currentOperator !== null) {
    previousInput = calculate();
  } else {
    previousInput = parseFloat(currentInput);
  }
  currentInput = '';
  currentOperator = operator;
}

function handleEqualsClick() {
  const result = calculate();
  display.innerText = result;
  previousInput = null;
  currentOperator = null;
  currentInput = result;
}

function calculate() {
  const current = parseFloat(currentInput);
  const previous = parseFloat(previousInput);
  let result;
  switch (currentOperator) {
    case '+':
      result = previous + current;
      break;
    case '-':
      result = previous - current;
      break;
    case '*':
      result = previous * current;
      break;
    case '/':
      result = previous / current;
      break;
    default:
      return current;
  }
  return result;
}

for (let i = 0; i < buttons.length; i++) {
  const button = buttons[i];
  button.addEventListener('click', function(e) {
    const buttonText = e.target.innerText;
    if (buttonText === 'C') {
      clearDisplay();
    } else if (parseFloat(buttonText) >= 0 || buttonText === '.') {
      handleNumberClick(e);
    } else {
      handleOperatorClick(e);
    }
  });
}

document.getElementById('equals').addEventListener('click', handleEqualsClick);
