// controllers/registrationController.js
const Student = require('../models/Student');
const path = require('path');
const fs = require('fs');

// @desc    Public student registration
// @route   POST /api/public/register
// @access  Public
const registerStudent = async (req, res) => {
  try {
    const {
      name,
      baptismName,
      houseName,
      gender,
      className,
      division,
      dateOfBirth,
      dateOfBaptism,
      dateOfHolyCommunion,
      fatherName,
      fatherBaptismName,
      motherName,
      motherBaptismName,
      phoneNumber,
      email,
    } = req.body;

    // Validate required fields
    if (!name || !baptismName || !houseName || !gender || !className || !division || 
        !dateOfBirth || !dateOfBaptism || !fatherName || !motherName || 
        !phoneNumber || !email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if student already registered with same email
    const existingStudent = await Student.findOne({ email: email.toLowerCase() });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'This email address is already registered. Please use a different email.',
      });
    }

    // Check if phone number already exists (optional)
    const existingPhone = await Student.findOne({ phoneNumber: phoneNumber.trim() });
    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: 'This phone number is already registered. Please use a different phone number.',
      });
    }

    // Get photo path if uploaded
    const photoPath = req.file ? `/uploads/students/${req.file.filename}` : null;

    if (!photoPath) {
      return res.status(400).json({
        success: false,
        message: 'Photo is required',
      });
    }

    // Create new student registration
    const student = await Student.create({
      name: name.trim(),
      baptismName: baptismName.trim(),
      gender,
      className,
      division,
      dateOfBirth,
      dateOfBaptism,
      dateOfHolyCommunion: dateOfHolyCommunion || null,
      fatherName: fatherName.trim(),
      fatherBaptismName: fatherBaptismName?.trim() || '',
      motherName: motherName.trim(),
      motherBaptismName: motherBaptismName?.trim() || '',
      phoneNumber: phoneNumber.trim(),
      email: email.toLowerCase().trim(),
      photo: photoPath,
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully. You will be notified once approved.',
      data: {
        id: student._id,
        name: student.name,
        email: student.email,
        status: student.status,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Delete uploaded file if registration fails
    if (req.file) {
      const filePath = path.join(__dirname, '../uploads/students', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.',
      error: error.message,
    });
  }
};

// @desc    Get all pending registrations (Admin only)
// @route   GET /api/admin/registrations/pending
// @access  Private/Admin
const getPendingRegistrations = async (req, res) => {
  try {
    const students = await Student.find({ status: 'pending' })
      .sort({ registrationDate: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error('Error fetching pending registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending registrations',
    });
  }
};

// @desc    Get all registrations with status filter (Admin only)
// @route   GET /api/admin/registrations?status=approved
// @access  Private/Admin
const getAllRegistrations = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    
    const students = await Student.find(filter)
      .sort({ registrationDate: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations',
    });
  }
};

// @desc    Approve student registration
// @route   PUT /api/admin/registrations/:id/approve
// @access  Private/Admin
const approveRegistration = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student registration not found',
      });
    }

    if (student.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'This registration has already been processed',
      });
    }

    student.status = 'approved';
    student.approvedBy = req.user?.id; // Assuming req.user is set by auth middleware
    student.approvedDate = Date.now();
    await student.save(); // This will trigger the pre-save hook to generate admission number

    res.status(200).json({
      success: true,
      message: 'Registration approved successfully',
      data: student,
    });
  } catch (error) {
    console.error('Error approving registration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve registration',
      error: error.message,
    });
  }
};

// @desc    Reject student registration
// @route   PUT /api/admin/registrations/:id/reject
// @access  Private/Admin
const rejectRegistration = async (req, res) => {
  try {
    const { reason } = req.body;
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student registration not found',
      });
    }

    if (student.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'This registration has already been processed',
      });
    }

    student.status = 'rejected';
    student.rejectionReason = reason || 'Not specified';
    await student.save();

    res.status(200).json({
      success: true,
      message: 'Registration rejected',
      data: student,
    });
  } catch (error) {
    console.error('Error rejecting registration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reject registration',
      error: error.message,
    });
  }
};

// @desc    Get single registration by ID
// @route   GET /api/admin/registrations/:id
// @access  Private/Admin
const getRegistrationById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student registration not found',
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error('Error fetching registration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registration',
      error: error.message,
    });
  }
};

// @desc    Delete registration
// @route   DELETE /api/admin/registrations/:id
// @access  Private/Admin
const deleteRegistration = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student registration not found',
      });
    }

    // Delete photo file if exists
    if (student.photo) {
      const filePath = path.join(__dirname, '..', student.photo);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await student.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Registration deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete registration',
      error: error.message,
    });
  }
};

// IMPORTANT: Export all functions
module.exports = {
  registerStudent,
  getPendingRegistrations,
  getAllRegistrations,
  getRegistrationById,
  approveRegistration,
  rejectRegistration,
  deleteRegistration,
};