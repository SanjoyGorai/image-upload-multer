import fs from "fs";
import path from "path";
import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded." });
  }

  const uploadPromises = req.files.map(async (file) => {
    try {
      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "uploads",
      });

      // Delete file from local uploads folder
      fs.unlink(file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });

      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      fs.unlink(file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
      throw error;
    }
  });

  try {
    const uploadResults = await Promise.all(uploadPromises);
    res
      .status(200)
      .json({ message: "Files uploaded successfully", data: uploadResults });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading files", error: error.message });
  }
};
