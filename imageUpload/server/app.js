const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()
const cloudinary = require('cloudinary')
const fs = require('fs')

const Image = require('./models/Image')

const multer = require('multer')
const path = require('path')
const upload = multer({ dest: 'uploads/' })


// app.use(express.urlencoded({ extended: false }));

app.use(express.json())

dotenv.config()
app.use(cors())

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

app.post('/upload', async (req, res) => {

        const { image } = req.body
        try {
            const result = await cloudinary.uploader.upload(image);
            const img = new Image({
                url: result.url
            })


            await img.save()
            return res.status(201).json({ imageUrl: result.secure_url });


        } catch (error) {
            console.log(error.message)
        }

    })


// app.post('/upload', upload.single('filetoupload'), async (req, res) => {
//     // const { name } = req.body
//     try {
//         const result = await cloudinary.uploader.upload(req.file.path);

//         const image = new Image({
//             url: result.url
//         })

//         // console.log(result)

//         await image.save()
//         fs.unlink(req.file.path, (err) => {
//             if (err) {
//                 console.error(`Error removing file: ${err}`);
//             }
//         })

//         return res.status(201).json({ imageUrl: result.secure_url });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error uploading image to Cloudinary' });
//     }
// })


app.get('/upload', async (req, res) => {
    // const { name } = req.body
    try {
        const images = await Image.find()
        return res.status(201).json(images)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error uploading image to Cloudinary' });
    }
})



mongoose.connect(process.env.mongo_url)
    .then(() => {
        app.listen(3000, () => {
            console.log('server started')
        })
    })
    .catch(() => {
        console.log('Error Occured')
    })
