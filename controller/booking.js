let BM = require('../model/booking');

exports.bookingCreate = async function (req, res, next) {
    try {
        let bookingData = await BM.create(req.body);
        res.status(201).json({
            status: 'Success',
            message: 'Your booking was successful',
            data: bookingData
        });
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        });
    }
}

exports.bookingFindAll = async function (req, res, next) {
    try {

        let bookingData = await BM.find().populate([
            { path: 'userId' },
            { path: 'itineraryId' }
        ])

        res.status(200).json({
            status: 'Success',
            message: 'All Booking Find Successful',
            data: bookingData
        });
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        });
    }
}

exports.bookingdOne = async function (req, res, next) {
    try {
        let id = req.params.id
        let bookingData = await BM.findById(id).populate([
            { path: 'userId' },
            { path: 'itineraryId' }
        ])

        if (!bookingData) {
            throw new Error("booking Data Not Found");
        }
        res.status(200).json({
            status: "Success",
            message: "Find One Activity Successfully",
            data: bookingData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.bookingDelete = async function (req, res, next) {
    try {

        let id = req.params.id
        let checkCancel = await BM.findById(id)
        if (!checkCancel) {
            throw new Error("Your Booking Already Cancelled");
        }
        await BOOKING.findByIdAndDelete(id)

        res.status(200).json({
            status: 'Success',
            message: 'Your Booking Cancel Successfully',
        });
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        });
    }
}

exports.bookingUpdate = async function (req, res, next) {
    try {

        let bookingData = await BM.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json({
            status: 'Success',
            message: 'Your Booking Update Successfully',
            data: bookingData
        });
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        });
    }
}
