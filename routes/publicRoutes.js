// routes/publicRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { registerStudent } = require('../controllers/registrationController');

// Public registration route
router.post('/register', upload.single('photo'), registerStudent);
router.get('/students-12', getClass12Students);
router.post('/verify-student', verifyStudentForPhoto);
router.put('/upload-photo/:id', upload.single('photo'), uploadStudentPhoto);
module.exports = router;