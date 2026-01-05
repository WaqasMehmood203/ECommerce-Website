const { PrismaClient } = require("@prisma/client");
const prisma = require("../utills/db"); // ✅ Use shared connection
const path = require("path");
const fs = require("fs");

// File upload configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

async function uploadMainImage(req, res) {
  try {
    // Check if files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files were uploaded"
      });
    }

    // Get file from request
    const uploadedFile = req.files.uploadedFile;

    // Validate file size
    if (uploadedFile.size > MAX_FILE_SIZE) {
      return res.status(400).json({
        success: false,
        message: `File size exceeds limit. Maximum allowed size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`
      });
    }

    // Validate file type
    const fileExtension = path.extname(uploadedFile.name).toLowerCase();
    if (!ALLOWED_IMAGE_TYPES.includes(fileExtension)) {
      return res.status(400).json({
        success: false,
        message: `Invalid file type. Allowed types: ${ALLOWED_IMAGE_TYPES.join(', ')}`
      });
    }

    // Sanitize filename to prevent path traversal attacks
    const sanitizedFilename = path.basename(uploadedFile.name);

    // Construct the correct path to the Next.js public folder
    // __dirname is server/controllers, so we go up 2 levels to project root, then into public
    const publicDir = path.join(__dirname, '../../public');
    const uploadPath = path.join(publicDir, sanitizedFilename);

    // Ensure the public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Using mv method for moving file to the directory on the server
    uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to save file to server",
          error: err.message
        });
      }

      console.log(`File uploaded successfully: ${sanitizedFilename}`);
      res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        filename: sanitizedFilename
      });
    });
  } catch (error) {
    console.error("Error in uploadMainImage:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during file upload",
      error: error.message
    });
  }
}

module.exports = {
  uploadMainImage
};