const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        // country: {
        //     type: String,
        //     required: true,
        // },
        // phone: {
        //     type: String,
        //     required: true,
        // },
        // address: {
        //     type: String,
        //     required: true,
        // },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        }
    },
    { timestamp: true }
)

const User = mongoose.model('User', userSchema);

module.exports = User;
