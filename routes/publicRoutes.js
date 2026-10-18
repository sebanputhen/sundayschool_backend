// routes/publicRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const { registerStudent, getClass12Students, verifyStudentForPhoto,getStudentsByDob, uploadStudentPhoto } = require('../controllers/registrationController');
// Public registration route
router.post('/register', upload.single('photo'), registerStudent);
router.post('/students-by-dob', getStudentsByDob);
router.post('/verify-student', verifyStudentForPhoto);
router.put('/upload-photo/:id', upload.single('photo'), uploadStudentPhoto);
module.exports = router;