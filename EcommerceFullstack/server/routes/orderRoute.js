const router = require('express').Router()

const orderController = require('../controller/orderController')
const verifyToken = require('../utils/verifyToken')

router.post('/addtocart', verifyToken, orderController.postAddToCart)
router.post('/removecart', verifyToken, orderController.postRemoveFromCart)
router.get('/cart', verifyToken, orderController.getCart)
router.post('/order', verifyToken, orderController.postOrders)
router.get('/order', verifyToken, orderController.getOrders)
router.get('/search/:query', orderController.getSearchProduct)

router.get('/category/:category', orderController.getProductCategorywise)
router.get('/:productId', orderController.getProduct)
router.get('/', orderController.getAllProduct)
// router.get('/', verifyToken, orderController.getAllProduct)

module.exports = router