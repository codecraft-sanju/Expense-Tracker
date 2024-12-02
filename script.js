const expenseForm = document.getElementById('expense-form');
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const expenseCategory = document.getElementById('expense-category');
const expenseList = document.getElementById('expense-list');
const totalExpensesElem = document.getElementById('total-expenses');
const categoryBreakdown = document.getElementById('category-breakdown');

// Retrieve existing expenses from localStorage or initialize an empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Save expenses to localStorage
function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Calculate and display summary
function calculateSummary() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalExpensesElem.textContent = total.toFixed(2); // Ensure 2 decimal places

  const categories = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  categoryBreakdown.innerHTML = '';
  for (const [category, amount] of Object.entries(categories)) {
    const li = document.createElement('li');
    li.textContent = `${category}: ₹${amount.toFixed(2)}`;
    categoryBreakdown.appendChild(li);
  }
}

// Render all expenses in the list
function renderExpenses() {
  expenseList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${expense.name} - ₹${expense.amount.toFixed(2)} (${expense.category})</span>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(li);
  });
  calculateSummary();
}

// Add a new expense
function addExpense(e) {
  e.preventDefault();
  const name = expenseName.value.trim();
  const amount = parseFloat(expenseAmount.value);
  const category = expenseCategory.value;

  if (!name || isNaN(amount) || amount <= 0) {
    alert('Please enter valid expense details.');
    return;
  }

  expenses.push({ name, amount, category });
  saveExpenses();
  renderExpenses();
  expenseForm.reset();
}

// Delete an expense by index
function deleteExpense(index) {
  expenses.splice(index, 1);
  saveExpenses();
  renderExpenses();
}

// Event listener for form submission
expenseForm.addEventListener('submit', addExpense);

// Initial rendering of expenses
renderExpenses();
