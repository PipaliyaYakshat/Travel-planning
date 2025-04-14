const Contact = require('../model/contact');

exports.createContact = async (req, res) => {
    try {
        const { email, number, address } = req.body;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: "fail",
                message: "Please enter a valid Gmail address (must end with @gmail.com)."
            });
        }

        const numberRegex = /^[6-9]\d{9}$/;
        if (!numberRegex.test(number)) {
            return res.status(400).json({
                status: "fail",
                message: "Please enter a valid 10-digit mobile number starting with 6-9."
            });
        }

        const existingContact = await Contact.findOne({ $or: [{ email }, { number }, { address }] });
        if (existingContact) {
            return res.status(400).json({
                status: "fail",
                message: "Email, number, or address already exists."
            });
        }

        const newContact = await Contact.create({ email, number, address });

        res.status(201).json({
            status: "success",
            message: "Contact created successfully!",
            data: newContact
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};


exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({
            status: "success",
            message: "Contacts fetched successfully!",
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                status: "fail",
                message: "Contact not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Contact fetched successfully!",
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) {
            return res.status(404).json({
                status: "fail",
                message: "Contact not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Contact updated successfully!",
            data: updatedContact
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({
                status: "fail",
                message: "Contact not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Contact deleted successfully!",
            data: deletedContact
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};
