import express from 'express';
import { getUpdates, addUpdate, editUpdate, deleteUpdate } from '../controllers/updateController.js';

const router = express.Router();

// Route to get updates
router.get('/getupdate', getUpdates);

// Route to add an update
router.post('/addupdate', addUpdate);

// Route to edit an update
router.put('/editupdate/:id', editUpdate);

// Route to delete an update
router.delete('/deleteupdate/:id', deleteUpdate);

export default router;