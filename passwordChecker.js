const pwdChecker = (password) => {
    const n = password.length;
    // Regular exp to check if the pwd has upper lower and a numeric value.
    const upperCaseRegex = /^(?=.*[A-Z]).*$/;
    const lowerCaseRegex = /^(?=.*[a-z]).*$/;
    const numRegex = /^(?=.*\d).*$/;

    let repeatingChar = 0;
    let missingPwdChecks = 3; // Value is set to 3 as one for upper one for lower and one for numeral

    // Checking for the condition
    if (password.match(upperCaseRegex))
        missingPwdChecks--;
    if (password.match(lowerCaseRegex))
        missingPwdChecks--;
    if (password.match(numRegex))
        missingPwdChecks--;
    // Checking for the repeating strings
    let count = 1;
    for (let i = 1; i < n; i++) {
        if (password[i] === password[i - 1]) {
            count++;
        } else {
            repeatingChar += Math.floor(count / 3);
            count = 1;
        }
    }
    // Checking the length of the password and returning the 
    if (n < 6) {
        return Math.max(6 - n, missingPwdChecks);
    } else if (n <= 20) {
        return Math.max(repeatingChar, missingPwdChecks);
    } else {
        return Math.max(repeatingChar, missingPwdChecks, n - 20);
    }
};

const runTests = () => {
    // Test cases
    const tests = [
        { password: 'a', expected: 5 },
        { password: 'aA1', expected: 3 },
        { password: '1337C0d3', expected: 0 },
        { password: 'aaaaaabbbbb23B', expected: 3 },
        { password: 'aaabbb0123456789abcdef', expected: 2 },
        { password: 'aaabbb0123456789abcdefg', expected: 3 },
        { password: 'aaabbb0123456789abcde', expected: 2 },
    ];

    // Run tests and check results
    tests.forEach((test, index) => {
        const result = pwdChecker(test.password);
        console.log(`Test ${index + 1}: Password "${test.password}", Expected: ${test.expected}, Result: ${result}`);
        console.log(result === test.expected ? 'Pass' : 'Fail');
    });
}

// Run the unit tests
runTests();
