// JavaScript function for tax calculation
        function calculateTax() {
            const income1 = parseFloat(document.getElementById('income1').value);
            const income2 = parseFloat(document.getElementById('income2').value);
            const state = document.getElementById('state').value;
            const filingstatus = document.getElementById('filingstatus').value;

            if (isNaN(income1) || state === 'none') {
                document.getElementById('result').innerHTML = 'Please enter valid income and select a state.';
                return;
            }

            // Federal tax rate based on income brackets
            let FedIncome;
            if (filingstatus === 'single') {
                FedIncome = (income1 + income2) - 14600; 
            } else if (filingstatus === 'mfj') {
                FedIncome = (income1 + income2) - 29200; 
            }

            let FedTax;
            if (filingstatus === 'single') {
                if (FedIncome <= 11600) {
                    FedTax = (FedIncome * 0.10);
                } else if (FedIncome <= 47150) {
                    FedTax = (1160 + (FedIncome - 11600) * 0.12);
                } else if (FedIncome <= 100525) {
                    FedTax = (5426 + (FedIncome - 47150) * 0.22);
                } else if (FedIncome <= 191950) {
                    FedTax = (17168.50 + (FedIncome - 100525) * 0.24);
                } else if (FedIncome <= 243725) {
                    FedTax = (39110.50 + (FedIncome - 191950) * 0.32);
                } else if (FedIncome <= 609350) {
                    FedTax = (55678.50 + (FedIncome - 243725) * 0.35);
                } else {
                    FedTax = (183647.25 + (FedIncome - 609350) * 0.37); //
                }
            }

            if (filingstatus === 'mfj') {
                if (FedIncome <= 23200) {
                    FedTax = (FedIncome * 0.10);
                } else if (FedIncome <= 94300) {
                    FedTax = (2320 + (FedIncome - 23200) * 0.12);
                } else if (FedIncome <= 201050) {
                    FedTax = (10852 + (FedIncome - 94300) * 0.22);
                } else if (FedIncome <= 383900) {
                    FedTax = (34337 + (FedIncome - 201050) * 0.24);
                } else if (FedIncome <= 487450) {
                    FedTax = (78221 + (FedIncome - 383900) * 0.32);
                } else if (FedIncome <= 731200) {
                    FedTax = (111357 + (FedIncome - 487450) * 0.35);
                } else {
                    FedTax = (196669.50 + (FedIncome - 731200) * 0.37); //
                }
            }

            // State tax rate (example, you need to update this based on the specific state)
            let StateMargTax;
            switch(state) {
                case 'il':
                    StateMargTax = 0.0495;
                    break;
                case 'ca':
                    StateMargTax = 0.09;
                    break;
                // Add cases for more states as needed
                default:
                    StateMargTax = 0.05; // Default state tax rate
            }

            const stateTax = income * StateMargTax;

            document.getElementById('result').innerHTML = `
                <p></p>
                <p>Federal Marginal Tax Rate: ${income1 * 100}%</p>
                <p>State Marginal Tax Rate: ${StateMargTax * 100}%</p>
                <p>Federal Tax: $${federalTax.toFixed(2)}</p>
                <p>State Tax: $${stateTax.toFixed(2)}</p>
            `;
        }