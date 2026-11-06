
let employees = [
    {
        name: "David",
        salary: 250000,
        department: "IT"
    },
    {
        name: "Sarah",
        salary: 180000,
        department: "HR"
    },
    {
        name: "Michael",
        salary: 300000,
        department: "Finance"
    },
    {
        name: "Grace",
        salary: 220000,
        department: "Marketing"
    },
    {
        name: "John",
        salary: 150000,
        department: "IT"
    },
    {
        name: "Esther",
        salary: 280000,
        department: "Finance"
    }
];

function showResults(content, trigger) {
    const resultsSection = document.getElementById("resultsSection");

    document.getElementById("results").innerHTML = content;

    if (trigger) {
        trigger.closest("section").after(resultsSection);
    }
}

function displayEmployees(employeeList, trigger) {

    if (employeeList.length === 0) {
        showResults("<p>No employees found.</p>", trigger);
        return;
    }

    let output = "";

    for (let employee of employeeList) {

        output += `
            <div class="employee-card">
                <h3>${employee.name}</h3>
                <p>Salary: ₦${employee.salary.toLocaleString()}</p>
                <p>Department: ${employee.department}</p>
            </div>
        `;
    }

    showResults(output, trigger);
}

function getEmployeesByDepartment(department) {

    return employees.filter(employee =>
        employee.department === department
    );

}

function getHighEarners() {

    return employees.filter(employee =>
        employee.salary > 200000
    );

}

function getAverageSalary() {

    let totalSalary = employees.reduce((total, employee) => {
        return total + employee.salary;
    }, 0);

    return totalSalary / employees.length;

}

function getHighestPaidEmployee() {

    let highestSalary = employees.reduce((highest, employee) => {
        return employee.salary > highest
            ? employee.salary
            : highest;
    }, 0);

    return employees.find(employee =>
        employee.salary === highestSalary
    );

}

function getEmployeeNames() {

    return employees.map(employee => employee.name);

}
["David", "Sarah", "Michael", "Grace", "John", "Esther"]

document.getElementById("allEmployeesBtn").addEventListener("click", function() {

    displayEmployees(employees, this);

});

document.getElementById("departmentBtn").addEventListener("click", function() {

    let department = document.getElementById("department").value;

    if (department === "") {
        showResults("<p>Please select a department.</p>", this);
        return;
    }

    let result = getEmployeesByDepartment(department);

    displayEmployees(result, this);

});

document.getElementById("salaryBtn").addEventListener("click", function() {

    let result = getHighEarners();

    displayEmployees(result, this);

});

document.getElementById("averageBtn").addEventListener("click", function() {

    let average = getAverageSalary();

    showResults(`
        <h3>Average Employee Salary</h3>
        <p class="result-message">
            ₦${average.toLocaleString("en-NG")}
        </p>
    `, this);

});

document.getElementById("highestBtn").addEventListener("click", function() {

    let employee = getHighestPaidEmployee();

    displayEmployees([employee], this);

});

document.getElementById("namesBtn").addEventListener("click", function() {

    let names = getEmployeeNames();

    showResults(`
        <h3>Employee Names</h3>
        <ul>
            ${names.map(name => `<li>${name}</li>`).join("")}
        </ul>
    `, this);

});
