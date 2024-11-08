const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')
const verifyToken = require('../utils/verifyToken')

router.post('/login', userController.postLogin)
router.post('/signup', userController.postSignup)
router.post('/verifytoken', verifyToken, userController.postVerifyToken)


module.exports = router