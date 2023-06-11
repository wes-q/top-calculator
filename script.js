let numberSaved = false;
let x = null;
let y = null;
let z = null;
let justPressedOperator = false
let operator = "";
let truncatedNumber = 0;

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.number').forEach(numberButton => numberButton.addEventListener('click', concatNumberToDisplay));
    document.querySelector('.calc-screen').addEventListener('input', addCommasToScreen);
    document.getElementById("clear").addEventListener('click', () => clearScreen());
    document.getElementById("delete").addEventListener('click', () => backspace());
    document.getElementById("btn-decimal").addEventListener('click', () => concatDecimalToDisplay());
    // document.querySelectorAll(".operator").forEach(operatorButton => operatorButton.addEventListener('click', operate)); // event works 
    // document.querySelectorAll(".operator").forEach(operatorButton => operatorButton.addEventListener('click', () => operate())); // no event from arrow function
    document.querySelectorAll(".operator").forEach(operatorButton => operatorButton.addEventListener('click', event => operate(event))); // event works
    document.getElementById("btn-equal").addEventListener('click', () => equal());
});    

const add = function (x, y) {
    return truncate8decimal(x + y);
  };
  
const subtract = function (x, y) {
    return truncate8decimal(x - y);
};

const multiply = function (x, y) {
    return truncate8decimal(x * y);
};

const divide = function (x, y) {
    if (y === 0) {
        return "lmao"
    }
    return truncate8decimal(x / y);
};


function truncate8decimal(number) {
    return parseFloat(number.toFixed(8)).toString();
};


function operate(event) {
    justPressedOperator = true; // this value will be used to check if pressing number key will replace number displayed

    if (x === null) {
        x = Number(document.querySelector('.calc-screen').value.replace(/,/g, "")); // Remove commas from string then convert to number
        operator = event.target.textContent; // Get and set the operator pressed
    } else if (y === null) {
        y = Number(document.querySelector('.calc-screen').value.replace(/,/g, "")); // Store the current displayed value 
        solve(); // Set the answer to the first operand
        x = Number(document.querySelector('.calc-screen').value.replace(/,/g, ""));
        operator = event.target.textContent; // Get and set the operator pressed
        y = null; // Clear the second operand for the next number
    }
}

function equal(event) {
    // justPressedOperator = true; // this value will be used to check if pressing number key will replace number displayed

    if (x === null) {
        // x = Number(document.querySelector('.calc-screen').value.replace(/,/g, "")); // Remove commas from string then convert to number
        // operator = event.target.textContent; // Get and set the operator pressed
    } else if (y === null) {
        y = Number(document.querySelector('.calc-screen').value.replace(/,/g, "")); // Store the current displayed value 
        solve(); // Set the answer to the first operand
        x = null;
        operator = null 
        y = null;
    }
}

function solve() {

    switch (operator) {
        case "+":
            // alert(`x=${x} y=${y} ${operator} z=${z}`);
            z = add(x, y);
            document.querySelector('.calc-screen').value = z;
            triggerInputEvent(); 
            break;
        case "-":
            z = subtract(x, y);
            document.querySelector('.calc-screen').value = z;
            triggerInputEvent(); 
            break;
        case "*":
            z = multiply(x, y);
            document.querySelector('.calc-screen').value = z
            triggerInputEvent(); 
            break;
        case "÷":
            z = divide(x, y);
            document.querySelector('.calc-screen').value = z
            triggerInputEvent(); 
            break;
    }
}

// when + is pressed 1 is x
// when equals is pressed 3 is y
// when there are 2 operands, operate is called
// when equals is pressed again, 3 is x and 4 is y
// x = 1 > 3 > 
// y = 3 > 4 >
// 1+3 = =
//     4 7

// x = 1 > 1 > 1
// y = 1 > 2 > 9
// 1+= = 9 =
//   2 3   10

// x = 2 > 2 > 2 > 2
// y = 2 > 4 > 5 > 100
// 2+= = 5 = 100 =
//   4 6   7     102

// 2+2= = 5 = 100 = 
//    4 6   7     102

// x = 2 > 3 > 3  > 3
// y = 3 > 5 > 10 > 100
// 2+3= = 10 = 100 =
//    5 8    13   103 


function backspace () {
    const calcScreen = document.querySelector('.calc-screen');
    const screenValue = calcScreen.value; // Get the current displayed value
    let newScreenValue =  screenValue.slice(0, -1);
    
    // Add a zero if the input is empty after a backspace.
    newScreenValue = newScreenValue === "" ? "0" : newScreenValue;

    calcScreen.value = newScreenValue; // Apply the new screenvalue to the screen
    triggerInputEvent();
}


function concatNumberToDisplay (event) {
    const calcScreen = document.querySelector('.calc-screen');
    const number = event.target.textContent; // Get the number pressed
    const screenValue = calcScreen.value; // Get the current displayed value

    // Do not allow leading zeros
    // Reset screen 
    if (screenValue === "0" || justPressedOperator === true) {
        calcScreen.value = "";
        calcScreen.value += number;
        justPressedOperator = false;
    } else {
        calcScreen.value += number;
    }
    triggerInputEvent(); // Trigger input events to add proper commas
}


function concatDecimalToDisplay () {
    const calcScreen = document.querySelector('.calc-screen');
    const screenValue = calcScreen.value;

    // Dont allow another decimal point in the display    
    if (justPressedOperator === true) {
        calcScreen.value = "0";
        calcScreen.value += ".";    
        justPressedOperator = false;    
    } else if (screenValue.includes(".")) {
        // trigger sound effect
        const audio = document.getElementById("tink-sound")
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
    } else {
        calcScreen.value += ".";
    }
}

function addCommasToScreen(event) {
    let value = event.target.value;
    
    // Split value into integer and decimal parts
    const parts = value.split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1] ? `.${parts[1]}` : '';
    
    // Remove existing commas from the integer part
    integerPart = integerPart.replace(/,/g, '');
    
    // Add commas every three digits in the integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Reconstruct the value with comma-formatted integer part and decimal part
    value = integerPart + decimalPart;
    
    event.target.value = value;
  }


function clearScreen () {
    document.querySelector('.calc-screen').value = "0";
    clearValues();    
}


function clearValues () {
    // Reset variables
    x = null;
    y = null;
    // justPressedOperator = false
    // operator = null; //retain the operator
    truncatedNumber = 0;
}


function triggerInputEvent() {
    // Trigger the 'input' event manually to trigger function addCommasToScreen
    const eventx = new Event('input');
    document.querySelector('.calc-screen').dispatchEvent(eventx);
}

