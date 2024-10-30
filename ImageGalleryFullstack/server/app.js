const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const User = require('./models/user')
const Images = require('./models/images')


const userRoutes = require('./routes/userRoute')
const imgRoutes = require('./routes/imgRoute')

const mongoose = require('mongoose')


const app = express()

dotenv.config();

app.use(cors())
app.use(express.json())


app.use('/auth', userRoutes)
app.use('/image', imgRoutes)



mongoose.connect(process.env.mongo_url)
    .then(result => {
        app.listen(3000, () => {
            console.log('server started')
        })
    })
    .catch(err => {
        console.log(err.message)
    })

