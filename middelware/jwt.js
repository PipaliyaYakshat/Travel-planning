exports.Auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) throw new Error("Attach Token");

        const tokenVerify = jwt.verify(token, process.env.Secure_key);

        const userVerify = await UM.findById(tokenVerify.id);
        if (!userVerify) throw new Error("Invalid User");

        next();
    } catch (error) {
        let message = error.message;

        // Handle JWT token expiry
        if (error.name === 'TokenExpiredError') {
            message = 'Token Expired';
        }

        res.status(401).json({
            status: 'fail',
            message
        });
    }
};
