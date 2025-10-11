// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Use memory storage instead of disk storage for Vercel
const storage = multer.memoryStorage();

// File filter - same validation logic
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size (matching your frontend)
  },
  fileFilter: fileFilter,
});

module.exports = upload;