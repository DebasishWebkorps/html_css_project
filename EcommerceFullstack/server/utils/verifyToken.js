const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const verifyToken = async (req, res, next) => {
    try {
        const { usertoken } = req.headers
        const isValidToken = jwt.verify(usertoken, process.env.secret_password)
        if (!isValidToken) throw new Error
        const user = await User.findById(isValidToken.id)
        if (!user) throw new Error
        req.user = user
        next()
    } catch (error) {
        return res.status(404).json({ message: 'Not Authorized' })
    }
}

module.exports = verifyToken