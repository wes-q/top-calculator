document.addEventListener("DOMContentLoaded", function() {

    const calcScreen = document.querySelector('.calc-screen');
    const numberElements = document.querySelectorAll('.number');
    // document.querySelector('#btn-reset').addEventListener('click', () => { refreshPage() });

    numberElements.forEach(function(numberButton) {
        numberButton.addEventListener('click', handleClick);
    });

    calcScreen.addEventListener('input', addCommasToScreen);
    document.getElementById("clear").addEventListener('click', clearScreen);
    // document.getElementById("clear").addEventListener('click', () => clearScreen());

    function handleClick (event) {
        const number = event.target.textContent;
        const screenValue = calcScreen.value;

        // Do not allow leading zeros
        if (screenValue === "0") {
            calcScreen.value = "";
            calcScreen.value += number;
        } else {
            calcScreen.value += number;
        }
    
        // Trigger the 'input' event manually to trigger function addCommasToScreen
        const eventx = new Event('input');
        calcScreen.dispatchEvent(eventx);
    }

    function addCommasToScreen (event) {

        let value = event.target.value;
        value = value.replace(/,/g, '');
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        event.target.value = value;
    }
    
    function clearScreen (event) {
        calcScreen.value = "0";
    }

});