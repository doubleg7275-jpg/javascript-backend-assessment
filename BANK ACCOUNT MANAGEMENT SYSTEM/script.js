
const account = {
    accountHolder: "EDIDIONG",
    accountNumber: "8163220774",
    balance: 0
};

function displayAccountInfo() {

    document.getElementById("accountInfo").innerHTML = `
        <p><strong>Account Holder:</strong> ${account.accountHolder}</p>

        <p><strong>Account Number:</strong> ${account.accountNumber}</p>

        <p><strong>Account Balance:</strong> ₦${account.balance.toLocaleString()}</p>
    `;

    displayBalance();

}

function displayBalance() {

    document.getElementById("balanceDisplay").innerHTML = `
        ₦${account.balance.toLocaleString()}
    `;

}

function depositMoney(amount) {

    if (!Number.isFinite(amount) || amount <= 0) {

        showMessage("Please enter a valid positive deposit amount.");

    } else {

        account.balance += amount;

        showMessage(`₦${amount.toLocaleString()} deposited successfully!`);

        displayAccountInfo();
    }

}

function withdrawMoney(amount) {

    if (!Number.isFinite(amount) || amount <= 0) {

        showMessage("Please enter a valid withdrawal amount.");

    } else if (amount > account.balance) {

        showMessage("Insufficient funds! Your balance is too low.");

    } else {

        account.balance -= amount;

        showMessage(`₦${amount.toLocaleString()} withdrawn successfully!`);

        displayAccountInfo();
    }

}

function checkBalance() {

    displayBalance();

    showMessage("Your account balance has been displayed.");
}

function showMessage(message) {

    document.getElementById("message").innerHTML = message;

}

document.getElementById("depositBtn").addEventListener("click", function() {

    let amount = Number(document.getElementById("depositAmount").value);

    depositMoney(amount);

    document.getElementById("depositAmount").value = "";

});

document.getElementById("withdrawBtn").addEventListener("click", function() {

    let amount = Number(document.getElementById("withdrawAmount").value);

    withdrawMoney(amount);

    document.getElementById("withdrawAmount").value = "";

});

document.getElementById("checkBalanceBtn").addEventListener("click", function() {

    checkBalance();

});
displayAccountInfo();
checkBalance();