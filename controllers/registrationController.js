// controllers/registrationController.js
const Student = require('../models/Student');
const { put, del } = require('@vercel/blob');

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

    // Check if phone number already exists
    const existingPhone = await Student.findOne({ phoneNumber: phoneNumber.trim() });
    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: 'This phone number is already registered. Please use a different phone number.',
      });
    }

    // Upload photo to Vercel Blob Storage
    let photoUrl = null;
    if (req.file) {
      try {
        const filename = `students/student-${Date.now()}-${Math.round(Math.random() * 1E9)}.jpg`;
        
        // Upload to Vercel Blob
        const blob = await put(filename, req.file.buffer, {
          access: 'public',
          contentType: req.file.mimetype,
        });
        
        photoUrl = blob.url;
        console.log('Photo uploaded successfully:', photoUrl);
      } catch (uploadError) {
        console.error('Photo upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Failed to upload photo. Please try again.',
          error: uploadError.message,
        });
      }
    }

    if (!photoUrl) {
      return res.status(400).json({
        success: false,
        message: 'Photo is required',
      });
    }

    // Create new student registration
    const student = await Student.create({
      name: name.trim(),
      baptismName: baptismName.trim(),
      houseName: houseName.trim(),
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
      photo: photoUrl,
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

    // Delete photo from Vercel Blob if exists
    if (student.photo) {
      try {
        await del(student.photo);
        console.log('Photo deleted from Vercel Blob:', student.photo);
      } catch (deleteError) {
        console.error('Error deleting file from Vercel Blob:', deleteError);
        // Continue with student deletion even if blob deletion fails
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

// @desc    Update student registration
// @route   PUT /api/admin/registrations/:id
// @access  Private/Admin
const updateRegistration = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student registration not found',
      });
    }

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

    // Update fields if provided
    if (name) student.name = name.trim();
    if (baptismName) student.baptismName = baptismName.trim();
    if (houseName) student.houseName = houseName.trim();
    if (gender) student.gender = gender;
    if (className) student.className = className;
    if (division) student.division = division;
    if (dateOfBirth) student.dateOfBirth = dateOfBirth;
    if (dateOfBaptism) student.dateOfBaptism = dateOfBaptism;
    if (dateOfHolyCommunion !== undefined) student.dateOfHolyCommunion = dateOfHolyCommunion;
    if (fatherName) student.fatherName = fatherName.trim();
    if (fatherBaptismName !== undefined) student.fatherBaptismName = fatherBaptismName.trim();
    if (motherName) student.motherName = motherName.trim();
    if (motherBaptismName !== undefined) student.motherBaptismName = motherBaptismName.trim();
    if (phoneNumber) student.phoneNumber = phoneNumber.trim();
    if (email) student.email = email.toLowerCase().trim();

    // Handle photo update if new photo is uploaded
    if (req.file) {
      try {
        // Delete old photo from Vercel Blob
        if (student.photo) {
          try {
            await del(student.photo);
          } catch (deleteError) {
            console.error('Error deleting old photo:', deleteError);
          }
        }

        // Upload new photo
        const filename = `students/student-${Date.now()}-${Math.round(Math.random() * 1E9)}.jpg`;
        const blob = await put(filename, req.file.buffer, {
          access: 'public',
          contentType: req.file.mimetype,
        });

        student.photo = blob.url;
        console.log('Photo updated successfully:', blob.url);
      } catch (uploadError) {
        console.error('Photo upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Failed to upload new photo',
          error: uploadError.message,
        });
      }
    }

    await student.save();

    res.status(200).json({
      success: true,
      message: 'Registration updated successfully',
      data: student,
    });
  } catch (error) {
    console.error('Error updating registration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update registration',
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
  updateRegistration,
};