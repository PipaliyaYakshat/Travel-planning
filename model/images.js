let mongoose = require('mongoose')
let Schema = mongoose.Schema

const ImagesSchema = new Schema({
    detail: {
        type: [String],
        trim: true,
        required: [true, 'Please Enter Detail Of Place'],
    },
    Images: {
        type: [String],
        required: true,
    },
    PlaceName: {
        type: String,
        required: [true, 'Please Enter Place Name'],
    }
});


let Images = mongoose.model('images', ImagesSchema)
module.exports = Images