const { default: axios } = require("axios")
const Order = require("../model/orderModel")
const User = require("../model/userModel")

exports.postAddToCart = async (req, res) => {
    try {
        const { productId } = req.body


        const existingCart = [...req.user.cart]
        const existIndex = existingCart.findIndex(cart => cart.productId === +productId)


        if (existIndex >= 0) {
            existingCart[existIndex] = { ...existingCart[existIndex].toObject(), quantity: +existingCart[existIndex].quantity + 1 }
            await req.user.updateOne({
                cart: existingCart
            })
        } else {
            const product = await axios.get(`https://fakestoreapi.com/products/${productId}`)
            await req.user.updateOne({
                cart: [...req.user.cart, {
                    productName: product.data.title,
                    productId: product.data.id,
                    productPrice: product.data.price,
                    productImage: product.data.image,
                    quantity: 1
                }]
            })
        }

        return res.status(201).json({ message: 'Product Added to cart Successfully' })


    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'Some Error Occured' })
    }
}

exports.getCart = async (req, res) => {
    try {
        return res.status(200).json({ cart: req.user.cart })
    } catch (error) {
        return res.status(500).json({ message: 'Some Error Occured' })
    }
}

exports.postOrders = async (req, res) => {
    try {
        const total = req.user.cart.reduce((acc, item) => acc += (+item.productPrice * +item.quantity), 0)
        const orders = new Order({
            products: [...req.user.cart],
            total: total,
            uid: req.user._id
        })
        await orders.save()
        await req.user.updateOne({
            ...req.user,
            cart: []
        })
        return res.status(200).json({ message: 'Order Placed Successfully' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'Some Error Occured' })
    }
}

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ uid: req.user._id })
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({ message: 'Some Error Occured' })
    }
}

