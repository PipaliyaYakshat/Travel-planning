let nodemailer = require('nodemailer');
let PM = require('../model/payment');
let BM = require('../model/booking');
let IM = require('../model/itinerary');
let UM = require('../model/user');

exports.createPayment = async function (req, res, next) {
    try {
        if (!Array.isArray(req.body.bookingId)) {
            return res.status(400).json({
                status: "fail",
                message: "'bookingId' field must be an array of order IDs."
            });
        }

        const orders = await BM.find({ '_id': { $in: req.body.bookingId } }).populate('itineraryId');

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Booking not found."
            });
        }

        let totalPrice = 0;
        orders.forEach(order => {
            if (order.itineraryId && order.itineraryId.packagePrice) {
                totalPrice += order.itineraryId.packagePrice;
            }
        });

        if (Number(req.body.amount) !== totalPrice) {
            return res.status(400).json({
                status: "fail",
                message: `Amount mismatch: expected ₹${totalPrice} but got ₹${req.body.amount}`
            });
        }


        const paymentData = {
            ...req.body,
            amount: totalPrice,
            status: req.body.status || 'pending..',
            bookNow: req.body.bookNow !== undefined ? req.body.bookNow : false
        };

        const createdPayment = await PM.create(paymentData);

        const user = await UM.findById(req.body.userId);

        if (user) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.Email,
                    pass: process.env.Password
                }
            });

            const mailOptions = {
                from: process.env.Email,
                to: user.email,
                subject: 'Payment Confirmation',
                text: `Dear ${user.firstname} ${user.lastname},\n\nYour payment has been successfully processed.\nTotal Amount: ₹${totalPrice}\n\nThank you for your payment!`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                }
            });
        }

        return res.status(201).json({
            status: "success",
            message: "Payment created successfully!",
            createdPayment
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "fail",
            message: error.message || "Internal server error"
        });
    }
};
exports.viewAllPayments = async function (req, res, next) {
    try {
        const payments = await PM.find()
            .populate('userId')
            .populate('itineraryId')
            .populate('bookingId')

        if (!payments || payments.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "No payments found."
            });
        }

        res.status(200).json({
            status: "success",
            message: "Payments fetched successfully!",
            payments
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.viweOnePayment = async function (req, res, next) {
    try {
        const payment = await PM.findById(req.params.id)
            .populate('userId')
            .populate('itineraryId')
            .populate('bookingId')

        if (!payment) {
            return res.status(404).json({
                status: "fail",
                message: "Payment not found."
            });
        }

        res.status(200).json({
            status: "success",
            message: "Payment fetched successfully!",
            payment
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.deletePayment = async function (req, res, next) {
    try {
        const payment = await PM.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({
                status: "fail",
                message: "Payment not found."
            });
        }

        await payment.remove();

        res.status(200).json({
            status: "success",
            message: "Payment deleted successfully!"
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.updatePayment = async function (req, res, next) {
    try {
        const payment = await PM.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({
                status: "fail",
                message: "Payment not found."
            });
        }

        if (req.body.amount) {
            const itinerary = await IM.findById(payment.itineraryId);
            if (Number(req.body.amount) !== totalPrice) {
                return res.status(400).json({
                    status: "fail",
                    message: `Amount mismatch: expected ₹${totalPrice} but got ₹${req.body.amount}`
                });
            }
        }

        Object.assign(payment, req.body);
        await payment.save();

        res.status(200).json({
            status: "success",
            message: "Payment updated successfully!",
            payment
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

