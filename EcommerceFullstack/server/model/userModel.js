const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    cart: [{
        // productName: String,
        productId: mongoose.Types.ObjectId,
        // productMrp: Number,
        // productPrice: Number,
        // productImage: String,
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    Orders:[{
        type: mongoose.Types.ObjectId,
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;

