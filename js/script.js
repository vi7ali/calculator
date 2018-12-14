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

let inputValues = [];
let userInput = '';

function backspaceInput() {
	if(userInput.length) {
		userInput = userInput.slice(0, -1);
	}
	showDisplay(userInput);
}

function dotInput() {

	if(!userInput.length) {
		userInput = '0.';
	}

	if(!/\./.test(userInput)) {
		userInput = userInput + '.';		
	}
	showDisplay(userInput);
}

function negativeInput() {
	if(userInput.length && userInput !== '0') {
		if(!/^\-/.test(userInput)) {
			userInput = '-' + userInput;
		}
		else {
			userInput = userInput.slice(1);
		}
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

	//Replacing the numbers that start with zero
	if(/^0[0-9]/.test(userInput)) { 
		userInput = input;
	}	
	showDisplay(userInput);
}

function operatorInput(e) {
	let input = e.target.textContent;
	//Removing the decimal point if there are no numbers after it
	if(userInput[userInput.length-1] === '.') {
		userInput = userInput.slice(0, -1);
	}

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
	//If it was a number then check for the floating point and round the number to 2 decimals if necessary
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

		let finalEquation = inputValues.join(' ');

		let regexMD;
		let regexAS;
	}
}

function showDisplay(element) {
  if(element === 'empty') {
  	display.textContent = '';
  	formula.textContent = '';
  }
  if(Number.isNaN(parseFloat(element))) {
 		formula.textContent = inputValues.join(' ');
 		display.textContent = '';
 	}
	else {
 		formula.textContent = inputValues.join(' ');
 		display.textContent = element;
 	}
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
	return a+b;
}

function subtract(a, b) {
	return a-b;	
}

function multiply(a, b)  {
	return a*b;
}

function divide(a, b) {
	return a/b;
}

function operate(a, b, op) {
	switch(op) {
		case '+':
			return add(a, b);
			break;
		case '-':
			return subtract(a, b);
			break;
		case '*':
			return multiply(a, b);
			break;
		case '/':
			return divide(a, b);
			break;
		default:
			console.log('Something went wrong in the switch statement of the function operate');
			break;
	}
}