const mongoose = require('mongoose')
const { Schema } = mongoose

const imageSchema = new Schema({
    url: {
        type: String,
        allowNull: false
    }
})

const imageDb = mongoose.connection.useDb('Image')

const Image = imageDb.model('Image', imageSchema)
module.exports = Image;