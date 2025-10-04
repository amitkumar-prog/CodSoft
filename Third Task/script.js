let previous = null;
let current = '0';
let operator = null;

function updateDisplay() {
  document.getElementById('display').textContent = current;
}

function inputNumber(n) {
  if (current === '0' || current === 'Error') current = n;
  else current += n;
  updateDisplay();
}

function addDecimal() {
  if (!current.includes('.')) {
    current += '.';
    updateDisplay();
  }
}

function inputOperator(op) {
  if (operator && previous !== null) {
    previous = operate(previous, operator, Number(current));
  } else {
    previous = Number(current);
  }
  operator = op;
  current = '0';
  updateDisplay();
}

function pressEqual() {
  if (operator === null || previous === null) return;
  let result = operate(previous, operator, Number(current));
  if (typeof result === 'number' && !Number.isInteger(result)) {
    result = parseFloat(result.toFixed(10));
  }
  current = String(result);
  previous = null;
  operator = null;
  updateDisplay();
}

function resetAll() {
  previous = null;
  current = '0';
  operator = null;
  updateDisplay();
}

function operate(a, op, b) {
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
  if (op === '/') return b === 0 ? 'Error' : a / b;
}

// Event handling
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    const val  = btn.dataset.value;
    if (type === 'num') inputNumber(val);
    else if (type === 'op') inputOperator(val);
    else if (type === 'equal') pressEqual();
    else if (type === 'clear') resetAll();
    else if (type === 'decimal') addDecimal();
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (/\d/.test(e.key)) inputNumber(e.key);
  else if (['+','-','*','/'].includes(e.key)) inputOperator(e.key);
  else if (e.key === 'Enter') pressEqual();
  else if (e.key === 'Escape') resetAll();
  else if (e.key === '.') addDecimal();
});
