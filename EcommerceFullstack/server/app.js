const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')


const userRoute = require('./routes/userRoute')

const app = express()
app.use(cors())

app.use(express.json())

dotenv.config()


app.use('/auth', userRoute)



mongoose.connect(process.env.mongo_url)
    .then(result => {
        app.listen(3000, () => {
            console.log('server started')
        })
    })
    .catch(err => {
        console.log(err.message)
    })
