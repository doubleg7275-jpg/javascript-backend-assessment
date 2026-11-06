// Get HTML elements
const result = document.getElementById("result");
const successBtn = document.getElementById("successBtn");
const failBtn = document.getElementById("failBtn");


// Function to display messages
function showMessage(message) {
    result.innerHTML += `<p>${message}</p>`;
}


// 1. Receive customer's order
function receiveOrder() {

    return new Promise((resolve) => {

        setTimeout(() => {

            const order = {
                customer: "David",
                product: "Laptop",
                amount: 250000
            };

            showMessage("1. Customer's order received.");

            resolve(order);

        }, 1000);

    });

}


// 2. Verify the order
function verifyOrder(order) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (order.product && order.amount > 0) {

                showMessage("2. Order verified successfully.");

                resolve(order);

            } else {

                reject(new Error("Order verification failed."));

            }

        }, 1000);

    });

}


// 3. Process payment
function processPayment(order, shouldFail) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (shouldFail) {

                reject(new Error("Payment failed. Please try again."));

            } else {

                showMessage("3. Payment processed successfully.");

                resolve(order);

            }

        }, 1000);

    });

}


// 4. Confirm the order
function confirmOrder(order) {

    return new Promise((resolve) => {

        setTimeout(() => {

            showMessage("4. Order confirmed successfully!");

            resolve(order);

        }, 1000);

    });

}


// Function to run the complete order process
function processOrder(shouldFail) {

    result.innerHTML = "<p>Starting order processing...</p>";

    successBtn.disabled = true;
    failBtn.disabled = true;

    receiveOrder()

        .then(function(order) {
            return verifyOrder(order);
        })

        .then(function(order) {
            return processPayment(order, shouldFail);
        })

        .then(function(order) {
            return confirmOrder(order);
        })

        .then(function(order) {

            showMessage(
                `<strong class="success">
                Order completed! Customer: ${order.customer},
                Product: ${order.product},
                Amount: ₦${order.amount.toLocaleString()}
                </strong>`
            );

        })

        .catch(function(error) {

            showMessage(
                `<strong class="error">
                Order failed: ${error.message}
                </strong>`
            );

        })

        .finally(function() {

            successBtn.disabled = false;
            failBtn.disabled = false;

        });

}


// Button for successful payment
successBtn.addEventListener("click", function() {
    processOrder(false);
});


// Button for failed payment
failBtn.addEventListener("click", function() {
    processOrder(true);
});