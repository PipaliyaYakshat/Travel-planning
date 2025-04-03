let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "Please Enter FirstName"]
    },
    lastname: {
        type: String,
        required: [true, 'please Enter LastName']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Please Enter Email"]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Please Enter Password"]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
})

let USER = mongoose.model('user', userSchema)
module.exports = USER