const numbers = [12, 7, 25, 8, 14, 33, 19, 4, 16, 21, 10, 29, 6, 18, 11];
const results = document.getElementById("results");
const analyzeButton = document.getElementById("analyzeButton");

function displayAnalysis() {
    const evenNumbers = [];
    const oddNumbers = [];

    for (const number of numbers) {
        if (number % 2 === 0) {
            evenNumbers.push(number);
        } else {
            oddNumbers.push(number);
        }
    }

    const largest = Math.max(...numbers);
    const smallest = Math.min(...numbers);
    const sum = numbers.reduce((total, number) => total + number, 0);
    const average = sum / numbers.length;

    results.innerHTML = `
        <h2>Analysis Results</h2>
        <p>Even Numbers: ${evenNumbers.join(", ")}</p>
        <p>Odd Numbers: ${oddNumbers.join(", ")}</p>
        <p>Largest Number: ${largest}</p>
        <p>Smallest Number: ${smallest}</p>
        <p>Sum: ${sum}</p>
        <p>Average: ${average}</p>
    `;
}

analyzeButton.addEventListener("click", displayAnalysis);