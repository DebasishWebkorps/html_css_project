const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')


const userRoute = require('./routes/userRoute')
const orderRoute = require('./routes/orderRoute')
const adminRoute = require('./routes/adminRoute')

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())



app.use('/auth', userRoute)
app.use('/product', orderRoute)
app.use('/admin', adminRoute)



mongoose.connect(process.env.mongo_url)
    .then(result => {
        app.listen(3000, () => {
            console.log('server started')
        })
    })
    .catch(err => {
        console.log(err.message)
    })
