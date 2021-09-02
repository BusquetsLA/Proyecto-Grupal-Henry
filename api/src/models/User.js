const mongoose = require('mongoose'); 

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        userType: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
            required: true
        },
    },
    { timestamp: true }
)

const User = mongoose.model('User', userSchema);

export default User;
