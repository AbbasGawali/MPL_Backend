import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";


cloudinary.v2.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDINARYAPIKEY,
    api_secret: process.env.CLOUDINARYAPIKEYSECRET
})

export default cloudinary;