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

    // State income with no deduction
    const stateInc = income;

    // State tax 
    const progressiveTaxData = {
        'al': {
            'mfj': [
                { upperLimit: 1000, rate: 0.02 },
                { upperLimit: 5000, rate: 0.04 },
                { upperLimit: 100000000, rate: 0.05 }
            ],
            'single': [
                { upperLimit: 500, rate: 0.02 },
                { upperLimit: 2500, rate: 0.04 },
                { upperLimit: 100000000, rate: 0.05 }
            ]
        },
        'ak': {
            'mfj': [
                { upperLimit: 100000000, rate: 0 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0 }
            ]
        },
        'az': {
            'mfj': [
                { upperLimit: 100000000, rate: 0.025 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0.025 }
            ]
        },

        'ar': {
            'mfj': [
                { upperLimit: 4300, rate: 0.02 },
                { upperLimit: 4200, rate: 0.04 },
                { upperLimit: 100000000, rate: 0.049 }
            ],
            'single': [
                { upperLimit: 4300, rate: 0.02 },
                { upperLimit: 4200, rate: 0.04 },
                { upperLimit: 100000000, rate: 0.049 }
            ]
        },
        'ca': {
            'mfj': [
                { upperLimit: 20198, rate: 0.01 },
                { upperLimit: 27686, rate: 0.02 },
                { upperLimit: 27692, rate: 0.04 },
                { upperLimit: 29334, rate: 0.06 },
                { upperLimit: 27680, rate: 0.08 },
                { upperLimit: 544688, rate: 0.093 },
                { upperLimit: 135450, rate: 0.103 },
                { upperLimit: 187272, rate: 0.113 },
                { upperLimit: 354550, rate: 0.123 },
                { upperLimit: 98645450, rate: 0.133 }
            ],
            'single': [
                { upperLimit: 10099, rate: 0.01 },
                { upperLimit: 13843, rate: 0.02 },
                { upperLimit: 13846, rate: 0.04 },
                { upperLimit: 14667, rate: 0.06 },
                { upperLimit: 13840, rate: 0.08 },
                { upperLimit: 272344, rate: 0.093 },
                { upperLimit: 67725, rate: 0.103 },
                { upperLimit: 270911, rate: 0.113 },
                { upperLimit: 322725, rate: 0.123 },
                { upperLimit: 99000000, rate: 0.133 }
            ]
        },
        'co': {
            'mfj': [
                { upperLimit: 100000000, rate: 0.044 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0.044 }
            ]
        },
        'ct': {
            'mfj': [
                { upperLimit: 20000, rate: 0.03 },
                { upperLimit: 80000, rate: 0.05 },
                { upperLimit: 100000, rate: 0.055 },
                { upperLimit: 200000, rate: 0.06 },
                { upperLimit: 100000, rate: 0.065 },
                { upperLimit: 500000, rate: 0.069 },
                { upperLimit: 99000000, rate: 0.0699 }
            ],
            'single': [
                { upperLimit: 10000, rate: 0.03 },
                { upperLimit: 40000, rate: 0.05 },
                { upperLimit: 50000, rate: 0.055 },
                { upperLimit: 100000, rate: 0.06 },
                { upperLimit: 50000, rate: 0.065 },
                { upperLimit: 250000, rate: 0.069 },
                { upperLimit: 100000000, rate: 0.0699 }
            ]
        },
        'dc': {
            'mfj': [
                { upperLimit: 10000, rate: 0.04 },
                { upperLimit: 30000, rate: 0.06 },
                { upperLimit: 20000, rate: 0.065 },
                { upperLimit: 190000, rate: 0.085 },
                { upperLimit: 250000, rate: 0.0925 },
                { upperLimit: 500000, rate: 0.0975 },
                { upperLimit: 99000000, rate: 0.1075 }
            ],
            'single': [
                { upperLimit: 10000, rate: 0.04 },
                { upperLimit: 30000, rate: 0.06 },
                { upperLimit: 20000, rate: 0.065 },
                { upperLimit: 190000, rate: 0.085 },
                { upperLimit: 250000, rate: 0.0925 },
                { upperLimit: 500000, rate: 0.0975 },
                { upperLimit: 99000000, rate: 0.1075 }
            ]
        },
            
        'de': {
            'mfj': [
                { upperLimit: 3000, rate: 0.022 },
                { upperLimit: 5000, rate: 0.039 },
                { upperLimit: 10000, rate: 0.048 },
                { upperLimit: 5000, rate: 0.052 },
                { upperLimit: 35000, rate: 0.0555 },
                { upperLimit: 100000000, rate: 0.066 }
            ],
            'single': [
                { upperLimit: 3000, rate: 0.022 },
                { upperLimit: 5000, rate: 0.039 },
                { upperLimit: 10000, rate: 0.048 },
                { upperLimit: 5000, rate: 0.052 },
                { upperLimit: 35000, rate: 0.0555 },
                { upperLimit: 100000000, rate: 0.066 }
            ]
        },
        'fl': {
            'mfj': [
                { upperLimit: 100000000, rate: 0 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0 }
            ]
        },
        'ga': {
            'mfj': [
                { upperLimit: 1000, rate: 0.01 },
                { upperLimit: 2000, rate: 0.02 },
                { upperLimit: 2000, rate: 0.03 },
                { upperLimit: 2000, rate: 0.04 },
                { upperLimit: 3000, rate: 0.05 },
                { upperLimit: 100000000, rate: 0.0575 }
            ],
            'single': [
                { upperLimit: 750, rate: 0.01 },
                { upperLimit: 1500, rate: 0.02 },
                { upperLimit: 1500, rate: 0.03 },
                { upperLimit: 1500, rate: 0.04 },
                { upperLimit: 1750, rate: 0.05 },
                { upperLimit: 100000000, rate: 0.0575 }
            ]
        },
        'hi': {
            'mfj': [
                { upperLimit: 4800, rate: 0.014 },
                { upperLimit: 4800, rate: 0.032 },
                { upperLimit: 9600, rate: 0.055 },
                { upperLimit: 9600, rate: 0.064 },
                { upperLimit: 9600, rate: 0.068 },
                { upperLimit: 9600, rate: 0.072 },
                { upperLimit: 24000, rate: 0.076 },
                { upperLimit: 24000, rate: 0.079 },
                { upperLimit: 204000, rate: 0.0825 },
                { upperLimit: 50000, rate: 0.09 },
                { upperLimit: 50000, rate: 0.1 },
                { upperLimit: 100000000, rate: 0.11 }
            ],
            'single': [
                { upperLimit: 2400, rate: 0.014 },
                { upperLimit: 2400, rate: 0.032 },
                { upperLimit: 4800, rate: 0.055 },
                { upperLimit: 4800, rate: 0.064 },
                { upperLimit: 4800, rate: 0.068 },
                { upperLimit: 4800, rate: 0.072 },
                { upperLimit: 12000, rate: 0.076 },
                { upperLimit: 12000, rate: 0.079 },
                { upperLimit: 102000, rate: 0.0825 },
                { upperLimit: 25000, rate: 0.09 },
                { upperLimit: 25000, rate: 0.1 },
                { upperLimit: 100000000, rate: 0.11 }
            ]
        },
        'id': {
            'mfj': [
                { upperLimit: 100000000, rate: 0.058 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0.058 }
            ]
        },
        'il': {
            'mfj': [
                { upperLimit: 100000000, rate: 0.0495 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0.0495 }
            ]
        },
        'in': {
            'mfj': [
                { upperLimit: 100000000, rate: 0.0315 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0.0315 }
            ]
        },
        'ia': {
            'mfj': [
                { upperLimit: 12000, rate: 0.044 },
                { upperLimit: 48000, rate: 0.0482 },
                { upperLimit: 90000, rate: 0.057 },
                { upperLimit: 100000000, rate: 0.06 }
            ],
            'single': [
                { upperLimit: 6000, rate: 0.044 },
                { upperLimit: 24000, rate: 0.0482 },
                { upperLimit: 45000, rate: 0.057 },
                { upperLimit: 100000000, rate: 0.06 }
            ]
        },
        'ks': {
            'mfj': [
                { upperLimit: 30000, rate: 0.031 },
                { upperLimit: 30000, rate: 0.0525 },
                { upperLimit: 100000000, rate: 0.057 }
            ],
            'single': [
                { upperLimit: 15000, rate: 0.031 },
                { upperLimit: 15000, rate: 0.0525 },
                { upperLimit: 100000000, rate: 0.057 }
            ]
        },
        'ky': {
            'mfj': [
                { upperLimit: 100000000, rate: 0.045 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0.045 }
            ]
        },
        'la': {
            'mfj': [
                { upperLimit: 25000, rate: 0.0185 },
                { upperLimit: 75000, rate: 0.035 },
                { upperLimit: 100000000, rate: 0.04245 }
            ],
            'single': [
                { upperLimit: 12500, rate: 0.0185 },
                { upperLimit: 37500, rate: 0.035 },
                { upperLimit: 100000000, rate: 0.04245 }
            ]
        },
        'me': {
            'mfj': [
                { upperLimit: 49050, rate: 0.058 },
                { upperLimit: 67050, rate: 0.0675 },
                { upperLimit: 100000000, rate: 0.0715 }
            ],
            'single': [
                { upperLimit: 24500, rate: 0.058 },
                { upperLimit: 33550, rate: 0.0675 },
                { upperLimit: 100000000, rate: 0.0715 }
            ]
        },
        'md': {
            'mfj': [
                { upperLimit: 1000, rate: 0.02 },
                { upperLimit: 1000, rate: 0.03 },
                { upperLimit: 1000, rate: 0.04 },
                { upperLimit: 147000, rate: 0.0475 },
                { upperLimit: 25000, rate: 0.05 },
                { upperLimit: 50000, rate: 0.0525 },
                { upperLimit: 75000, rate: 0.055 },
                { upperLimit: 100000000, rate: 0.0575 }
            ],
            'single': [
                { upperLimit: 1000, rate: 0.02 },
                { upperLimit: 1000, rate: 0.03 },
                { upperLimit: 1000, rate: 0.04 },
                { upperLimit: 97000, rate: 0.0475 },
                { upperLimit: 25000, rate: 0.05 },
                { upperLimit: 25000, rate: 0.0525 },
                { upperLimit: 100000, rate: 0.055 },
                { upperLimit: 100000000, rate: 0.0575 }
            ]
        },
        'ma': {
            'mfj': [
                { upperLimit: 1000000, rate: 0.05 },
                { upperLimit: 99000000, rate: 0.09 }
            ],
            'single': [
                { upperLimit: 1000000, rate: 0.05 },
                { upperLimit: 99000000, rate: 0.09 }
            ]
        },
        'mi': {
            'mfj': [
                { upperLimit: 100000000, rate: 0.0425 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0.0425 }
            ]
        },
        'mn': {
            'mfj': [
                { upperLimit: 43950, rate: 0.0535 },
                { upperLimit: 130660, rate: 0.068 },
                { upperLimit: 130360, rate: 0.0785 },
                { upperLimit: 100000000, rate: 0.0985 }
            ],
            'single': [
                { upperLimit: 30070, rate: 0.0535 },
                { upperLimit: 68690, rate: 0.068 },
                { upperLimit: 84580, rate: 0.0785 },
                { upperLimit: 100000000, rate: 0.0985 }
            ]
        },
        'ms': {
            'mfj': [
                { upperLimit: 100000000, rate: 0.05 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0.05 }
            ]
        },
        'mo': {
            'mfj': [
                { upperLimit: 1121, rate: 0.02 },
                { upperLimit: 1121, rate: 0.025 },
                { upperLimit: 1121, rate: 0.03 },
                { upperLimit: 1121, rate: 0.035 },
                { upperLimit: 1121, rate: 0.04 },
                { upperLimit: 1121, rate: 0.045 },
                { upperLimit: 100000000, rate: 0.0495 }
            ],
            'single': [
                { upperLimit: 1121, rate: 0.02 },
                { upperLimit: 1121, rate: 0.025 },
                { upperLimit: 1121, rate: 0.03 },
                { upperLimit: 1121, rate: 0.035 },
                { upperLimit: 1121, rate: 0.04 },
                { upperLimit: 1121, rate: 0.045 },
                { upperLimit: 100000000, rate: 0.0495 }
            ]
        },
        'mt': {
            'mfj': [
                { upperLimit: 3600, rate: 0.01 },
                { upperLimit: 2700, rate: 0.02 },
                { upperLimit: 3400, rate: 0.03 },
                { upperLimit: 3300, rate: 0.04 },
                { upperLimit: 3800, rate: 0.05 },
                { upperLimit: 4800, rate: 0.06 },
                { upperLimit: 100000000, rate: 0.0675 }
            ],
            'single': [
                { upperLimit: 3600, rate: 0.01 },
                { upperLimit: 2700, rate: 0.02 },
                { upperLimit: 3400, rate: 0.03 },
                { upperLimit: 3300, rate: 0.04 },
                { upperLimit: 3800, rate: 0.05 },
                { upperLimit: 4800, rate: 0.06 },
                { upperLimit: 100000000, rate: 0.0675 }
            ]
        },
        'ne': {
            'mfj': [
                { upperLimit: 7390, rate: 0.0246 },
                { upperLimit: 36960, rate: 0.0351 },
                { upperLimit: 27110, rate: 0.0501 },
                { upperLimit: 100000000, rate: 0.0664 }
            ],
            'single': [
                { upperLimit: 3700, rate: 0.0246 },
                { upperLimit: 18470, rate: 0.0351 },
                { upperLimit: 13560, rate: 0.0501 },
                { upperLimit: 100000000, rate: 0.0664 }
            ]
        },
        'nv': {
            'mfj': [
                { upperLimit: 100000000, rate: 0 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0 }
            ]
        },
        'nh': {
            'mfj': [
                { upperLimit: 100000000, rate: 0 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0 }
            ]
        },
        'nj': {
            'mfj': [
                { upperLimit: 20000, rate: 0.014 },
                { upperLimit: 30000, rate: 0.0175 },
                { upperLimit: 20000, rate: 0.0245 },
                { upperLimit: 10000, rate: 0.035 },
                { upperLimit: 70000, rate: 0.05525 },
                { upperLimit: 350000, rate: 0.0637 },
                { upperLimit: 100000000, rate: 0.0897 }
            ],
            'single': [
                { upperLimit: 20000, rate: 0.014 },
                { upperLimit: 15000, rate: 0.0175 },
                { upperLimit: 5000, rate: 0.035 },
                { upperLimit: 35000, rate: 0.05525 },
                { upperLimit: 425000, rate: 0.0637 },
                { upperLimit: 500000, rate: 0.0897 },
                { upperLimit: 99000000, rate: 0.1075 }
            ]
        },
        'nm': {
            'mfj': [
                { upperLimit: 8000, rate: 0.017 },
                { upperLimit: 8000, rate: 0.032 },
                { upperLimit: 8000, rate: 0.047 },
                { upperLimit: 291000, rate: 0.049 },
                { upperLimit: 100000000, rate: 0.059 }
            ],
            'single': [
                { upperLimit: 5500, rate: 0.017 },
                { upperLimit: 5500, rate: 0.032 },
                { upperLimit: 5000, rate: 0.047 },
                { upperLimit: 194000, rate: 0.049 },
                { upperLimit: 100000000, rate: 0.059 }
            ]
        },
        'ny': {
            'mfj': [
                { upperLimit: 17150, rate: 0.04 },
                { upperLimit: 6450, rate: 0.045 },
                { upperLimit: 4300, rate: 0.0525 },
                { upperLimit: 133650, rate: 0.055 },
                { upperLimit: 161650, rate: 0.06 },
                { upperLimit: 1832150, rate: 0.0685 },
                { upperLimit: 2844650, rate: 0.0965 },
                { upperLimit: 20000000, rate: 0.103 },
                { upperLimit: 75000000, rate: 0.109 }
            ],
            'single': [
                { upperLimit: 8500, rate: 0.04 },
                { upperLimit: 3200, rate: 0.045 },
                { upperLimit: 2200, rate: 0.0525 },
                { upperLimit: 66750, rate: 0.055 },
                { upperLimit: 134750, rate: 0.06 },
                { upperLimit: 862150, rate: 0.0685 },
                { upperLimit: 3922450, rate: 0.0965 },
                { upperLimit: 20000000, rate: 0.103 },
                { upperLimit: 75000000, rate: 0.109 }
            ]
        },
        'nc': {
            'mfj': [
                { upperLimit: 100000000, rate: 0.0475 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0.0475 }
            ]
        },
        'nd': {
            'mfj': [
                { upperLimit: 100000000, rate: 0.05 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0.05 }
            ]
        },
        'oh': {
            'mfj': [
                { upperLimit: 21750, rate: 0.02 },
                { upperLimit: 43500, rate: 0.03 },
                { upperLimit: 87350, rate: 0.04 },
                { upperLimit: 108700, rate: 0.047 },
                { upperLimit: 100000000, rate: 0.04997 }
            ],
            'single': [
                { upperLimit: 10850, rate: 0.02 },
                { upperLimit: 21750, rate: 0.03 },
                { upperLimit: 43500, rate: 0.04 },
                { upperLimit: 54350, rate: 0.047 },
                { upperLimit: 100000000, rate: 0.04997 }
            ]
        },
        'ok': {
            'mfj': [
                { upperLimit: 1000, rate: 0.005 },
                { upperLimit: 2000, rate: 0.01 },
                { upperLimit: 2500, rate: 0.02 },
                { upperLimit: 2750, rate: 0.03 },
                { upperLimit: 2500, rate: 0.04 },
                { upperLimit: 22500, rate: 0.05 },
                { upperLimit: 100000000, rate: 0.059 }
            ],
            'single': [
                { upperLimit: 1000, rate: 0.005 },
                { upperLimit: 2000, rate: 0.01 },
                { upperLimit: 2500, rate: 0.02 },
                { upperLimit: 2750, rate: 0.03 },
                { upperLimit: 2500, rate: 0.04 },
                { upperLimit: 11250, rate: 0.05 },
                { upperLimit: 100000000, rate: 0.059 }
            ]
        },
        'or': {
            'mfj': [
                { upperLimit: 3460, rate: 0.05 },
                { upperLimit: 5210, rate: 0.07 },
                { upperLimit: 100000000, rate: 0.09 }
            ],
            'single': [
                { upperLimit: 3460, rate: 0.05 },
                { upperLimit: 5210, rate: 0.07 },
                { upperLimit: 100000000, rate: 0.09 }
            ]
        },
        'pa': {
            'mfj': [
                { upperLimit: 100000000, rate: 0.0307 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0.0307 }
            ]
        },
        'ri': {
            'mfj': [
                { upperLimit: 65250, rate: 0.0375 },
                { upperLimit: 139400, rate: 0.0475 },
                { upperLimit: 100000000, rate: 0.0599 }
            ],
            'single': [
                { upperLimit: 33050, rate: 0.0375 },
                { upperLimit: 65900, rate: 0.0475 },
                { upperLimit: 100000000, rate: 0.0599 }
            ]
        },
        'sc': {
            'mfj': [
                { upperLimit: 3000, rate: 0 },
                { upperLimit: 6000, rate: 0.03 },
                { upperLimit: 9000, rate: 0.04 },
                { upperLimit: 12000, rate: 0.05 },
                { upperLimit: 15000, rate: 0.06 },
                { upperLimit: 100000000, rate: 0.07 }
            ],
            'single': [
                { upperLimit: 3000, rate: 0 },
                { upperLimit: 6000, rate: 0.03 },
                { upperLimit: 9000, rate: 0.04 },
                { upperLimit: 12000, rate: 0.05 },
                { upperLimit: 15000, rate: 0.06 },
                { upperLimit: 100000000, rate: 0.07 }
            ]
        },
        'sd': {
            'mfj': [
                { upperLimit: 100000000, rate: 0 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0 }
            ]
        },
        'tn': {
            'mfj': [
                { upperLimit: 1000000, rate: 0 },
                { upperLimit: 100000000, rate: 0.02 }
            ],
            'single': [
                { upperLimit: 1000000, rate: 0 },
                { upperLimit: 100000000, rate: 0.02 }
            ]
        },
        'tx': {
            'mfj': [
                { upperLimit: 100000000, rate: 0 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0 }
            ]
        },
        'ut': {
            'mfj': [
                { upperLimit: 100000000, rate: 0.05 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0.05 }
            ]
        },
        'vt': {
            'mfj': [
                { upperLimit: 38650, rate: 0.036 },
                { upperLimit: 95550, rate: 0.066 },
                { upperLimit: 100000000, rate: 0.076 }
            ],
            'single': [
                { upperLimit: 19450, rate: 0.036 },
                { upperLimit: 47550, rate: 0.066 },
                { upperLimit: 100000000, rate: 0.076 }
            ]
        },
        'va': {
            'mfj': [
                { upperLimit: 3000, rate: 0.02 },
                { upperLimit: 5000, rate: 0.03 },
                { upperLimit: 17000, rate: 0.05 },
                { upperLimit: 100000000, rate: 0.0575 }
            ],
            'single': [
                { upperLimit: 3000, rate: 0.02 },
                { upperLimit: 5000, rate: 0.03 },
                { upperLimit: 17000, rate: 0.05 },
                { upperLimit: 100000000, rate: 0.0575 }
            ]
        },
        'wa': {
            'mfj': [
                { upperLimit: 100000000, rate: 0.00 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0.00 }
            ]
        },
        'wv': {
            'mfj': [
                { upperLimit: 10000, rate: 0.03 },
                { upperLimit: 15000, rate: 0.04 },
                { upperLimit: 25000, rate: 0.045 },
                { upperLimit: 35000, rate: 0.06 },
                { upperLimit: 100000000, rate: 0.065 }
            ],
            'single': [
                { upperLimit: 10000, rate: 0.03 },
                { upperLimit: 15000, rate: 0.04 },
                { upperLimit: 25000, rate: 0.045 },
                { upperLimit: 35000, rate: 0.06 },
                { upperLimit: 100000000, rate: 0.065 }
            ]
        },
        'wi': {
            'mfj': [
                { upperLimit: 14830, rate: 0.04 },
                { upperLimit: 29650, rate: 0.0584 },
                { upperLimit: 100000000, rate: 0.0627 }
            ],
            'single': [
                { upperLimit: 11790, rate: 0.04 },
                { upperLimit: 23590, rate: 0.0584 },
                { upperLimit: 100000000, rate: 0.0627 }
            ]
        },
        'wy': {
            'mfj': [
                { upperLimit: 100000000, rate: 0.00 }
            ],
            'single': [
                { upperLimit: 100000000, rate: 0.00 }
            ]
        }
            // Add data for other states here
    };

    // Calculate state tax
    let stateTax = 0;
    if (progressiveTaxData.hasOwnProperty(state.toLowerCase())) {
        const stateData = progressiveTaxData[state.toLowerCase()];
        const filingData = stateData[filingStatus.toLowerCase()]; // Retrieve tax brackets based on filing status
        if (filingData) {
            let remainingIncome = income;
            for (const bracket of filingData) {
                const taxableIncomeInBracket = Math.min(remainingIncome, bracket.upperLimit);
                stateTax += taxableIncomeInBracket * bracket.rate;
                remainingIncome -= taxableIncomeInBracket;

                if (remainingIncome <= 0) {
                    break; // Stop calculation if all income has been taxed
                }
            }
        } else {
            console.error(`No tax data found for filing status '${filingStatus}' in state '${state}'.`);
        }
    } else {
        console.error(`No tax data found for state '${state}'.`);
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
        <p>State tax: ${formattedStateTax}</p>
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
