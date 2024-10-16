const mongoose = require('mongoose')
const { Schema } = mongoose;



const userSchema = new Schema({
    email: String,
    password: String
})

const usersDb = mongoose.connection.useDb('user')


const Users = usersDb.model('Users',userSchema)
module.exports = Users;