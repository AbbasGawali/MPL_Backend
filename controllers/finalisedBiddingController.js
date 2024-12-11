import FinalisedBidding from '../models/FinalisedBidding.js';

// Get all finalized biddings
export const getFinalisedBiddings = async (req, res) => {
    try {
        const biddings = await FinalisedBidding.find();
        res.json(biddings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 
// Utility function for validations
const validateBiddingData = (data) => {
    const errors = [];

    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
        errors.push('Player name is required and must be a valid string.');
    }
    if (!data.position || typeof data.position !== 'string' || data.position.trim().length === 0) {
        errors.push('Player position is required and must be a valid string.');
    }
    if (!Number.isInteger(data.currentBid) || data.currentBid <= 0) {
        errors.push('Current bid must be a positive integer.');
    }
    if (!data.lastBiddingTeam || typeof data.lastBiddingTeam !== 'string' || data.lastBiddingTeam.trim().length === 0) {
        errors.push('Last bidding team is required and must be a valid string.');
    }
    if (!Number.isInteger(data.age) || data.age <= 0 || data.age > 100) {
        errors.push('Player age must be a positive integer between 1 and 100.');
    }

    return errors;
};

// Add a new finalized bidding
export const addFinalisedBidding = async (req, res) => {
    const { name, position, currentBid, lastBiddingTeam, age } = req.body;

    // Validate data
    const validationErrors = validateBiddingData({ name, position, currentBid, lastBiddingTeam, age });
    if (validationErrors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors: validationErrors });
    }

    const finalisedBidding = new FinalisedBidding(req.body);
    try {
        const savedBidding = await finalisedBidding.save();
        res.status(201).json({ message: 'Bidding added successfully', bidding: savedBidding });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Edit a finalized bidding by ID
export const editFinalisedBidding = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBidding = await FinalisedBidding.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedBidding) {
            res.json({ message: 'Bidding edited successfully', bidding: updatedBidding });
        } else {
            res.status(404).json({ message: 'Bidding not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a finalized bidding by ID
export const deleteFinalisedBidding = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBidding = await FinalisedBidding.findByIdAndDelete(id);
        if (deletedBidding) {
            res.json({ message: 'Bidding deleted successfully' });
        } else {
            res.status(404).json({ message: 'Bidding not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
