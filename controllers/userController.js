
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.status(404).json({ success: false, message: "unable to find users" })
        }
        res.status(200).json({ success: true, usersLength: user.length, user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

export const createUser = async (req, res) => {
    const { name, mobile, age, position, transactionId } = req.body;

    if (!req.files || !req.files["aadhar"] || !req.files["passPhoto"] || !req.files["transactionPhoto"]) {
        return res.json({ success: false, message: "Both PasssPhoto and aadhar is required" })
    }


    // get passPhoto and aadhar images 
    const passPhoto = req.files["passPhoto"][0].path;
    const aadhar = req.files["aadhar"][0].path;
    const transactionPhoto = req.files["transactionPhoto"][0].path;

    const maxSizeInBytes = 50 * 1024; // 50 KB in bytes

    if (passPhoto.size > maxSizeInBytes) {
        return res.status(400).json({ success: false, message: "Pass photo must be under 50 KB" });
    }
    if (aadhar.size > maxSizeInBytes) {
        return res.status(400).json({ success: false, message: "Aadhar photo must be under 50 KB" });
    }
    if (transactionPhoto.size > maxSizeInBytes) {
        return res.status(400).json({ success: false, message: "Transaction photo must be under 50 KB" });
    }


    // validating fields 
    if (!name) {
        return res.json({ success: false, message: "Name is required" })
    } else if (!mobile || !(String(mobile).length === 10 && !isNaN(Number(mobile)))) {
        return res.json({ success: false, message: "Valid mobile Number is required" })
    } else if (!age || age <= 0) {
        return res.json({ success: false, message: "Valid age is required" })
    } else if (!position) {
        return res.json({ success: false, message: "Position is required" })
    } else if (!transactionId) {
        return res.json({ success: false, message: "Transaction Id is required" })
    } else if (!req.files) {
        return res.status(400).json({ success: false, message: "Files are required" })

    }
    else {


        try {
            const presentUser = await User.findOne({ mobile });

            if (presentUser) {
                return res.status(400).json({ success: false, message: "User already registered" })
            }

            const user = await User.create({ name, mobile, age, position, passPhoto, aadhar, transactionId, transactionPhoto })
            return res.status(201).json({ success: true, message: "user registered", user })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "server error" })
        }


    }
}