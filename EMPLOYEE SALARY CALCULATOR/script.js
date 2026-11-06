const salaryForm = document.getElementById("salaryForm");
const salaryBreakdown = document.getElementById("salaryBreakdown");
const errorMessage = document.getElementById("errorMessage");
const resetButton = document.getElementById("resetButton");
const currency = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2
});

function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    }[character]));
}

function displaySalaryBreakdown(event) {
    if (event) {
        event.preventDefault();
    }

    const employeeName = document.getElementById("employeeName").value.trim();
    const basicSalary = Number(document.getElementById("basicSalary").value);

    if (!employeeName || !Number.isFinite(basicSalary) || basicSalary < 0) {
        errorMessage.textContent = "Please enter a valid employee name and salary.";
        salaryBreakdown.innerHTML = "";
        return;
    }

    const housingAllowance = basicSalary * 0.10;
    const transportAllowance = basicSalary * 0.05;
    const tax = basicSalary * 0.03;
    const finalSalary = basicSalary + housingAllowance + transportAllowance - tax;

    errorMessage.textContent = "";
    salaryBreakdown.innerHTML = `
        <h2>Salary Breakdown</h2>
        <div class="breakdown-row"><span>Employee name</span><strong>${escapeHtml(employeeName)}</strong></div>
        <div class="breakdown-row"><span>Basic salary</span><strong>${currency.format(basicSalary)}</strong></div>
        <div class="breakdown-row"><span>Housing allowance</span><strong>${currency.format(housingAllowance)}</strong></div>
        <div class="breakdown-row"><span>Transport allowance</span><strong>${currency.format(transportAllowance)}</strong></div>
        <div class="breakdown-row"><span>Tax deduction</span><strong>-${currency.format(tax)}</strong></div>
        <div class="final-salary"><span>Final salary</span><span>${currency.format(finalSalary)}</span></div>
    `;
}

salaryForm.addEventListener("submit", displaySalaryBreakdown);

resetButton.addEventListener("click", () => {
    document.getElementById("employeeName").value = "";
    document.getElementById("basicSalary").value = "";
    salaryBreakdown.innerHTML = "";
    errorMessage.textContent = "";
});