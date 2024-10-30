const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        const { usertoken } = req.headers
        const isValidToken = jwt.verify(usertoken, process.env.secret_password)
        req.userId = isValidToken.id
        next()
    } catch (error) {
        return res.status(404).json({ message: 'Not Authorized' })
    }
}

module.exports = verifyToken;