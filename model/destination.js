let mongoose = require('mongoose')
let Schema = mongoose.Schema

let destinationSchema = new Schema({
    subdestination: {
        type: String,
        enum: ['europeCountries', 'asiaCountries', 'inIndia'],
        required: [true, ' europeCountries , asiaCountries , inIndia. ']
    },

})

let DESTINATION = mongoose.model('destination', destinationSchema)
module.exports = DESTINATION
