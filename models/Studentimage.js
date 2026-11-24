// models/Student.js
const mongoose = require('mongoose');

const studentimageSchema = new mongoose.Schema({
  admissionNo: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple null/empty values
  },
  name: {
    type: String,
    required: false,
    trim: true,
  },
  baptismName: {
    type: String,
    required: false,
    trim: true,
  },
  houseName: {
    type: String,
    required: false,
    trim: true,
  },
  gender: {
    type: String,
    required: false,
    enum: ['Male', 'Female'],
  },
  className: {
    type: String,
    required: false,
  },
  division: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  dateOfBaptism: {
    type: Date,
    required: false,
  },
  dateOfHolyCommunion: {
    type: Date,
  },
  fatherName: {
    type: String,
    required: false,
    trim: true,
  },
  fatherBaptismName: {
    type: String,
    trim: true,
  },
  motherName: {
    type: String,
    required: false,
    trim: true,
  },
  motherBaptismName: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
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
studentimageSchema.pre('save', async function(next) {
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
// In models/Student.js, after schema definition:
studentimageSchema.index({ status: 1, registrationDate: -1 });
studentimageSchema.index({ name: 'text', email: 'text', phoneNumber: 'text' });
module.exports = mongoose.model('Studentimage', studentimageSchema);