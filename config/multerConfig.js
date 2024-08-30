import multer from "multer";
import { join, extname } from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the uploads directory path
const uploadsDir = join(__dirname, "../uploads");

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
    const originalName = file.originalname.replace(/\s+/g, "-").toLowerCase();
    const fileExt = extname(file.originalname);
    const baseName = originalName.replace(fileExt, "");

    cb(null, `${baseName}-${uniqueSuffix}${fileExt}`);
  },
});

const upload = multer({ storage: storage });

export default upload;
