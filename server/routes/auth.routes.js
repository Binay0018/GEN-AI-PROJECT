const express = require('express');
const router = express.Router();
const User = require('../model/user.model');
const { register, login , logout, getProfile} = require('../controller/auth.controller');
const  authMiddleware = require("../middleware/auth.middleware") ;

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.get(
    '/profile',
    authMiddleware,
    getProfile
);


module.exports = router;