const cloudinary = require('cloudinary');
const Images = require('../models/images');
const fs = require('fs');
const User = require('../models/user');

const cloudinaryUpload = async (req, res) => {

    try {

        if (!req.file || !req.userId) {
            return res.status(500).json({ message: 'File upload failed' });
        }

        const id = req.userId
        const user = await User.findById(id, { _id: 1 })


        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret
        });

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'mernImageGallery'
        });


        const image = new Images({
            url: result.url,
            uid: user._id
        })


        const img = await image.save()
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error(`Error removing file: ${err}`);
            }
        })



        return res.status(201).json({ message: 'Image Upload Successfully', img });

    } catch (error) {

        console.log(error)
        return res.status(500).json({ message: 'Some Error Occured' });
    }

}


module.exports = cloudinaryUpload