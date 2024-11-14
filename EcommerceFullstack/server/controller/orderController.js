const { default: axios } = require("axios")
const Order = require("../model/orderModel")
const User = require("../model/userModel")
const mongoose = require('mongoose');
const Product = require("../model/productModel");

exports.getProductCategorywise = async (req, res) => {
    try {
        const { category } = req.params
        const products = await Product.find({ category })
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ message: 'Some Error Occured' })
    }
}

exports.getSearchProduct = async (req, res) => {
    try {
        // const products = await Product.aggregate([
        //     { $match: { name: req.params.query } }
        // ])

        const products = await Product.find()
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(req.params.query.toLowerCase()))


        return res.status(200).json(filteredProducts)


    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'Some Error Occured' })

    }
}


exports.getProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const product = await Product.find({ _id: productId })
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ message: 'Some Error Occured' })
    }
}

exports.getAllProduct = async (req, res) => {
    try {
        const products = await Product.find()
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ message: 'Some Error Occured' })
    }
}


exports.postAddToCart = async (req, res) => {
    try {
        const { productId, type } = req.body


        const existingCart = [...req.user.cart]
        const existIndex = existingCart.findIndex(cart => cart.productId.toString() === productId)

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
            const product = await Product.findOne({ _id: productId })
            // const product = await axios.get(`https://fakestoreapi.com/products/${productId}`)
            await req.user.updateOne({
                cart: [...req.user.cart, {
                    // productName: product.name,
                    productId: product._id,
                    // productMrp: product.mrp,
                    // productPrice: product.price,
                    // productImage: product.images[0],
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
        const carts = req.user.cart

        Promise.all(carts.map(async cart => {
            const product = await Product.findOne({ _id: cart.productId }, { description: 0, stock: 0 })
            return {
                product: product,
                quantity: cart.quantity
            }
        }))
            .then((cart) => {
                return res.status(200).json(cart)
            })
            .catch(err => {
                throw new Error
            })
    } catch (error) {
        return res.status(500).json({ message: 'Some Error Occured' })
    }
}

exports.postOrders = async (req, res) => {


    try {

        const carts = req.user.cart

        Promise.all(carts.map(async cart => {
            const product = await Product.findOne({ _id: cart.productId }, { description: 0, stock: 0 })
            
            return {
                product: product,
                quantity: cart.quantity
            }
        }))
            .then(async (response) => {

                const sellers = []

                const total = response.reduce((acc, item) => acc += (+item.product.price * +item.quantity), 0)
                const products = response.map(data => {

                    if (!sellers.includes(data.product.sellerId.toString())) sellers.push(data.product.sellerId.toString())

                    return {
                        name: data.product.name,
                        mrp: data.product.mrp,
                        price: data.product.price,
                        productImage: data.product.images[0],
                        quantity: data.quantity,
                        productId: data.product._id,
                    }
                })

                const orders = new Order({
                    products,
                    total: total,
                    uid: req.user._id,
                    sellers: [...sellers]
                })

                await orders.save()
                await User.updateOne({
                    _id: req.user._id
                }, {
                    $set: {
                        cart: []
                    }
                })


                // Promise.all(sellers.map(async seller=> ))
                return res.status(200).json({ message: 'Order Placed Successfully' })
            })
            .catch(err => {
                console.log(err.message)
                throw new Error
            })



        // const total = req.user.cart.reduce((acc, item) => acc += (+item.productPrice * +item.quantity), 0)
        // const orders = new Order({
        //     products: [...req.user.cart],
        //     total: total,
        //     uid: req.user._id
        // })
        // await orders.save()

        // await req.user.updateOne({
        //     ...req.user,
        //     cart: []
        // })

        // await User.updateOne({
        //     _id: req.user._id
        // }, {
        //     $set: {
        //         cart: []
        //     }
        // })
        // return res.status(200).json({ message: 'Order Placed Successfully' })
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

        const existIndex = existingCart.findIndex(cart => cart.productId.toString() === productId)


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