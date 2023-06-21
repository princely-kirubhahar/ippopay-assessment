const { Schema, model } = require('mongoose');

const passwordSchema = new Schema({
    password: {
        type: String,
        required: true,
    },
    stepsToMakePwdStrong: {
        type: Number,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

const Password = model('Password', passwordSchema);

module.exports = Password;
