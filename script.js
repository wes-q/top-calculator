document.addEventListener("DOMContentLoaded", function() {

    const calcScreen = document.querySelector('.calc-screen');
    const elements = document.querySelectorAll('.number');
    // document.querySelector('#btn-reset').addEventListener('click', () => { refreshPage() });

    elements.forEach(function(element) {
        element.addEventListener('click', handleClick);
    });

    calcScreen.addEventListener('input', addCommasToScreen);

    function handleClick (event) {

        const number = event.target.textContent;
        console.log(number);
        calcScreen.value += number;

        // Trigger the 'input' event manually
        const eventx = new Event('input');
        calcScreen.dispatchEvent(eventx);
    }

    function addCommasToScreen (event) {

        let value = event.target.value;
        value = value.replace(/,/g, '');
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        event.target.value = value;
    }
    
    
});


    
//     let value = event.target.value;
    
//     // Remove any existing commas
//     value = value.replace(/,/g, '');
    
//     // Add commas every three digits from the right
//     value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
//     event.target.value = value;
//   });
