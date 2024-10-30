import mongoose from "mongoose" 

const connection = mongoose.connect("mongodb+srv://abbasgawali111:lrXPGx14B0tkt5kL@cluster0.jgwqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    dbName: "MplBackend"
}).then(() => {
    console.log("connection Success")
}).catch((err) => {
    console.log(`connection failed with ${err}`)
})

