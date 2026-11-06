// Import functions from the math utility module
import {
    add,
    subtract,
    multiply,
    divide
} from "./script.js";

// Get HTML elements
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const result = document.getElementById("result");

// Reusable calculation function
function calculate(operation) {

    try {

        // Get the numbers entered by the user
        let firstNumber = Number(num1.value);
        let secondNumber = Number(num2.value);

        // Check if inputs are empty
        if (num1.value.trim() === "" || num2.value.trim() === "") {
            throw new Error("Please enter both numbers.");
        }

        let answer;

        // Perform the selected operation
        if (operation === "add") {
            answer = add(firstNumber, secondNumber);
        }

        else if (operation === "subtract") {
            answer = subtract(firstNumber, secondNumber);
        }

        else if (operation === "multiply") {
            answer = multiply(firstNumber, secondNumber);
        }

        else if (operation === "divide") {
            answer = divide(firstNumber, secondNumber);
        }

        // Display the result
        result.innerHTML = answer;
        result.style.color = "green";

    } catch (error) {

        // Display error message
        result.innerHTML = error.message;
        result.style.color = "red";

    }
}

// Button event listeners
document.getElementById("addBtn").addEventListener("click", function() {
    calculate("add");
});

document.getElementById("subtractBtn").addEventListener("click", function() {
    calculate("subtract");
});

document.getElementById("multiplyBtn").addEventListener("click", function() {
    calculate("multiply");
});

document.getElementById("divideBtn").addEventListener("click", function() {
    calculate("divide");
});