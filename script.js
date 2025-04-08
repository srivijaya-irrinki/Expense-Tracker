// Selecting elements
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategory = document.getElementById("expense-category");
const addExpenseBtn = document.getElementById("add-expense");
const expenseList = document.getElementById("expenses");
const totalAmount = document.getElementById("total");

// Array to store expenses
let expenses = [];

// Function to add an expense
function addExpense() {
    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value);
    const category = expenseCategory.value;

    if (name === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    // Create an expense object
    const expense = {
        id: Date.now(), // Unique ID
        name,
        amount,
        category
    };

    // Add expense to array
    expenses.push(expense);
    
    // Update UI
    updateExpenseList();
    updateTotal();

    // Clear input fields
    expenseName.value = "";
    expenseAmount.value = "";
}

// Function to update the expense list in UI
function updateExpenseList() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${expense.name} - ₹${expense.amount} (${expense.category})
            <button class="delete-btn" onclick="deleteExpense(${expense.id})">❌</button>
        `;
        expenseList.appendChild(li);
    });
}

// Function to calculate and update total expense
function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmount.textContent = total.toFixed(2);
}

// Function to delete an expense
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateExpenseList();
    updateTotal();
}

// Event listener for adding an expense
addExpenseBtn.addEventListener("click", addExpense);