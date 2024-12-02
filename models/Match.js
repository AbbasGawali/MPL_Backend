import mongoose from 'mongoose';

// Define the Match schema
const matchSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    winner: {
        type: String,
        required: false,
    },
    team1Logo: {
        type: String,
        required: false,
    },
    team2Logo: {
        type: String,
        required: false,
    },
});

// Create the Match model from the schema
const Match = mongoose.model('Match', matchSchema);

export default Match;