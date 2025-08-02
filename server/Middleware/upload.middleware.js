// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Create uploads directory if it doesn't exist
// const uploadsDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // Configure storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// // File filter for Excel files - Updated with more complete MIME types
// const fileFilter = (req, file, cb) => {
//   // Log the incoming file information for debugging
//   console.log('File upload attempt:', {
//     originalname: file.originalname,
//     mimetype: file.mimetype
//   });
  
//   // Accept more Excel MIME types
//   const validMimeTypes = [
//     'application/vnd.ms-excel',
//     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//     'application/vnd.ms-excel.sheet.macroEnabled.12',
//     'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
//   ];
  
//   const extname = path.extname(file.originalname).toLowerCase();
//   const isValidExtension = ['.xlsx', '.xls'].includes(extname);
  
//   if (validMimeTypes.includes(file.mimetype) || isValidExtension) {
//     return cb(null, true);
//   }
  
//   // Provide more detailed error
//   cb(new Error(`Only Excel files are allowed. Received: ${file.mimetype} with extension ${extname}`));
// };

// const upload = multer({ 
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 } // 10MB max file size
// });

// module.exports = upload;


const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

// Filter for Excel files only
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.xlsx', '.xls'];
  const extname = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(extname)) {
    cb(null, true);
  } else {
    cb(new Error(`Only Excel files are allowed. Invalid extension: ${extname}`));
  }
};

// Multer instance for handling multiple Excel files (max 10)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});

module.exports = upload;
