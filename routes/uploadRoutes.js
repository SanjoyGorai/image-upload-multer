import { Router } from "express";
import upload from "../config/multerConfig.js";
import { uploadImage } from "../controllers/uploadController.js";

const router = Router();

router.post("/upload", upload.any(), uploadImage);

export default router;
