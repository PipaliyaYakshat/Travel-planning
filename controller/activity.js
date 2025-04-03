let AM = require('../model/activity')
let IM = require('../model/itinerary')

exports.activityCreate = async function (req, res, next) {
    try {
        const { itineraryId } = req.body

        let itinerary = await IM.findById(itineraryId)
        if (!itinerary) {
            throw new Error("Itinerary Not Found");
        }

     
        let activityData = await AM.create(req.body)
        res.status(201).json({
            status: "Success",
            message: "Activity Created Successfully",
            data: activityData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.activityFindAll = async function (req, res, next) {
    try {

        let activityData = await AM.find().populate([
            { path: 'destinationId' },
            { path: 'itineraryId' }])

        if (activityData.length == 0) {
            throw new Error("Activity Data Not Exist");
        }
        res.status(200).json({
            status: "Success",
            message: "Find All Activity Successfully",
            data: activityData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.activityFindOne = async function (req, res, next) {
    try {
        let id = req.params.id
        let activityData = await AM.findById(id).populate([
            { path: 'destinationId' },
            { path: 'itineraryId' }])

        if (!activityData) {
            throw new Error("Activity Data Not Found");
        }
        res.status(200).json({
            status: "Success",
            message: "Find One Activity Successfully",
            data: activityData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.activityDelete = async function (req, res, next) {
    try {
        let id = req.params.id
        let activityData = await AM.findByIdAndDelete(id)
        if (activityData) {
            throw new Error("Activity Data Not Exist");
        }
        res.status(200).json({
            status: "Success",
            message: "Activity Delete Successfully",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.activityUpdate = async function (req, res, next) {
    try {
        let id = req.params.id
        let activityData = await AM.findByIdAndUpdate(id, req.body, { new: true }).populate([
            { path: 'destinationId' },
            { path: 'itineraryId' }])

        if (!activityData) {
            throw new Error("Activity Not Found");
        }

        res.status(200).json({
            status: "Success",
            message: "Activity Update Successfully",
            data: activityData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}