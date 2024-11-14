const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    products: [{
        name: String,
        mrp: Number,
        price: Number,
        productImage: String,
        quantity: Number,
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        }
    }],
    total: Number,
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: 'string',
        default: 'pending'
    },
    sellers:[{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }]
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order;