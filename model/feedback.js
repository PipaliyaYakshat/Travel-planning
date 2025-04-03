let mongoose = require('mongoose')
let Schema = mongoose.Schema

let feedbackSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "Please Enter User Id"]
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'booking',
        required: [true, "Please Enter Event Id"]
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
        required: [true, 'Rating value is required']
    },
    comment: {
        type: String,
        require:true
    },
})

let FEEDBACK = mongoose.model('feedback', feedbackSchema)
module.exports = FEEDBACK
