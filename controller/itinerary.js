let IM = require('../model/itinerary')
let DM = require('../model/destination')
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

exports.itineraryCreate = async function (req, res, next) {
    try {
        const { destinationId, detail, packagePrice } = req.body;


        let destination = await DM.findById(destinationId);
        if (!destination) {
            throw new Error("Destination Not Found");
        }

        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'itineraries' });
                fs.unlinkSync(file.path);
                return result.secure_url;
            });

            imageUrls = await Promise.all(uploadPromises);
        }
        let itineraryData = await IM.create({
            destinationId,
            detail,
            Images: imageUrls,
            packagePrice
        });

        res.status(201).json({
            status: 'Success',
            message: 'Itinerary Created Successfully',
            data: itineraryData
        });
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        });
    }
};


exports.itineraryFindAll = async function (req, res, next) {
    try {

        let itineraryData = await IM.find().populate('destinationId')

        if (itineraryData.length == 0) {
            throw new Error("Itinerary Data Not Exist");
        }
        res.status(200).json({
            status: 'Success',
            message: 'All Itinerary Find Successfully',
            data: itineraryData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.itineraryFindOne = async function (req, res, next) {
    try {
        let id = req.params.id
        let itineraryData = await IM.findById(id).populate('destinationId')
        res.status(200).json({
            status: 'Success',
            message: 'One Itinerary Find Successfully',
            data: itineraryData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.itineraryDelete = async function (req, res, next) {
    try {
        let id = req.params.id

        let itinerary = await IM.findById(id)
        if (!itinerary) throw new Error("Itinerary Not Found");

        await IM.findByIdAndDelete(id)
        res.status(200).json({
            status: 'Success',
            message: 'Itinerary Delete Successfully',

        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.itineraryUpdate = async function (req, res, next) {
    try {
        let id = req.params.id

        let itineraryData = await IM.findByIdAndUpdate(id, req.body, { new: true }).populate('destinationId')
        res.status(200).json({
            status: 'Success',
            message: 'Itinerary Update Successfully',
            data: itineraryData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}