let display = document.getElementById('display');
let historyList = document.getElementById('historyList');


function addKey(value) {
    display.value += value;
}

function calculate() {
    try {
        let result = eval(display.value);
        display.value = result;
        save(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}

function save(result) {
    let history = localStorage.getItem('History') || '[]';
    history = JSON.parse(history);
    history.push(result);
    localStorage.setItem('History', JSON.stringify(history));
    display.value = result;
    displayHistory();
}


function displayHistory() {
    historyList.innerHTML = '';
    let history = JSON.parse(localStorage.getItem('History') || '[]');
    history.forEach((item, index) => {
        let li = document.createElement('li');
        li.textContent = `Calculo ${index + 1}: ${item}`;
        historyList.appendChild(li);
    });
}


function clearHistory() {
    localStorage.removeItem('History');
    historyList.innerHTML = '';
}


function clearDisplay() {
    display.value = '';
}

displayHistory();