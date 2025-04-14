let mongoose = require('mongoose')
let Schema = mongoose.Schema

let destinationSchema = new Schema({
    subdestination: {
        type: String,
        required: [true, ' Please Enter SubDestination'],
        trim: true,
    },

})

let DESTINATION = mongoose.model('destination', destinationSchema)
module.exports = DESTINATION
