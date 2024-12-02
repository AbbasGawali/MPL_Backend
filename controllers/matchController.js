import Match from '../models/Match.js';
import cloudinary from 'cloudinary';
 
// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDINARYAPIKEY,
    api_secret: process.env.CLOUDINARYAPIKEYSECRET,
});

// Get all matches
export const getMatches = async (req, res) => {
    try {
        const matches = await Match.find();
        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new match
export const addMatch = async (req, res) => {
    const { date, time, winner } = req.body;
    const match = new Match({ date, time, winner });

    try {
        if (req.files) {
            if (req.files.team1Logo) {
                const team1LogoResult = await cloudinary.v2.uploader.upload(req.files.team1Logo[0].path);
                match.team1Logo = team1LogoResult.secure_url;
            }
            if (req.files.team2Logo) {
                const team2LogoResult = await cloudinary.v2.uploader.upload(req.files.team2Logo[0].path);
                match.team2Logo = team2LogoResult.secure_url;
            }
        }

        const savedMatch = await match.save();
        res.status(201).json({ message: 'Match added successfully', match: savedMatch });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Edit a match by ID
export const editMatch = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedMatch = await Match.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedMatch) {
            res.json({ message: 'Match edited successfully', match: updatedMatch });
        } else {
            res.status(404).json({ message: 'Match not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a match by ID
export const deleteMatch = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMatch = await Match.findByIdAndDelete(id);
        if (deletedMatch) {
            res.json({ message: 'Match deleted successfully' });
        } else {
            res.status(404).json({ message: 'Match not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};