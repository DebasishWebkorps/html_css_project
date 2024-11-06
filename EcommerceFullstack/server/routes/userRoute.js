const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')

router.post('/login', userController.postLogin)
router.post('/signup', userController.postSignup)
router.post('/verifytoken', userController.postVerifyToken)


module.exports = router