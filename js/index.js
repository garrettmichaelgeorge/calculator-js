'use strict'

const calculator = (function (doc) {
  let displayStr = ''
  const errorListData = {
    divisionByZero: 'Division by zero is not allowed!'
  }
  const equationData = {
    leftOperand: 0,
    rightOperand: 0,
    operator: ''
  }

  // Cache DOM
  const calcWrapper = document.querySelector('#calc-wrapper')
  const display = calcWrapper.querySelector('#display')
  const btnsDigits = calcWrapper.querySelectorAll('.btn-digit')
  const btnsOperators = calcWrapper.querySelectorAll('.btn-operator')
  const btnEquals = calcWrapper.querySelector('#btn-equals')
  const btnClear = calcWrapper.querySelector('#btn-clear')

  // Bind Events
  btnsDigits.forEach(btn => {
    btn.addEventListener('click', e => {
      addDigit(+e.target.value)
    })
  })

  btnsOperators.forEach(btn => {
    btn.addEventListener('click', e => {
      setOperator(e.target.value)
    })
  })

  btnEquals.addEventListener('click', () => {
    setRightOperand(displayStr)
    setDisplayStr(operate())
  })

  btnClear.addEventListener('click', () => {
    clearDisplay()
  })

  document.addEventListener('keydown', e => {
    routeKeyboardInput(e.key)
  })

  _render()

  function routeKeyboardInput (key) {
    if (isNumber(key)) appendToDisplayStr(key)
    else if (isOperator(key)) setOperator(key)
    else if (isEnter(key)) setEquals()

    function isNumber (input) { return input.match(/^[0-9]$/) }
    function isEnter (input) { return input === 'Enter' }
  }

  function setOperator (operator) {
    setEquationOperator(operator)
    setLeftOperand(displayStr)
    clearDisplay()
  }

  function addDigit (input) {
    appendToDisplayStr(input)
  }

  function operate () {
    switch (equation().operator) {
      case '+':
        return add(equation().leftOperand, equation().rightOperand)
      case '-':
        return subtract(equation().leftOperand, equation().rightOperand)
      case '*':
        return multiply(equation().leftOperand, equation().rightOperand)
      case '/':
        return divide(equation().leftOperand, equation().rightOperand)
      default:
        return NaN
    }
  }

  function add (a, b) {
    return a + b
  }

  function subtract (a, b) {
    return a - b
  }

  function multiply (a, b) {
    return a * b
  }

  function divide (a, b) {
    if (b === 0) return errorList().divisionByZero

    return a / b
  }

  // Display Functions
  function _render () {
    display.classList.remove('error')
    display.textContent = displayStr

    if (isError()) display.classList.add('error')
  }

  function setDisplayStr (input) {
    displayStr = +input
    _render()
  }

  function appendToDisplayStr (input) {
    if (isError()) clearDisplay()

    displayStr += input
    _render()
  }

  function clearDisplay () {
    setDisplayStr('')
    _render()
  }

  // Data Functions
  function equation () {
    return equationData
  }

  function setRightOperand (num) {
    equation().rightOperand = num
  }

  function setLeftOperand (num) {
    equation().leftOperand = num
  }

  function setEquationOperator (operator) {
    if (isOperator(operator)) equation().operator = operator
  }

  function isOperator (input) {
    const operators = ['+', '-', '*', '/']
    return operators.includes(input)
  }

  // Error Functions
  function errorList () {
    return errorListData
  }

  function isError () {
    return Object.values(errorList()).includes(display.textContent)
  }

  return { }
})(document)
