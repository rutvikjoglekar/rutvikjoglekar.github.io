function calculateTax() {
    const income1 = parseCurrency(document.getElementById('income1').value);
    const income2 = parseCurrency(document.getElementById('income2').value);
    const state = document.getElementById('state').value;
    const filingStatus = document.getElementById('filingstatus').value;
    
    const income = income1 + income2;
    
    // Calculate adjusted federal income based on filing status
    let fedInc;
    if (filingStatus === 'mfj') {
        fedInc = income - 29000;
    } else if (filingStatus === 'single') {
        fedInc = income - 14600;
    }

    // State income with no deduction
    const stateInc = income;

    // Validate input
    if (isNaN(income) || state === 'none') {
        document.getElementById('result').innerHTML = 'Please enter valid data.';
        return;
    }

    // Calculate federal tax based on income and filing status
    let federalTax;
    if (filingStatus === 'single') {
        if (fedInc <= 11600) {
            federalTax = fedInc * 0.10;
        } else if (fedInc <= 47150) {
            federalTax = 1160 + (fedInc - 11600) * 0.12;
        } else if (fedInc <= 100525) {
            federalTax = 5426 + (fedInc - 47150) * 0.22;
        } else if (fedInc <= 191950) {
            federalTax = 17168.50 + (fedInc - 100525) * 0.24;
        } else if (fedInc <= 243725) {
            federalTax = 39110.50 + (fedInc - 191950) * 0.32;
        } else if (fedInc <= 609350) {
            federalTax = 55678.50 + (fedInc - 243725) * 0.35;
        } else {
            federalTax = 183647.25 + (fedInc - 609350) * 0.37;
        }
    }

    if (filingStatus === 'mfj') {
        if (fedInc <= 23200) {
            federalTax = fedInc * 0.10;
        } else if (fedInc <= 94300) {
            federalTax = 2320 + (fedInc - 23200) * 0.12;
        } else if (fedInc <= 201050) {
            federalTax = 10852 + (fedInc - 94300) * 0.22;
        } else if (fedInc <= 383900) {
            federalTax = 34337 + (fedInc - 201050) * 0.24;
        } else if (fedInc <= 487450) {
            federalTax = 78221 + (fedInc - 383900) * 0.32;
        } else if (fedInc <= 731200) {
            federalTax = 111357 + (fedInc - 487450) * 0.35;
        } else {
            federalTax = 196669.50 + (fedInc - 731200) * 0.37;
        }
    }

    // Calculate state tax
    let stateTax;
    switch(state) {
        case 'ny':
            stateTaxRate = 0.06;
            stateTax = income * stateTaxRate;
            break;
        case 'ca':
            if (income <= 10000) {
                stateTaxRate = 0.10;
            } else if (income <= 50000) {
                stateTaxRate = 0.12;
            } else {
                stateTaxRate = 0.20;
            }
            stateTax = income * stateTaxRate;
            break;
        case 'notax':
            stateTaxRate = 0;
            stateTax = 0;
            break;
        default:
            stateTaxRate = 0; // Default state tax rate
            stateTax = 0;
    }

    // Ensure federal tax and state tax are not negative
    federalTax = Math.max(0, federalTax);
    stateTax = Math.max(0, stateTax);

    // Calculate monthly income after taxes
    const monthlyIncome = (income - federalTax - stateTax) / 12;

    // Retrieve necessary spend inputs and parse currency
    const rent = parseCurrency(document.getElementById('rent').value);
    const medicalExpenses = parseCurrency(document.getElementById('med').value);
    const grocery = parseCurrency(document.getElementById('food').value);
    const transportation = parseCurrency(document.getElementById('transport').value);
    const debt = parseCurrency(document.getElementById('mindebt').value);
    const otherExpenses = parseCurrency(document.getElementById('necother').value);
    const savings = parseCurrency(document.getElementById('save').value);

    // Calculate total necessary spend
    const necessarySpend = rent + medicalExpenses + grocery + transportation + debt + otherExpenses + savings;

    // Compare necessary spend with income after taxes
    const isSustainable = monthlyIncome > necessarySpend;

    // Format numbers as currency without cents
    const formattedFederalTax = formatCurrency(federalTax);
    const formattedStateTax = formatCurrency(stateTax);
    const formattedMonthlyIncome = formatCurrency(monthlyIncome);
    const formattedNecessarySpend = formatCurrency(necessarySpend);

    // Update result on the webpage
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
        <p>Monthly 'necessary' spend: ${formattedNecessarySpend}</p>
        <p>Monthly income after taxes: ${formattedMonthlyIncome}</p>
        <p>Sustainable budget: ${isSustainable ? 'Yes' : 'No'}</p>
    `;

    // If the budget is sustainable, add a bulleted message
    if (isSustainable) {
        const messageElement = document.createElement('ul');
        messageElement.innerHTML = `
            <li>Your budget is sustainable (without having factored non-necessities)!</li>
            <li>Make sure you're building an <a href="https://www.bogleheads.org/wiki/Emergency_fund" target="_blank">emergency fund</a>.</li>
            <li>Park your savings in a <a href="https://www.nerdwallet.com/best/banking/high-yield-online-savings-accounts" target="_blank">high-yield savings account</a> - this is free cash.</li>
            <li>More on this to come, but also make sure you are (i) adequetely insured, (ii) paying down any high-interest debt, and (iii) saving for retirement.</li>
        `;
        resultElement.appendChild(messageElement);
    } else {
    const messageElement = document.createElement('ul');
    messageElement.innerHTML = `
        <li>Your budget is not sustainable. Consider the following:</li>
        <li>Decreasing expenses: this could be finding cheaper accomodations or other creative ways to reduce your spend.</li>
        <li>Increasing income through additional work or investments.</li>
        <li>As soon as you're able, make sure you're building an <a href="https://www.bogleheads.org/wiki/Emergency_fund" target="_blank">emergency fund</a>.</li>
        <li>More on this to come, but also make sure you are (i) adequetely insured, (ii) paying down any high-interest debt, and (iii) saving for retirement.</li>
    `;
    resultElement.appendChild(messageElement);
}

}

// Function to parse currency inputs
function parseCurrency(value) {
    // If value is empty or not provided, return 0
    if (!value) {
        return 0;
    }
    // Remove non-numeric characters from input value
    const numericValue = value.replace(/[^\d.]/g, '');
    // Convert string to number and return
    return parseFloat(numericValue);
}

// Function to format currency without cents
function formatCurrency(amount) {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
