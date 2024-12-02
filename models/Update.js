import mongoose from 'mongoose';

// Define the Update schema
const updateSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true, // Make the message field required
    },
});

// Create the Update model from the schema
const Update = mongoose.model('Update', updateSchema);

export default Update;