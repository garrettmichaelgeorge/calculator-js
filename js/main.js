"use strict";

const OPERATORS = ['+', '-', '*', '/'];
const btns = document.querySelector('#btn-wrapper').querySelectorAll('button');

let displayData = 0;
let equationData = {
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
  }
};

document.onload = init();

function init() {
  setUpBtnsDigits()
  setUpBtnsOperators();
  setUpBtnClear();
  setUpBtnEquals();

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
      btn.addEventListener('click', e => {
        const operator = e.target.value;
        setEquationNum(currentNumber(), 0);
        setEquationOperator(operator);
        clearDisplay();
      });
    });
  }

  function setUpBtnClear() {
    const btnClear = document.querySelector('#btn-clear');
    btnClear.addEventListener('click', () => clearDisplay());
  }

  function setUpBtnEquals() {
    const btnEquals = document.querySelector('#btn-equals');
    btnEquals.addEventListener('click', e => {
      setEquationNum(currentNumber(), 1)
      setDisplay(equation().operate());
    });
  }
}

function add(a, b) { return a + b; }

function subtract(a, b) { return a - b; }

function multiply(a, b) { return a * b; }

function divide(a, b) { return a / b; }

// Display Functions
function display() {
  return document.querySelector('#display');
}

function setDisplay(input) {
  display().textContent = input;
}

function appendToDisplay(input) {
  display().textContent += input;
}

function clearDisplay() {
  setDisplay("");
}

// Data Functions
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

  function isOperator(input) { return OPERATORS.includes(input); }
}

function currentNumber() {
  return +display().textContent;
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
