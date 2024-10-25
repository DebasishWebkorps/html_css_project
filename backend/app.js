const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const fs = require('fs')

const Formdata = require('./formSchema')
const User = require('./userSchema')

const jwt = require('jsonwebtoken')
const path = require('path')


const app = express()

app.use(cors())

app.use(express.json())

dotenv.config()

app.get('/isvalid', async (req, res) => {
    try {
        const { userinfo } = req.headers

        jwt.verify(userinfo, process.env.secret_password, async function (err, decoded) {
            if (err) {
                return res.status(404).json({ message: 'Invalid Token' })
            } else {

                return res.status(200).json({ message: 'Valid Token' })

            }
        })
    } catch (err) {
        console.log(err.message, 'get /isvalid')
        return res.status(404).json({ message: 'Some Error Occured' })

    }
})

app.get('/', async (req, res) => {
    try {

        const { userinfo } = req.headers

        jwt.verify(userinfo, process.env.secret_password, async function (err, decoded) {
            if (err) {
                return res.status(404).json({ message: 'Invalid Token' })
            } else {

                const user = await User.findById(decoded.uid)
                if (!user) {
                    return res.status(404).json({ message: 'No Such User' })
                }

                const response = await Formdata.find({
                    uid: user._id
                })


                return res.json(response)
            }
        })
    } catch (err) {
        console.log(err.message, 'get /')
        return res.status(404).json({ message: 'Some Error Occured' })

    }
})


app.get('/download', async (req, res) => {
    try {


        const { userinfo } = req.headers
        jwt.verify(userinfo, process.env.secret_password, async function (err, decoded) {
            if (err) {
                return res.status(404).json({ message: 'Invalid Token' })
            } else {

                const user = await User.findById(decoded.uid)
                if (!user) {
                    return res.status(404).json({ message: 'No Such User' })
                }

                const response = await Formdata.find({
                    uid: user._id
                })

                if (response.length < 1) return res.json({ message: 'No data' })


                const content = []

                const heading = Object.keys(response[0].toObject()) 
                const requiredHeading = heading.slice(1, heading.length - 2)
                content.push(requiredHeading.join(','))

                response.forEach(data => {
                    const row = data.toObject()
                    const values = Object.values(row)
                    const requiredValue = values.slice(1, values.length - 2)
                    const allValue = requiredValue.join(',')
                    content.push(allValue)
                })

                const finalModifiedContent = content.join('\n')
               

                fs.writeFile('data.csv', finalModifiedContent, (err, data) => {
                    if (err) throw err

                    const filePath = path.join(__dirname, 'data.csv')
                    // console.log(filePath)


                    return res.download(filePath, 'data.csv', (err) => {
                        if (err) {
                            console.error(err);
                        }
                        fs.unlink(filePath, (err) => {
                            if (err) console.error('Failed to delete file:', err);
                        });
                    });
                })


            }
        })
    } catch (err) {
        console.log(err.message, 'get /')
        return res.status(404).json({ message: 'Some Error Occured' })

    }
})

// app.get('/user', async (req, res) => {


//     const user = await Formdata.find({
//         Email: "jds@gmail.com"
//     })

//     // const data = await user.json()
//     res.json(user)
// })

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'No Such User Found' })
        }
        if (user.password !== password) {
            return res.status(500).json({ message: 'Invalid Credentials' })
        }
        const secret_password = process.env.secret_password
        const token = jwt.sign({ uid: user._id }, secret_password, { expiresIn: '5m' })

        return res.status(200).json({ message: 'Successfully Login', token })
    } catch (err) {
        console.log(err.message, 'Post Login')
        return res.json({ message: 'Some Error Occured' })
    }
})

app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body
        const isExist = User.findOne({ email })
        if (isExist) {
            return res.status(404).json({ message: 'Existing User' })
        }
        const user = new User({
            email,
            password
        })
        const userCred = await user.save()
        return res.status(201).json({ message: 'User Created Successfully', userCred })
    } catch (err) {
        console.log(err.message, 'post signup')
        return res.status(500).json({ message: 'Some Error Occured' })
    }
})



app.delete('/', async (req, res) => {
    const { formid } = req.headers
    try {
        await Formdata.deleteOne({ _id: new mongoose.Types.ObjectId(formid) })
        return res.status(200).json({ message: 'Deleted Successfully' })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: 'Some Error Occured' })
    }
})

app.put('/', async (req, res) => {
    const { usertoken } = req.headers

    jwt.verify(usertoken, process.env.secret_password, async function (err, decoded) {
        if (err) {
            return res.status(404).json({ message: 'Invalid Token' })
        } else {


            const user = await User.findById(decoded.uid)
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
                pincode } = req.body.formObj

            const { uid } = req.body

            try {
                const formData = await Formdata.updateOne({ _id: new mongoose.Types.ObjectId(uid) }, {
                    Fullname,
                    Email,
                    Password,
                    PhoneNo,
                    Gender,
                    Language,
                    Profession,
                    city,
                    country,
                    pincode
                })

                const updatedData = await Formdata.findOne({ _id: new mongoose.Types.ObjectId(uid) })
                return res.status(201).json({ message: 'Data Updated Successfully', updatedData })
            }


            catch (err) {
                console.log(err.message, 'put /')
                return res.status(500).json({ message: 'Some Error Occured' })
            }
        }
    })
})





app.post('/', async (req, res) => {
    try {
        const { usertoken } = req.headers

        jwt.verify(usertoken, process.env.secret_password, async function (err, decoded) {
            if (err) {
                return res.status(404).json({ message: 'Invalid Token' })
            } else {

                const user = await User.findById(decoded.uid)
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

                // try {
                const formData = await form.save()
                res.status(201).json({ message: 'Data Saved Successfully', formData })
            }
        })
    } catch (err) {
        console.log(err.message, 'post /')
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


