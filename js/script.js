const buttons = document.getElementById('buttons');
const display = document.getElementById('display');
const formula = document.getElementById('formula');
let numbers = [];
let operators = [];
let number = '';

buttons.addEventListener('click', populateDisplay, false);

function populateDisplay(e) {
	let button = e.target.textContent;

	formula.textContent = formula.textContent + button;

	if(Number.isNaN(Number(button))) {
		populateArray(button, number);
		number='';
	}
	else {
		number = number + button;
		display.textContent = number;
	}
}

function populateArray(button, number) {
	numbers.push(number);
	
	if(button == '=') {
		calculate();
	}	
	else {
		operators.push(button);
		display.textContent = number;
	}
}

function calculate {
	let result = 
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

