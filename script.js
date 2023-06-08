let numberSaved = false;

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.number').forEach(numberButton => numberButton.addEventListener('click', concatNumberToDisplay));
    document.querySelector('.calc-screen').addEventListener('input', addCommasToScreen);
    document.getElementById("clear").addEventListener('click', () => clearScreen());
    document.getElementById("delete").addEventListener('click', () => backspace());
    document.getElementById("btn-decimal").addEventListener('click', () => concatDecimalToDisplay());
});    


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
    if (screenValue === "0") {
        calcScreen.value = "";
        calcScreen.value += number;
    } else {
        calcScreen.value += number;
    }
    triggerInputEvent();
}


function concatDecimalToDisplay () {
    const calcScreen = document.querySelector('.calc-screen');
    const screenValue = calcScreen.value;

    // Dont allow another decimal point in the display    
    if (screenValue.includes(".")) {
        // trigger sound effect
    } else {
        calcScreen.value += ".";
    }
    triggerInputEvent();
}


function addCommasToScreen (event) {
    let value = event.target.value;
    value = value.replace(/,/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    event.target.value = value;
}


function clearScreen (event) {
    document.querySelector('.calc-screen').value = "0";
}


function triggerInputEvent() {
    // Trigger the 'input' event manually to trigger function addCommasToScreen
    const eventx = new Event('input');
    document.querySelector('.calc-screen').dispatchEvent(eventx);
}