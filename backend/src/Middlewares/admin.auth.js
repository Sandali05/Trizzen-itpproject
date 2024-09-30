const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token and set req.user
exports.adminMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token


    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Set the decoded token payload to req.user
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Token is not valid admin' });
    }
};

// Middleware to check if the user has admin role
exports.isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
