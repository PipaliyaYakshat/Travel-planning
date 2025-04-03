let DM = require('../model/destination')

exports.create = async function (req, res) {
    try {
        
        let destinationData = await DM.create(req.body)
        console.log("destinationData", destinationData);
        
        res.status(201).json({
            status: 'Success',
            message: 'destination Created Successfully',
            data: destinationData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            error: error.message
        })
    }
}

exports.destinationfindAll = async function (req, res, next) {
    try {
        let destinationData = await DM.find()

        if (destinationData.length == 0) {
            throw new Error("destination Not Found");
        }
        res.status(200).json({
            status: 'Success',
            message: 'destination All Find Successfully',
            data: destinationData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            error: error.message
        })
    }
}

exports.destinationfindOne = async function (req, res, next) {
    try {
        let destinationData = await DM.findById(req.params.id)
        res.status(200).json({
            status: 'Success',
            message: 'destination One Find Successfully',
            data: destinationData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            error: error.message
        })
    }
}

exports.destinationDelete = async function (req, res, next) {
    try {

        let destination = await DM.findById(req.params.id)
        if (!destination) {
            throw new Error("destination Already Deleted");
        }

        await DM.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'Success',
            message: 'destination Delete Successfully',
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            error: error.message
        })
    }
}

exports.destinationUpdate = async function (req, res, next) {
    try {

        let destinationData = await DM.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            status: 'Success',
            message: 'destination Update Successfully',
            data: destinationData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            error: error.message
        })
    }
}