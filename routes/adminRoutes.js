const express = require('express');
const router = express.Router();
const { 
  getPendingRegistrations,
  getAllRegistrations,
  getRegistrationById,
  approveRegistration, 
  rejectRegistration,
  deleteRegistration
} = require('../controllers/registrationController');

// Import your existing auth middleware
// Adjust the path according to your project structure
const { verifyToken } = require('../middleware/auth.middleware');

// Optional: If you have role-based authorization
// const { authorize } = require('../middleware/auth.middleware');

// All routes require authentication
router.use(verifyToken);

// If you have role authorization, uncomment this:
// router.use(authorize('admin', 'superadmin'));

// Registration management routes
router.get('/registrations/pending', getPendingRegistrations);
router.get('/registrations', getAllRegistrations);
router.get('/registrations/:id', getRegistrationById);
router.put('/registrations/:id/approve', approveRegistration);
router.put('/registrations/:id/reject', rejectRegistration);
router.delete('/registrations/:id', deleteRegistration);

module.exports = router;