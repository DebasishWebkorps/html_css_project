const mongoose = require('mongoose')
const { Schema } = mongoose

const imageSchema = new Schema({
    url: {
        type: String,
        allowNull: false
    },
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    liked: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
})

const Images = mongoose.model('Images', imageSchema);
module.exports = Images;