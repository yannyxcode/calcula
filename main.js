const boop = new Audio('assets/sounds/duck-button.mp3');
boop.volume = 0.3;

let isResult = false;

const buttons = document.querySelectorAll('.btn');
const resultDisplay = document.getElementById('result');

function isValidInput(value) {
    const currentValue = resultDisplay.value;

    if (value === '0' && currentValue === '0') {
        return false;
    }

    const operators = ['+', '-', '*', '/'];
    if (operators.includes(value) && operators.includes(currentValue.slice(-1))) {
        resultDisplay.value = currentValue.slice(0, -1) + value;
        return false;
    }

    if (value === '.' && currentValue.includes('.')) {
        return false;
    }

    return true;
}

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const value = this.textContent;

        boop.currentTime = 0;
        boop.play();

        if (value === 'Del') {
            if (isResult || resultDisplay.value === 'Ошибка') {
                resultDisplay.value = '';
                isResult = false;
            } else {
                resultDisplay.value = resultDisplay.value.slice(0, -1);
            }
        } else if (value === '=') {
            try {
                resultDisplay.value = eval(resultDisplay.value);
                isResult = true;
            } catch {
                resultDisplay.value = 'Ошибка(';
                isResult = false;
            }
        } else {
            if (isResult) {
                resultDisplay.value = resultDisplay.value + value;
                isResult = false;
            } else {
                if (isValidInput(value)) {
                    resultDisplay.value += value;
                }
            }
        }
    });
});
