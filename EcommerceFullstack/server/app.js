const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')


const userRoute = require('./routes/userRoute')
const orderRoute = require('./routes/orderRoute')

dotenv.config()

const app = express()
app.use(cors())

app.use(express.json())



app.use('/auth', userRoute)
app.use('/product', orderRoute)



mongoose.connect(process.env.mongo_url)
    .then(result => {
        app.listen(3000, () => {
            console.log('server started')
        })
    })
    .catch(err => {
        console.log(err.message)
    })
