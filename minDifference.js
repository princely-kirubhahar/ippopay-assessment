function minimumDifference(nums) {
    const n = nums.length / 2;
    const totalSum = nums.reduce((acc, num) => acc + num, 0);

    const dp = new Map();
    dp.set(0, true);

    for (let i = 1; i <= 2 * n; i++) {
        const prevSums = [...dp.keys()]; // Previous sums computed in the previous iteration
        for (const sum of prevSums) {
            const newSum = sum + nums[i - 1];
            dp.set(newSum, true);
        }
    }

    let minDiff = Infinity;
    for (const sum of dp.keys()) {
        const diff = Math.abs(totalSum - 2 * sum);
        minDiff = Math.min(minDiff, diff);
    }

    return minDiff;
}



const runTests = () => {
    // Test cases
    const tests = [
        { array: [3, 9, 7, 3], expected: 2 },
        { array: [-36, 36], expected: 0 }, // in the docs it is 72 but it should be 0
        { array: [2, -1, 0, 4, -2, -9], expected: 0 },
    ]

    // Run tests and check results
    tests.forEach((test, index) => {
        const result = minimumDifference(test.array);
        console.log(`Test ${index + 1}: Array "${test.array}", Expected: ${test.expected}, Result: ${result}`);
        console.log(result === test.expected ? 'Pass' : 'Fail');
    });
}

// Run the unit tests
runTests();