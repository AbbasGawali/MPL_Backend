import mongoose from "mongoose";
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
    team1: {
        name: { type: String, required: true },
        logo: { type: String, required: false },
    },
    team2: {
        name: { type: String, required: true },
        logo: { type: String, required: false },
    },
});

const Match = mongoose.model('Match', matchSchema);

export default Match;
