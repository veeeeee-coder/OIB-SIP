function convertTemperature() {
  const temperatureInput = document.getElementById('temperature');
  const resultContainer = document.getElementById('result-container');
  const resultText = document.getElementById('result-text');
  const errorMessage = document.getElementById('error-message');
  const formulaDisplay = document.getElementById('formula-display');

  const tempValue = parseFloat(temperatureInput.value);
  const selectedUnit = document.querySelector('input[name="unit"]:checked').value;

  temperatureInput.classList.remove('error');
  errorMessage.classList.remove('show');
  resultContainer.classList.remove('show');

  if (isNaN(tempValue) || temperatureInput.value.trim() === '') {
    temperatureInput.classList.add('error');
    errorMessage.classList.add('show');
    resultText.textContent = 'Please enter a valid number';
    formulaDisplay.textContent = '';
    return;
  }

  let results = {};
  let formulas = {};

  if (selectedUnit === 'celsius') {
    results.fahrenheit = (tempValue * 9 / 5) + 32;
    results.kelvin = tempValue + 273.15;
    formulas.fahrenheit = `°F = (${tempValue} × 9/5) + 32`;
    formulas.kelvin = `K = ${tempValue} + 273.15`;
  } else if (selectedUnit === 'fahrenheit') {
    results.celsius = (tempValue - 32) * 5 / 9;
    results.kelvin = (tempValue - 32) * 5 / 9 + 273.15;
    formulas.celsius = `°C = (${tempValue} - 32) × 5/9`;
    formulas.kelvin = `K = (${tempValue} - 32) × 5/9 + 273.15`;
  } else if (selectedUnit === 'kelvin') {
    results.celsius = tempValue - 273.15;
    results.fahrenheit = (tempValue - 273.15) * 9 / 5 + 32;
    formulas.celsius = `°C = ${tempValue} - 273.15`;
    formulas.fahrenheit = `°F = (${tempValue} - 273.15) × 9/5 + 32`;
  }

  let resultString = '';
  let formulaString = '';

  if (selectedUnit === 'celsius') {
    resultString = `${tempValue}°C = ${results.fahrenheit.toFixed(2)}°F = ${results.kelvin.toFixed(2)}K`;
    formulaString = `${formulas.fahrenheit} = ${results.fahrenheit.toFixed(2)}°F`;
  } else if (selectedUnit === 'fahrenheit') {
    resultString = `${tempValue}°F = ${results.celsius.toFixed(2)}°C = ${results.kelvin.toFixed(2)}K`;
    formulaString = `${formulas.celsius} = ${results.celsius.toFixed(2)}°C`;
  } else if (selectedUnit === 'kelvin') {
    resultString = `${tempValue}K = ${results.celsius.toFixed(2)}°C = ${results.fahrenheit.toFixed(2)}°F`;
    formulaString = `${formulas.celsius} = ${results.celsius.toFixed(2)}°C`;
  }

  resultText.textContent = resultString;
  formulaDisplay.textContent = formulaString;
  resultContainer.classList.add('show');
}

// Handle Enter key press
document.getElementById('temperature').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    convertTemperature();
  }
});

// Remove error on input
document.getElementById('temperature').addEventListener('input', function () {
  this.classList.remove('error');
  document.getElementById('error-message').classList.remove('show');
});
