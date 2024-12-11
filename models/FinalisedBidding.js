import mongoose from "mongoose";
const FinalisedBiddingSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    }, position: {
        required: true,
        type: String,
    }, currentBid: {
        required: true,
        type: Number,
    }, lastBiddingTeam: {
        required: true,
        type: String,
    }
}, { timestamps: true });

const FinalisedBidding = mongoose.model('FinalisedBidding', FinalisedBiddingSchema);

export default FinalisedBidding;
