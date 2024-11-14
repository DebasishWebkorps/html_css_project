const router = require('express').Router()

const adminController = require('../controller/adminController');
const imagesUpload = require('../utils/imagesUpload');
const verifyToken = require('../utils/verifyToken');

const multer = require('multer')
const uploads = multer({ dest: 'uploads/' })


router.post('/addproduct', verifyToken, imagesUpload, adminController.postAddOrder)
router.put('/addproduct', verifyToken, adminController.putUpdateProduct)
router.put('/status', adminController.putStatusUpdate)
router.get('/products', verifyToken, adminController.getProducts)
router.get('/dashboard', verifyToken, adminController.getDashboard)
router.get('/orders', verifyToken, adminController.getOrders)


module.exports = router;