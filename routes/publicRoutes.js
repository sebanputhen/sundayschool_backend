// routes/publicRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { registerStudent } = require('../controllers/registrationController');

// Public registration route
router.post('/register', upload.single('photo'), registerStudent);

module.exports = router;