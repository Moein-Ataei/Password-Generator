// DOM 
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');


const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};


generateEl.addEventListener('click', () => {
    // + for convert to number
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumbers, hasSymbol, length);
});

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    console.log(textarea.select());
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
});

// Generate Password Function
function generatePassword(upper, lower, number, symbol, length) {
    // 1. Init password var
    // 2. Filter out unchecked types
    // 3.Loop over length call generator function for each type 
    // 4. Return password var

    let generatedPass = '';

    const typesCount = upper + lower + number + symbol;
    // console.log(typesCount);

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter
    (item => Object.values(item)[0]);
    // console.log(typesArr);

    if(typesCount === 0) {
        return '';
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatedPass += randomFunction[funcName]();
        });
    }

    const finalPassword = generatedPass.slice(0, length);
    // console.log(finalPassword);
    return finalPassword;
}

// Generator Functions 
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '@#$%{}[]()/\\<>=*-';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

