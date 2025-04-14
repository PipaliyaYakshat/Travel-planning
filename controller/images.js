const IM = require('../model/images');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Create Image Entry with Cloudinary Upload
exports.imagesCreate = async (req, res) => {
    try {
        const { detail, PlaceName } = req.body;

        // Validate required fields
        if (!detail || !PlaceName) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Please provide all required fields: detail, PlaceName'
            });
        }

        let imageUrls = [];
        if (req.files?.length > 0) {
            const uploadPromises = req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'images' });
                fs.unlinkSync(file.path); // Delete file after uploading
                return result.secure_url;
            });

            imageUrls = await Promise.all(uploadPromises);
        }

        const imageEntry = await IM.create({
            detail,
            Images: imageUrls,
            PlaceName
        });

        res.status(201).json({
            status: 'Success',
            message: 'Images Created Successfully',
            data: imageEntry
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Fail', message: error.message });
    }
};

// Get All Images
exports.imagesFindAll = async (req, res) => {
    try {
        const images = await IM.find();

        if (images.length === 0) {
            return res.status(404).json({ status: 'Fail', message: 'No Images Found' });
        }

        res.status(200).json({
            status: 'Success',
            message: 'All Images Fetched Successfully',
            data: images
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Fail', message: error.message });
    }
};

// Get One Image
exports.imagesFindOne = async (req, res) => {
    try {
        const id = req.params.id;
        const image = await IM.findById(id);

        if (!image) {
            return res.status(404).json({ status: 'Fail', message: 'Image Not Found' });
        }

        res.status(200).json({
            status: 'Success',
            message: 'Image Fetched Successfully',
            data: image
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Fail', message: error.message });
    }
};

// Delete Image
exports.imagesDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const image = await IM.findById(id);

        if (!image) {
            return res.status(404).json({ status: 'Fail', message: 'Image Not Found' });
        }

        await IM.findByIdAndDelete(id);

        res.status(200).json({
            status: 'Success',
            message: 'Image Deleted Successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Fail', message: error.message });
    }
};

// Update Image
exports.imagesUpdate = async (req, res) => {
    try {
        const id = req.params.id;

        // Validate data in the request body
        const { detail, PlaceName } = req.body;
        if (!detail || !PlaceName) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Please provide all required fields: detail, PlaceName'
            });
        }

        const updatedImage = await IM.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedImage) {
            return res.status(404).json({ status: 'Fail', message: 'Image Not Found' });
        }

        res.status(200).json({
            status: 'Success',
            message: 'Image Updated Successfully',
            data: updatedImage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Fail', message: error.message });
    }
};

// Search Images by PlaceName
exports.imagessearch = async (req, res) => {
    try {
        const searchQuery = req.query.query?.trim();

        const filter = searchQuery
            ? { PlaceName: { $regex: searchQuery, $options: 'i' } }
            : {};

        const images = await IM.find(filter);

        res.status(200).json({
            status: 'Success',
            message: 'Images Fetched Successfully',
            data: images
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Fail',
            message: error.message
        });
    }
};
