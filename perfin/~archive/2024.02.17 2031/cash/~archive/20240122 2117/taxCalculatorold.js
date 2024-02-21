       // JavaScript function for tax calculation
        function calculateTax() {
            const income = parseFloat(document.getElementById('income').value);
            const state = document.getElementById('state').value;

            if (isNaN(income) || state === 'none') {
                document.getElementById('result').innerHTML = 'Please enter valid income and select a state.';
                return;
            }

            // Federal tax rate based on income brackets
            let federalTaxRate;
            if (income <= 11000) {
                federalTaxRate = 0.10;
            } else if (income <= 44725) {
                federalTaxRate = 0.12;
            } else if (income <= 95375) {
                federalTaxRate = 0.22;
            } else {
                federalTaxRate = 0.32; // Default rate for income above 95,375
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

            const federalTax = income * federalTaxRate;
            const stateTax = income * stateTaxRate;

            document.getElementById('result').innerHTML = `
                <p></p>
                <p>Federal Marginal Tax Rate: ${federalTaxRate * 100}%</p>
                <p>State Marginal Tax Rate: ${stateTaxRate * 100}%</p>
                <p>Federal Tax: $${federalTax.toFixed(2)}</p>
                <p>State Tax: $${stateTax.toFixed(2)}</p>
            `;
        }