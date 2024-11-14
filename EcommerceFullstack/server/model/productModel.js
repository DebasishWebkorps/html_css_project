const mongoose = require('mongoose')

const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    images: {
        type: [String]
    },
    stock: {
        type: Number
    },
    sellerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;