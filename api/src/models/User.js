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
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'review'
        }]
    },
    { timestamp: true }
)

const User = mongoose.model('User', userSchema);

module.exports = User;
