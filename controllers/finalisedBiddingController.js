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

// Add a new finalized bidding
export const addFinalisedBidding = async (req, res) => {
    const finalisedBidding = new FinalisedBidding(req.body);
    try {
        const savedBidding = await finalisedBidding.save();
        res.status(201).json({ message: 'Bidding added successfully', bidding: savedBidding });
    } catch (error) {
        res.status(400).json({ message: error.message });
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
