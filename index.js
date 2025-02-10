function calculateBtn(event) {
    event.preventDefault(); 
    const mortgageAmount = parseFloat(document.getElementById('mortgage-amount').value);
    const term = parseInt(document.getElementById('text-term').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value);
    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');


    if (!mortgageAmount || !term || !interestRate || !mortgageType) {
        alert("Please fill all fields.");
        return;
    }

    let monthlyRepayment;
    const interestRateMonthly = interestRate / 100 / 12;
    const numberOfPayments = term * 12;

    if (mortgageType.id === 'repayment') {
        monthlyRepayment = (mortgageAmount * interestRateMonthly) / (1 - Math.pow(1 + interestRateMonthly, -numberOfPayments));
    } else {
        monthlyRepayment = mortgageAmount * interestRateMonthly;
    }

    const resultsElement = document.querySelector('.results');
    resultsElement.style.display = 'block';

    resultsElement.innerHTML = `
        <h2>Your Monthly Repayment</h2>
        <div class="amount">$${monthlyRepayment.toFixed(2)}</div>
        <p>This calculation is based on a loan of $${mortgageAmount}, ${term} years with an interest rate of ${interestRate}%</p>
    `;
}

function clearAll() {
    document.getElementById('mortgage-amount').value = '';
    document.getElementById('text-term').value = '';
    document.getElementById('interest-rate').value = '';
    document.querySelector('.results').innerHTML = '';
    document.querySelector('.results').style.display = 'none';
    document.querySelectorAll('input[name="mortgage-type"]').forEach(input => input.checked = false);
}

document.addEventListener('DOMContentLoaded', () => {
    const calculateButton = document.querySelector('.calculate-btn');
    const clearButton = document.querySelector('.clear-btn');

    calculateButton.addEventListener('click', calculateBtn);
    clearButton.addEventListener('click', clearAll);
});
