const buttons   = document.getElementById('buttons');
const display   = document.getElementById('display');
const formula   = document.getElementById('formula');
const clear     = document.getElementById('clear');
const equal     = document.getElementById('equals');
const dot       = document.getElementById('dot');
const negative  = document.getElementById('neg');
const numbers   = Array.from(document.getElementsByClassName('number'));
const operators = Array.from(document.getElementsByClassName('operator'));

let inputValues = [];
let userInput = '';

dot.addEventListener('click', dotInput, false);
negative.addEventListener('click', negativeInput, false);
clear.addEventListener('click', clearInput, false);
equal.addEventListener('click', equalInput, false);

numbers.forEach(el=>el.addEventListener('click', numberInput, false));
operators.forEach(el=>el.addEventListener('click', operatorInput, false));

function dotInput() {
	//TODO
}

function negativeInput() {
	//TODO
}

function clearInput() {
	//TODO
}

function numberInput(e) {
	let input = e.target.textContent;
		
	userInput = userInput + input;	
	
	if(/^0[0-9]/.test(userInput)) {
		userInput = input;
	}
	showDisplay(input);
}

function operatorInput(e) {
	let input = e.target.textContent;

	if(!userInput.length && !inputValues.length) {
		showDisplay('empty');
	}

	if(/[/*-+]/.test(userInput)) {
		userInput = input;
	}
	else {
		inputValues.push(userInput);
		inputValues.push(input);
		showDisplay(input);
		userInput = '';
	}

}

function equalInput() {

}

function showDisplay(element) {
	let lastElement = userInput.length-1;
  if(element == 'empty') {
  	display.textContent = '';
  	formula.textContent = '';
  }
  else {
  	if(Number.isNaN(parseFloat(element))) {
  		formula.textContent = inputValues.join('');
  		display.textContent = '';
  	}
		else {
  		formula.textContent = inputValues.join('');
  		display.textContent = display.textContent + element;
  	}
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