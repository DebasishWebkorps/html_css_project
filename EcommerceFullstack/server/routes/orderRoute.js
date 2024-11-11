const router = require('express').Router()

const orderController = require('../controller/orderController')
const verifyToken = require('../utils/verifyToken')

router.post('/addtocart', verifyToken, orderController.postAddToCart)
router.post('/removecart', verifyToken, orderController.postRemoveFromCart)
router.get('/cart', verifyToken, orderController.getCart)
router.post('/order', verifyToken, orderController.postOrders)
router.get('/order', verifyToken, orderController.getOrders)

module.exports = router