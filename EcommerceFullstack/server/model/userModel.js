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
    },
    cart: [{
        productName: String,
        productId: Number,
        productPrice: Number,
        productImage: String,
        quantity: {
            type: Number,
            allowNull: false,
            default: 1
        }
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;

