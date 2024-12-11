import express from 'express';
import {
    getFinalisedBiddings,
    addFinalisedBidding,
    editFinalisedBidding,
    deleteFinalisedBidding
} from '../controllers/finalisedBiddingController.js';

const router = express.Router();

// Route to get all finalized biddings
router.get('/getfinalisedbiddings', getFinalisedBiddings);

// Route to add a finalized bidding
router.post('/addfinalisedbidding', addFinalisedBidding);

// Route to edit a finalized bidding by ID
router.put('/editfinalisedbidding/:id', editFinalisedBidding);

// Route to delete a finalized bidding by ID
router.delete('/deletefinalisedbidding/:id', deleteFinalisedBidding);

export default router;
