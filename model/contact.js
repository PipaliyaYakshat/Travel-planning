let mongoose = require('mongoose')
let Schema = mongoose.Schema

let contactSchema = new Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Please Enter Email"]
    },
    number: {
        type: Number,
        trim: true,
        unique: true,
        required: [true, "Please Enter number"]
    },
    address: {
        type: [String],
        trim: true,
        unique: true,
        required: [true, "Please Enter address"]
    },
})

let contact = mongoose.model('contact', contactSchema)
module.exports = contact
