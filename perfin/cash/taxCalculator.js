

// JavaScript function for tax calculation
    function calculateTax() {
        const income1 = parseFloat(document.getElementById('income1').value);
        const income2Input = document.getElementById('income2').value;
        const income2 = income2Input ? parseFloat(income2Input) : 0;
        const state = document.getElementById('state').value;
        const filingstatus = document.getElementById('filingstatus').value;
            
        const income = income1 + income2;
        
        // Fed income with deduction
        if (filingstatus === 'mfj') {
            fedInc = income - 29000;
        } else if (filingstatus === 'single') {
            fedInc = income - 14600;
        }

        // State income with deduction
        const stateInc = income

        if (isNaN(income) || state === 'none') {
            document.getElementById('result').innerHTML = 'Please enter valid income and select a state.';
            return;
        }

        // Federal tax rate based on income brackets
        let federalTax;
        if (filingstatus === 'single') {
            if (fedInc <= 11600) {
                federalTax = (fedInc * 0.10);
            } else if (fedInc <= 47150) {
                federalTax = (1160 + (fedInc - 11600) * 0.12);
            } else if (fedInc <= 100525) {
                federalTax = (5426 + (fedInc - 47150) * 0.22);
            } else if (fedInc <= 191950) {
                federalTax = (17168.50 + (fedInc - 100525) * 0.24);
            } else if (fedInc <= 243725) {
                federalTax = (39110.50 + (fedInc - 191950) * 0.32);
            } else if (fedInc <= 609350) {
                federalTax = (55678.50 + (fedInc - 243725) * 0.35);
            } else {
                federalTax = (183647.25 + (fedInc - 609350) * 0.37); //
            }
        }

        if (filingstatus === 'mfj') {
            if (fedInc <= 23200) {
                federalTax = (fedInc * 0.10);
            } else if (fedInc <= 94300) {
                federalTax = (2320 + (fedInc - 23200) * 0.12);
            } else if (fedInc <= 201050) {
                federalTax = (10852 + (fedInc - 94300) * 0.22);
            } else if (fedInc <= 383900) {
                federalTax = (34337 + (fedInc - 201050) * 0.24);
            } else if (fedInc <= 487450) {
                federalTax = (78221 + (fedInc - 383900) * 0.32);
            } else if (fedInc <= 731200) {
                federalTax = (111357 + (fedInc - 487450) * 0.35);
            } else {
                federalTax = (196669.50 + (fedInc - 731200) * 0.37); //
            }
        }

        // State tax rate (example, you need to update this based on the specific state)
        let stateTaxRate;
        switch(state) {
            case 'ny':
                stateTaxRate = 0.06;
                break;
            case 'ca':
                stateTaxRate = 0.09;
                break;
                // Add cases for more states as needed
                default:
                stateTaxRate = 0.05; // Default state tax rate
        }

        //const federalTax = income * federalTaxRate;
        const stateTax = income * stateTaxRate;

        document.getElementById('result').innerHTML = `
            <p></p>
            <p>State Marginal Tax Rate: ${stateTaxRate * 100}%</p>
            <p>Federal Tax: $${federalTax.toFixed(0)}</p>
            <p>State Tax: $${stateTax.toFixed(2)}</p>
            <p>Fed income: $${fedInc.toFixed(2)}</p>
            `;
        }