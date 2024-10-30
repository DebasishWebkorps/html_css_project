const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')
const verifyToken = require('../middleware/verifyToken')

router.post('/signup', userController.postSignup)
router.post('/login', userController.postLogin)
router.get('/isValidToken', verifyToken, userController.getTokenVerify)




module.exports = router


