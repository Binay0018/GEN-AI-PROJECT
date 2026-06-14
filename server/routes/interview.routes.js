const express = require('express');
const router = express.Router();
const authMiddleware = require('../controller/middleware/auth.middleware');
const interviewController = require('../controller/interview.controller');
const upload = require('../controller/middleware/file.middleware');

router.post("/interview",authMiddleware ,upload.single("resume"),interviewController);

module.exports = router;
