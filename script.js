let display = document.getElementById('display');
let history = document.getElementById('history');

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === 'F12') {
        clearDisplay(); // Clear display if F12 is pressed because it can add sometimes F12 to the display (a bug)
    } else if (/[0-9+\-*/().%]/.test(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        display.textContent = display.textContent.slice(0, -1);
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

function appendToDisplay(value) {
    display.textContent += value;
    document.getElementById('AC-CE').innerHTML = 'CE';
}

function clearDisplay() {
    clearButton = document.getElementById('AC-CE');
    if (clearButton.innerHTML === 'AC') {
        display.textContent = '';
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
    document.getElementById('AC-CE').blur();
}

function calculateResult() {
    try {
        let calculation = display.textContent;

        calculation = calculation.replace(/sqrt\(/g, 'Math.sqrt(');
        calculation = calculation.replace(/log\(/g, 'Math.log10(');
        calculation = calculation.replace(/ln\(/g, 'Math.log(');
        calculation = calculation.replace(/sin\(/g, 'Math.sin(');
        calculation = calculation.replace(/cos\(/g, 'Math.cos(');
        calculation = calculation.replace(/tan\(/g, 'Math.tan(');
        calculation = calculation.replace(/π/g, 'Math.PI');

        let result = eval(calculation);
        let roundedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(4)); // Arrondit à 4 décimales si ce n'est pas un entier
        let inputCalculation = display.textContent;
        display.textContent = roundedResult;
        addToHistory(inputCalculation, roundedResult);
        document.getElementById('AC-CE').innerHTML = 'AC';
    } catch (error) {
        display.textContent = 'Error';
    }
}

function addToHistory(calculation, result) {
    let historyItem = document.createElement('div');
    historyItem.textContent = `${calculation} = ${result}`;
    history.appendChild(historyItem);
    history.scrollTop = history.scrollHeight; // Scroll to the bottom
}

function clearHistory() {
    history.innerHTML = '';
}
