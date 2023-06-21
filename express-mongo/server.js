const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const { default: Password } = require('./model/password.model');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3001;

// MongoDB connection
mongoose.connect('mongodb://localhost/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a sample route
app.get('/', (req, res) => {
    res.send('Hello, Express with MongoDB!');
});

app.post('/password/checker', (req, res) => {
    try {
        const { password } = req.body;
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
        let stepsToMakePwdStrong;
        // Checking the length of the password and returning the 
        if (n < 6) {
            stepsToMakePwdStrong = Math.max(6 - n, missingPwdChecks);
        } else if (n <= 20) {
            stepsToMakePwdStrong = Math.max(repeatingChar, missingPwdChecks);
        } else {
            stepsToMakePwdStrong = Math.max(repeatingChar, missingPwdChecks, n - 20);
        }

        const newPassword = new Password({ password, stepsToMakePwdStrong });
        newPassword.save((err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error saving password' });
            }
        });
        res.json({ stepsToMakePwdStrong, message: 'Password saved successfully' });
    } catch (e) { console.log("Something went wrong", e) }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
