const display   = document.getElementById('display');
const formula   = document.getElementById('formula');
const clear     = document.getElementById('clear');
const equal     = document.getElementById('equals');
const dot       = document.getElementById('dot');
const negative  = document.getElementById('neg');
const backspace = document.getElementById('backspace');
const numbers   = Array.from(document.getElementsByClassName('number'));
const operators = Array.from(document.getElementsByClassName('operator'));

clear.addEventListener('click', clearInput, false);
equal.addEventListener('click', equalInput, false);
dot.addEventListener('click', dotInput, false);
negative.addEventListener('click', negativeInput, false);
backspace.addEventListener('click', backspaceInput, false);
numbers.forEach(el=>el.addEventListener('click', numberInput, false));
operators.forEach(el=>el.addEventListener('click', operatorInput, false));

const dbZero = 'DIVISION BY ZERO';
let inputValues = [];
let userInput = '';

function backspaceInput() {
	if(userInput.length)
		userInput = userInput.slice(0, -1);
	showDisplay(userInput);
}

function dotInput() {
	if(!userInput.length)
		userInput = '0.';

	if(!/\./.test(userInput))
		userInput = userInput + '.';		
	showDisplay(userInput);
}

function negativeInput() {
	if(userInput.length && userInput !== '0') {
		if(!/^\-/.test(userInput))
			userInput = '-' + userInput;
		else
			userInput = userInput.slice(1);
		showDisplay(userInput);
	}
}

function clearInput() {
	inputValues = [];
	userInput = '';
	showDisplay('empty');
}

function numberInput(e) {
	let input = e.target.textContent;
	userInput = userInput + input;

	//Replacing the integer numbers that start with zero
	if(/^0[0-9]/.test(userInput))
		userInput = input;
	showDisplay(userInput);
}

function operatorInput(e) {
	let input = e.target.textContent;
	//Removing the decimal point if there are no digits after it
	if(userInput[userInput.length-1] === '.')
		userInput = userInput.slice(0, -1);

	if(!userInput.length && !inputValues.length) {
		showDisplay('empty');
	}
	//Checking if the last input was an operator and replacing it with the new operator if it was
	else {
		if(!userInput) {						
			inputValues.pop();
			inputValues.push(input);
		}
		else {
	//If it was a number then check for the floating point and round the number to 2 digits after the dot
		userInput = roundFloat(userInput);
		inputValues.push(userInput);
		inputValues.push(input);
		userInput = '';
		}
		showDisplay(input);
	}
}

function equalInput() {
	if(inputValues.length) {
		if(!userInput) {
			inputValues.pop();
		}
		else {
			userInput = roundFloat(userInput);
			inputValues.push(userInput);
		}

		let finalExpression = inputValues.join(' ');
		let regexMD = /(-?\d*\.{0,1}\d+)\s([÷×])\s(-?\d*\.{0,1}\d+)/;
		let regexAS = /(-?\d*\.{0,1}\d+)\s([-\+])\s(-?\d*\.{0,1}\d+)/;
		let regexDivByZero = /-?\d*\.{0,1}\d+\s÷\s0/;

		while (regexMD.test(finalExpression)) {
			if(regexDivByZero.test(finalExpression)) {				
				finalExpression = dbZero;
			}
			else {
			finalExpression = finalExpression.replace(regexMD, operate);
			}
		}
		while (regexAS.test(finalExpression)) {
			finalExpression = finalExpression.replace(regexAS, operate);
		}
		
		if(finalExpression !== dbZero) {
			userInput = finalExpression;
			inputValues.push('=', finalExpression);		
			showDisplay(finalExpression);
			inputValues = [];
		}
		else {
			clearInput();
			showDisplay(finalExpression);
		}
	}
}

function showDisplay(element) {
  if(element === 'empty') {
  	display.textContent = '';
  	formula.textContent = '';
  }
  if(Number.isNaN(parseFloat(element))) {
  	if(element === dbZero) {
  		formula.textContent = dbZero;
  		display.textContent = dbZero;
  	}
  	else {
	 		formula.textContent = checkLength(inputValues.join(' '));
	 		display.textContent = '';
 		}
 	}
	else {
 		formula.textContent = checkLength(inputValues.join(' '));
 		display.textContent = checkLength(element);
 	}
}

function checkLength(str) {
	let maxLength = 32;

	if(str.length>maxLength)
		str = str.slice(-maxLength);
	return str;
}

function roundFloat(el) {
	let number = parseFloat(el);
	let regex = /\d+\.\d\d\d+/;
	
	if(regex.test(el)) {
		number = Math.round(el*100)/100;
		return number.toString();
	}
	else {
		return el;
	}
}

function add(a, b) {
	return roundFloat(a+b);
}

function subtract(a, b) {
	return roundFloat(a-b);
}

function multiply(a, b)  {
	return roundFloat(a*b);
}

function divide(a, b) {
	return roundFloat(a/b);
}

function operate(match, a, op, b) {
	switch(op) {
		case '+':			
			return add(parseFloat(a), parseFloat(b));
			break;
		case '-':
			return subtract(parseFloat(a), parseFloat(b));
			break;
		case '×':
			return multiply(parseFloat(a), parseFloat(b));
			break;
		case '÷':
			return divide(parseFloat(a), parseFloat(b));
			break;
		default:
			console.log('Something went wrong in the switch statement of the function operate');
			break;
	}
}