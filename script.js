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
}

function clearDisplay() {
    display.textContent = '';
    document.getElementById('AC').blur();
}

function calculateResult() {
    try {
        let result = eval(display.textContent);
        let roundedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(4)); // Arrondit à 4 décimales si ce n'est pas un entier
        let calculation = display.textContent;
        display.textContent = roundedResult;
        addToHistory(calculation, roundedResult);
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
