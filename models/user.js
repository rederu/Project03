const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        minlength: 3
    },
    lastname: {
        type: String,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        trim: true,
        minlength: 5
    },
    date: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;