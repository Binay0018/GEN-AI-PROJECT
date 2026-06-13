const userModel = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Blacklist = require('../model/blacklist.model');
// Register a new user
async function register(req, res) {
    const { name, email, password } = req.body;

    // Check if all required fields are present
    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }

        // ===================== CHANGE #1 =====================
        // Removed manual password hashing because the
        // User model's pre('save') middleware already hashes it.
        //
        // Removed:
        // const hashPassword = await bcrypt.hash(password, 12);
        // =====================================================

        // ===================== CHANGE #2 =====================
        // Store created user in a variable accessible later.
        // Previously "user" was declared inside the try block
        // and was unavailable when creating JWT.
        // =====================================================
        const user = await userModel.create({
            name,
            email,
            password // pre-save middleware will hash this
        });

        // Create JWT token
        const token = jwt.sign(
            {
                id: user._id,
                username: user.name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        // ===================== CHANGE #3 =====================
        // Cookie options added for better security.
        // =====================================================
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        return res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error(err);

        // ===================== CHANGE #4 =====================
        // Added return statement so execution stops here.
        // =====================================================
        return res.status(500).json({
            message: 'Server error'
        });
    }
}

// Login user
async function login(req, res) {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        // Compare entered password with hashed password
        const isMatch = await user.comparepassword(password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        return res.status(200).json({
            message: 'User logged in successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: 'Server error'
        });
    }
};

const logout = async (req, res) => {
    console.log('=== LOGOUT HIT ===');
    console.log('Cookies:', req.cookies);
    console.log('Token:', req.cookies.token);
    
    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    try {
        await Blacklist.create({ token });
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error('Blacklist error:', err.message);
        return res.status(500).json({ message: 'Server error' });
    }
};
const getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }   
        return res.status(200).json({
            message: 'User profile retrieved successfully',
            user : {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({   
            message: 'Server error'
        }); 
    }
};
module.exports = {
    register,
    login,
    logout,
    getProfile
};