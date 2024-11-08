const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    products: [{
        productName: String,
        productId: Number,
        productPrice: Number,
        productImage: String,
        quantity: Number
    }],
    total: Number,
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order;