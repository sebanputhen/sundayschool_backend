// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  admissionNo: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple null/empty values
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  baptismName: {
    type: String,
    required: true,
    trim: true,
  },
  houseName: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'],
  },
  className: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  dateOfBaptism: {
    type: Date,
    required: true,
  },
  dateOfHolyCommunion: {
    type: Date,
  },
  fatherName: {
    type: String,
    required: true,
    trim: true,
  },
  fatherBaptismName: {
    type: String,
    trim: true,
  },
  motherName: {
    type: String,
    required: true,
    trim: true,
  },
  motherBaptismName: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  photo: {
    type: String, // Vercel Blob URL (e.g., https://xxxx.public.blob.vercel-storage.com/...)
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  approvedDate: {
    type: Date,
  },
  rejectionReason: {
    type: String,
  },
}, {
  timestamps: true,
});

// Generate admission number automatically when approved
studentSchema.pre('save', async function(next) {
  if (this.status === 'approved' && !this.admissionNo) {
    // Generate admission number format: ADM2025001
    const year = new Date().getFullYear();
    const count = await mongoose.model('Student').countDocuments({ 
      admissionNo: { $regex: `^ADM${year}` } 
    });
    this.admissionNo = `ADM${year}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Student', studentSchema);