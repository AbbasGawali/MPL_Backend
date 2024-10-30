import express from "express";

import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";
import { createUser, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

//configuring the storage for cloudinary 
const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: "uploads",
        allowed_formats: ["jpg", "jpeg", "png"]
    }
})

// using multer for uploading images
const upload = multer({ storage });



router.get("/allUsers", getAllUsers);

router.post("/addUser", upload.fields([
    { name: "passPhoto", maxCount: 1 },
    { name: "aadhar", maxCount: 1 },
    { name: "transactionPhoto", maxCount: 1 }
]), createUser)


export default router;