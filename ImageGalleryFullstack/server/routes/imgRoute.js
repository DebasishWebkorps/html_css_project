const express = require('express');
const multerMiddleware = require('../middleware/multerMiddleware');
const cloudinaryUpload = require('../middleware/cloudinaryUpload');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router()
const imgController = require('../controller/imageController')


router.post('/upload', verifyToken, multerMiddleware, cloudinaryUpload)
router.get('/all',verifyToken, imgController.getAllImages)
router.get('/myimage',verifyToken, imgController.getMyImages)
router.get('/likedimage',verifyToken, imgController.getLikedImages)
router.put('/like',verifyToken, imgController.putLike)
router.delete('/delete/:imgId',verifyToken,imgController.deleteImage)


module.exports = router;