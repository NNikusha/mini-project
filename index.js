const displayExpenses = () => {
  const expenses = JSON.parse(localStorage.getItem("expenses"));

  if (expenses !== null && expenses.length > 0) {
    const datasContainer = document.querySelector(".datas");
    let html = "";
    expenses.forEach((expense) => {
      html += `<div class="data">id:${expense.id}
                  <div class="category">Category:${expense.category}</div>
                  <div class="date">Date:${expense.date}</div>
                  <div class="total">Total Amount:${expense.total_amount}</div>
                </div>`;
    });
    datasContainer.innerHTML = html;
  }
};
window.addEventListener("load", displayExpenses);

const storageKey = "expenses";
const expenses = JSON.parse(localStorage.getItem(storageKey));
const incomeArray = expenses.filter((expense) => expense.type === "income");
const totalIncome = incomeArray.reduce(
  (sum, income) => sum + income.total_amount,
  0
);

const expenseArray = expenses.filter((expense) => expense.type === "expense");
const totalExpense = expenseArray.reduce(
  (sum, expense) => sum + expense.total_amount,
  0
);

const difference = totalIncome - totalExpense;

const totalIncomeElement = document.querySelector(".totalNum");
totalIncomeElement.innerHTML = `Total Income: ${totalIncome}`;

const totalExpenseElement = document.querySelector(".totalExpense");
totalExpenseElement.innerHTML = `Total Expense: ${totalExpense}`;

const differenceElement = document.querySelector(".difference");
differenceElement.innerHTML = `Difference: ${difference}`;



const filterExpensesByDate = () => {
  const dateInput = document.getElementById("date");
  const dateValue = dateInput.value;
  const filteredExpenses = expenses.filter(
    (expense) => expense.date === dateValue
  );
  return filteredExpenses;
};

const form = document.getElementById("form");
const datasContainer = document.querySelector(".datas");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const filteredExpenses = filterExpensesByDate();
  datasContainer.innerHTML = "";
  filteredExpenses.forEach((expense) => {
    const expenseElem = document.createElement("div");
    expenseElem.className = "data";
    expenseElem.innerHTML = `
      <div class="id">id:${expense.id}</div>
      <div class="category">Category:${expense.category}</div>
      <div class="date">Date:${expense.date}</div>
      <div class="total">Total Amount:${expense.total_amount}</div>
    `;
    datasContainer.appendChild(expenseElem);
  });
});

//filter by category 

function filterByCategory(category) {
  const storageKey = "expenses";
  const expenses = JSON.parse(localStorage.getItem(storageKey));
  const filteredExpenses = expenses.filter(
    (expense) => expense.category === category
  );
  
  const datasContainer = document.querySelector(".datas");
  datasContainer.innerHTML = "";
  
  filteredExpenses.forEach((expense) => {
    const expenseElem = document.createElement("div");
    expenseElem.className = "data";
    expenseElem.innerHTML = `
      <div class="id">id:${expense.id}</div>
      <div class="category">Category:${expense.category}</div>
      <div class="date">Date:${expense.date}</div>
      <div class="total">Total Amount:${expense.total_amount}</div>
    `;
    datasContainer.appendChild(expenseElem);
  });
}

const selectElement = document.getElementById("category");

selectElement.addEventListener("change", () => {
  const selectedCategory = selectElement.value;
  filterByCategory(selectedCategory);
});
///////
function filterByMinAmount(minAmount) {
  const filteredExpenses = expenses.filter(
    (expense) => expense.total_amount >= minAmount
  );

  const datasContainer = document.querySelector(".datas");
  datasContainer.innerHTML = "";

  filteredExpenses.forEach((expense) => {
    const expenseElem = document.createElement("div");
    expenseElem.className = "data";
    expenseElem.innerHTML = `
      <div class="id">id:${expense.id}</div>
      <div class="category">Category:${expense.category}</div>
      <div class="date">Date:${expense.date}</div>
      <div class="total">Total Amount:${expense.total_amount}</div>
    `;
    datasContainer.appendChild(expenseElem);
  });
}

const minInput = document.getElementById("min");
minInput.addEventListener("input", () => {
  const minAmount = parseInt(minInput.value);
  filterByMinAmount(minAmount);
});
/////
function filterByMaxAmount(maxAmount) {
  const filteredExpenses = expenses.filter(
    (expense) => expense.total_amount <= maxAmount
  );
  return filteredExpenses;
}

const maxInput = document.getElementById("max");
maxInput.addEventListener("input", () => {
  const maxAmount = parseInt(maxInput.value);
  const filteredExpenses = filterByMaxAmount(maxAmount);
  console.log(filteredExpenses);
});
