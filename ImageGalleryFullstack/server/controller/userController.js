const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.postSignup = async (req, res) => {
    try {
        const { email, password, role } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(500).json({ message: 'User Already Existed' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            email,
            password: hashedPassword,
            role
        })

        await user.save()

        return res.status(201).json({ message: 'User Created Successfully' })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'Some Error Occured' })
    }

}


exports.postLogin = async (req, res) => {
    try {
        const { email, password, role } = req.body

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(404).json({ message: 'User doesn"t exist' })
        }

        const isAuthenticated = await bcrypt.compare(password, existingUser.password)


        if (!isAuthenticated || existingUser.role !== role) {

            return res.status(400).json({ message: 'Incorrect Credentials' })
        }

        const token = await jwt.sign({ id: existingUser._id }, process.env.secret_password)

        return res.status(201).json({ message: 'Login Successfully', token })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'Some Error Occured' })
    }
}


exports.getTokenVerify = async (req, res) => {
    if (req.userId) {
        const user = await User.findById(req.userId, { password: 0 })
        return res.status(200).json({ message: 'Token Verified Successfully', user })
    } else {
        return res.status(500).json({ message: 'Some Error Occured' })
    }
}


