const cloudinary = require('cloudinary')
const fs = require('fs')

const cloudinaryUpload = async (file) => {
    try {
        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret
        });

        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'mernEcommerce'
        });

        fs.unlink(file.path, (err) => {
            if (err) {
                console.log('Error while removing file')
            }
        })

        return result.url

    } catch (error) {
        return error.message
    }
}

module.exports = cloudinaryUpload