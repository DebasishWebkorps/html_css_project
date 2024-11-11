const { default: axios } = require("axios")
const Order = require("../model/orderModel")
const User = require("../model/userModel")
const mongoose = require('mongoose');


exports.postAddToCart = async (req, res) => {
    try {
        const { productId, type } = req.body


        const existingCart = [...req.user.cart]
        const existIndex = existingCart.findIndex(cart => cart.productId === +productId)

        if (type === 'decrease' && existIndex < 0) {
            throw new Error
        }


        if (existIndex >= 0) {
            if (type === 'increase') {
                existingCart[existIndex] = { ...existingCart[existIndex].toObject(), quantity: +existingCart[existIndex].quantity + 1 }
            }
            if (type === 'decrease') {
                if (+existingCart[existIndex].quantity - 1 <= 0) {
                    existingCart.splice(existIndex, 1)
                } else {
                    existingCart[existIndex] = { ...existingCart[existIndex].toObject(), quantity: +existingCart[existIndex].quantity - 1 }
                }
            }
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
        // await req.user.updateOne({
        //     ...req.user,
        //     cart: []
        // })

        await User.updateOne({
            _id: req.user._id
        }, {
            $set: {
                cart: []
            }
        })
        return res.status(200).json({ message: 'Order Placed Successfully' })
    } catch (error) {
        console.log('error', error.message)
        return res.status(500).json({ message: 'Some Error Occured' })
    }


    // const session = await mongoose.startSession();
    // try {

    //     session.startTransaction();

    //     const total = req.user.cart.reduce((acc, item) => acc += (+item.productPrice * +item.quantity), 0)
    //     const orders = new Order({
    //         products: [...req.user.cart],
    //         total: total,
    //         uid: req.user._id
    //     })

    //     // await orders.save({ session });
    //     console.log('order success', req.user._id)

    //     // const upd = await req.user.updateOne(
    //     // const upd = await req.user.updateOne(
    //     //     { _id: req.user._id },
    //     //     { $set: { cart: [{}] } },
    //     //     { session }
    //     // );

    //     const upd = await req.user.updateOne(
    //         {
    //             ...req.user,
    //             cart: []
    //         },
    //         // { session }
    //     );

    //     console.log('update success', upd)

    //     if (!upd.modifiedCount) throw new Error

    //     await session.commitTransaction();

    //     session.endSession();

    //     res.status(200).json({ message: 'Order placed successfully' });

    // } catch (error) {
    //     if (session.inTransaction()) {
    //         await session.abortTransaction();
    //         session.endSession();
    //     }

    //     console.error('Transaction failed:', error.message);
    //     res.status(500).json({ message: 'Some Error Occured' });
    // }

}

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ uid: req.user._id }).sort({ _id: -1 })
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({ message: 'Some Error Occured' })
    }
}


exports.postRemoveFromCart = async (req, res) => {
    try {
        const { productId } = req.body


        const existingCart = [...req.user.cart]
        const existIndex = existingCart.findIndex(cart => cart.productId === +productId)


        if (existIndex >= 0) {
            existingCart.splice(existIndex, 1)
            await req.user.updateOne({
                cart: existingCart
            })
        } else {
            throw new Error
        }

        return res.status(201).json({ message: 'Product Removed From cart Successfully' })


    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'Some Error Occured' })
    }
}