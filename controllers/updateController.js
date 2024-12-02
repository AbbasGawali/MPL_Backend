import Update from '../models/Update.js';

// Get all updates
export const getUpdates = async (req, res) => {
    try {
        const updates = await Update.find();
        res.json(updates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new update
export const addUpdate = async (req, res) => {
    const update = new Update(req.body);
    try {
        const savedUpdate = await update.save();
        res.status(201).json({ message: 'Update added successfully', update: savedUpdate });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Edit an update by ID
export const editUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUpdate = await Update.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedUpdate) {
            res.json({ message: 'Update edited successfully', update: updatedUpdate });
        } else {
            res.status(404).json({ message: 'Update not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an update by ID
export const deleteUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUpdate = await Update.findByIdAndDelete(id);
        if (deletedUpdate) {
            res.json({ message: 'Update deleted successfully' });
        } else {
            res.status(404).json({ message: 'Update not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};