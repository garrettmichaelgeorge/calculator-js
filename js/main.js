"use strict";

const OPERATORS = ['+', '-', '*', '/'];
const btns = document.querySelector('#btn-wrapper').querySelectorAll('button');

const equationData = {
  num0: 0,
  num1: 0,
  operator: "",
  operate: function() {
    switch(this.operator) {
      case '+':
        return add(this.num0, this.num1);
      case '-':
        return subtract(this.num0, this.num1);
      case '*':
        return multiply(this.num0, this.num1);
      case '/':
        return divide(this.num0, this.num1);
      default:
        return NaN;
    }
  },
  isDivisionByZero: function() {
    return this.operator === '/' && this.num1 === 0;
  }
};

const errorListData = {
  divisionByZero: 'Division by zero is not allowed!',
}

document.onload = init();

function init() {
  setUpBtnsDigits()
  setUpBtnsOperators();
  setUpBtnClear();
  setUpBtnEquals();
  setUpKeyboardInput();

  function setUpBtnsDigits() {
    const btnsDigits = document.querySelectorAll('.btn-digit');
    btnsDigits.forEach(btn => {
      btn.addEventListener('click', e => {
        const digit = e.target.value;
        appendToDisplay(digit);
      });
    });
  }

  function setUpBtnsOperators(){
    const btnsOperators = document.querySelectorAll('.btn-operator');
    btnsOperators.forEach(btn => {
      btn.addEventListener('click', e => setOperator(e.target.value));
    });
  }

  function setUpBtnClear() {
    const btnClear = document.querySelector('#btn-clear');
    btnClear.addEventListener('click', () => clearDisplay());
  }

  function setUpBtnEquals() {
    const btnEquals = document.querySelector('#btn-equals');
    btnEquals.addEventListener('click', e => setEquals());
  }

  function setUpKeyboardInput() {
    document.addEventListener('keydown', e => {
      if (isNumber(e.key)) appendToDisplay(e.key);
      else if (isOperator(e.key)) setOperator(e.key);
      else if (isEnter(e.key)) setEquals();

      function isNumber(input) { return input.match(/^[0-9]$/); }
      function isEnter(input) { return input === 'Enter' }
    });
  }

  function setOperator(operator) {
    setEquationOperator(operator);
    setEquationNum(currentNumber(), 0);
    clearDisplay();
  }

  function setEquals() {
    setEquationNum(currentNumber(), 1)
    setDisplay(equation().operate());
  }
}

function add(a, b) { return a + b; }

function subtract(a, b) { return a - b; }

function multiply(a, b) { return a * b; }

function divide(a, b) {
  if (b === 0) return errorList().divisionByZero;

  return a / b;
}

// Display Functions
function display() {
  return document.querySelector('#display');
}

function setDisplay(input) {
  display().classList.remove('error');
  display().textContent = input;

  if (isError()) display().classList.add('error');
}

function appendToDisplay(input) {
  if (isError()) clearDisplay();

  display().textContent += input;
}

function clearDisplay() {
  setDisplay("");
}

function displayError(errorName) {
  setDisplay(errorList()
    .find(error => error.name === errorName));
  display().classList.add('error');
}

// Data Functions
function errorList() {
  return errorListData;
}

function equation() {
  return equationData;
}

function setEquationNum(num, index) {
  if (index !== 0 && index !== 1) return;

  index === 0
    ? equation().num0 = num
    : equation().num1 = num;
}

function setEquationOperator(str) {
  if (isOperator(str)) equation().operator = str;
}

function currentNumber() {
  return +display().textContent;
}

function errorList() {
  return errorListData;
}

function isError() {
  return Object.values(errorList()).includes(display().textContent);
}

function isOperator(input) {
  return OPERATORS.includes(input);
}

function debug() {
  console.log(add(3, 4));
  console.log(operate('+', 3, 4));

  console.log(subtract(3, 4));
  console.log(operate('-', 3, 4));

  console.log(multiply(3, 4));
  console.log(operate('*', 3, 4));

  console.log(divide(3, 4));
  console.log(operate('/', 3, 4));
}
