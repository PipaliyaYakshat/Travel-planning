const FM = require("../model/feedback");

exports.feedbackCreate = async function (req, res, next) {
    try {
        let feedbackData = await FM.create(req.body);
        res.status(201).json({
            status: "Success",
            message: "Feedback Created Successfully",
            data: feedbackData
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.feedbackFind = async function (req, res, next) {
    try {
        let feedbackData = await FM.find().populate([
            { path: 'user' },
            { path: 'bookingId' }
        ]);
        res.status(200).json({
            status: "Success",
            message: "Feedback Retrieved Successfully",
            data: feedbackData
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.feedbackFindOne = async function (req, res, next) {
    try {
        let feedbackData = await FM.findById(req.params.id).populate([
            { path: 'user' },
            { path: 'bookingId' }
        ]);
        if (!feedbackData) {
            return res.status(404).json({
                status: "Fail",
                message: "Feedback Not Found"
            });
        }
        res.status(200).json({
            status: "Success",
            message: "Feedback Retrieved Successfully",
            data: feedbackData
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.feedbackUpdate = async function (req, res, next) {
    try {
        let feedbackData = await FM.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!feedbackData) {
            return res.status(404).json({
                status: "Fail",
                message: "Feedback Not Found"
            });
        }
        res.status(200).json({
            status: "Success",
            message: "Feedback Updated Successfully",
            data: feedbackData
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.feedbackDelete = async function (req, res, next) {
    try {
        let feedbackData = await FM.findByIdAndDelete(req.params.id);
        if (!feedbackData) {
            return res.status(404).json({
                status: "Fail",
                message: "Feedback Not Found"
            });
        }
        res.status(200).json({
            status: "Success",
            message: "Feedback Deleted Successfully"
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message
        });
    }
};
