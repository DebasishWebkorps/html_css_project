const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        allowNull: false,
        unique: true
    },
    password: {
        type: String,
        allowNull: false
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;

