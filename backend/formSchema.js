const mongoose = require('mongoose')
const { Schema } = mongoose;

// console.log(mongoose.Collection('dk'))


const formSchema = new Schema({
    Fullname: String,
    Email: String,
    Password: String,
    PhoneNo: Number,
    Gender: String,
    Language: [String],
    Profession: String,
    city: String,
    country: String,
    pincode: Number,
    uid: mongoose.Types.ObjectId

})

const formDb = mongoose.connection.useDb('form')


const Formdata = formDb.model('Formdata', formSchema)
module.exports = Formdata;