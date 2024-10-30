const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        allowNull: false,
        unique: true
    },
    password: {
        type: String,
        allowNull: false
    },
    role: {
        type: String,
        allowNull: false
    },
    likes: []
})


const User = mongoose.model('User', userSchema);

module.exports = User;

