const UM = require('../model/user');

exports.createUser = async (req, res) => {
    try {


        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const { email, password } = req.body;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: "fail",
                message: "Please enter a valid Gmail address (must end with @gmail.com)."
            });
        }

        const existingUser = await UM.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                status: "fail",
                message: "Email already exists"
            });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                status: "fail",
                message: "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const createdata = await UM.create({ ...req.body, password: hashedPassword });
        const token = jwt.sign({ id: createdata._id }, process.env.Secure_key);

        res.status(201).json({
            status: "success",
            message: "User created successfully!",
            createdata,
            token
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.getUsers = async (req, res) => {
    try {

        const viewdata = await UM.find();

        res.status(200).json({
            status: "success",
            message: "Users found successfully!",
            data: viewdata
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.loginUser = async (req, res) => {
    try {

        let logindata = await UM.findOne({ email: req.body.email });

        if (!logindata) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "User Login successfully",
            data: logindata
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.updateUser = async (req, res) => {
    try {

        const updatedata = await UM.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedata) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "User updated successfully!",
            data: updatedata
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {

        const deletedata = await UM.findByIdAndDelete(req.params.id);

        if (!deletedata) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "User deleted successfully!",
            data: deletedata
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};
