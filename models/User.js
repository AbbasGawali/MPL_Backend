import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        
    },
    position: {
        type: String,
        required: true,
    },
    passPhoto: {
        type: String,
        required: true,
    },

    // aadhar: {
    //     type: String,
    //     required: true,
    // },

    transactionId: {
        type: String,
        required: true,
    },
    transactionPhoto: {
        type: String,
        required: true,
    },
    userCreated: {
        type: Date,
        default: new Date(Date.now())
    }

})

export default mongoose.model("User", UserSchema)