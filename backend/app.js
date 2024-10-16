const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const Formdata = require('./formSchema')
const User = require('./userSchema')

const app = express()

app.use(cors())

app.use(express.json())

dotenv.config()

app.get('/', async (req, res) => {

    const { userinfo } = req.headers
    const user = await User.findOne({ email: userinfo })
    if (!user) {
        return res.status(404).json({ message: 'No Such User' })
    }

    const response = await Formdata.find({
        uid: user._id
    })

    res.json(response)
})

// app.get('/user', async (req, res) => {


//     const user = await Formdata.find({
//         Email: "jds@gmail.com"
//     })

//     // const data = await user.json()
//     res.json(user)
// })

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: 'No User Found' })
    }
    if (user.password !== password) {
        return res.status(500).json({ message: 'Invalid Credentials' })
    }
    return res.status(200).json({ message: 'Successfully Login' })
})

app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const user = new User({
        email,
        password
    })
    try {
        const userCred = await user.save()
        return res.status(201).json({ message: 'User Created Successfully', userCred })
    } catch (err) {
        return res.status(500).json({ message: 'Some Error Occured' })
    }
})


app.post('/', async (req, res) => {
    const { userinfo } = req.headers
    const user = await User.findOne({ email: userinfo })
    if (!user) {
        return res.status(404).json({ message: 'No Such User' })
    }

    const { Fullname,
        Email,
        Password,
        PhoneNo,
        Gender,
        Language,
        Profession,
        city,
        country,
        pincode } = req.body

    const form = new Formdata({
        Fullname,
        Email,
        Password,
        PhoneNo: parseInt(PhoneNo),
        Gender,
        Language,
        Profession,
        city,
        country,
        pincode: parseInt(pincode),
        uid: user._id
    })

    try {
        const formData = await form.save()
        res.status(201).json({ message: 'Data Saved Successfully', formData })
    } catch (err) {
        res.status(500).json({ message: 'Some Error Occured' })
    }
})



mongoose.connect(process.env.mongo_url)
    .then(() => {
        app.listen(3000, () => {
            console.log('server started')
        })
    })
    .catch(err => {
        console.log('Some Error occured')
    })


