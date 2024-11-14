const Order = require("../model/orderModel")
const Product = require("../model/productModel")

exports.getDashboard = async (req, res) => {

    try {
        const orders = await Order.countDocuments({
            sellers: {
                $in: req.user._id
            }
        })

        const products = await Product.countDocuments({
            sellerId: req.user._id
        })

        Promise.all([orders, products])
            .then(result => {
                return res.status(200).json({ orders: result[0], products: result[1] })
            })
            .catch(err => {
                throw new Error
            })
    } catch (error) {
        return res.status(500).json({ message: 'Some Error Occured' })
    }


}

exports.putStatusUpdate = async (req, res) => {
    const { orderid, status } = req.headers

    try {

        const result = await Order.updateOne(
            { _id: orderid },
            {
                $set: {
                    status: status
                }
            }
        );

        return res.status(200).json({ message: 'Product updated successfully' })
    } catch (err) {
        return res.status(500).json({ message: 'Some Error Occured' })
    }
}




exports.putUpdateProduct = async (req, res) => {

    const { name, mrp, price, description, stock, category, productId } = req.body

    try {

        const result = await Product.updateOne(
            { _id: productId },
            {
                $set: {
                    name: name,
                    mrp: mrp,
                    price: price,
                    description: description,
                    stock: stock,
                    category: category
                }
            }
        );

        return res.status(200).json({ message: 'Product updated successfully' })
    } catch (err) {
        return res.status(500).json({ message: 'Some Error Occured' })
    }
}



exports.postAddOrder = async (req, res) => {

    const { name, mrp, price, description, stock, category } = req.body

    try {
        const product = new Product({
            name,
            mrp,
            price,
            description,
            images: [...req.imagestosave],
            stock,
            category,
            sellerId: req.user._id
        })

        await product.save()

        return res.status(200).json({ message: 'Product created successfully' })
    } catch (err) {
        return res.status(500).json({ message: 'Some Error Occured' })
    }
}



exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({ sellerId: req.user._id })
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ message: 'Some Error Occured' })
    }
}

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            sellers: {
                $in: req.user._id
            }
        })
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({ message: 'Some Error Occured' })
    }
}