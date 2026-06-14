const jwt = require('jsonwebtoken');
const Blacklist = require('../../model/blacklist.model');

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from cookie OR Authorization header
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        console.log('Cookie token:', req.cookies.token);       // debug
        console.log('Header token:', req.headers.authorization); // debug

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Verify first
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Then check blacklist
        const blacklistedToken = await Blacklist.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({ message: 'Token is blacklisted' });
        }

        req.user = decoded;
        next();

    } catch (error) {
        console.log('Auth error:', error.message); // debug
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;