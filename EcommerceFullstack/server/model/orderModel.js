const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    products: [{
        id: String,
        quantity: Number
    }],
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order;