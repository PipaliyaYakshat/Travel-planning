let mongoose = require('mongoose')
let Schema = mongoose.Schema

let bookingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "Please Enter UserId"]
    },
    itineraryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'itinerary',
        required: [true, "Please Enter EventId"]
    },
    date: {
        type: Date,
        required: [true, "please Enter Date"],
        validate: {
            validator: function (value) {
                return value > Date.now();
            },
            message: 'date must be in the future.'
        }
    },

})

let BOOKING = mongoose.model('booking', bookingSchema)
module.exports = BOOKING