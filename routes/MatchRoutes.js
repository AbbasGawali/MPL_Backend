import express from 'express';
import { getMatches, addMatch, editMatch, deleteMatch } from '../controllers/matchController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary storage for uploaded files

// Route to get matches
router.get('/getmatches', getMatches);

// Route to add a match
router.post('/addmatch', upload.fields([{ name: 'team1Logo', maxCount: 1 }, { name: 'team2Logo', maxCount: 1 }]), addMatch);

// Route to edit a match
router.put('/editmatch/:id', editMatch);

// Route to delete a match
router.delete('/deletematch/:id', deleteMatch);

export default router;

 