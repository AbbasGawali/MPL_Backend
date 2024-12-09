import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "./config/db.js"
import UserRoutes from "./routes/UserRoutes.js"
import MatchRoutes from "./routes/MatchRoutes.js"
import UpdatesRoutes from "./routes/UpdatesRoutes.js"
import cors from "cors"
import User from "./models/User.js"; // Import the User model

import { Server } from "socket.io";
import http from "http";

const port = process.env.PORT || 8000;
// Initialize express and HTTP server
const app = express();
const server = http.createServer(app);

// Set up socket.io
const io = new Server(server, {
    cors: {
        origin: "*", // Adjust this for production, e.g., specific frontend URLs
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    },
});


// Middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", UserRoutes)
app.use('/api/updates', UpdatesRoutes); // Prefix all update routes with /updates
app.use('/api/match', MatchRoutes); // Prefix all update routes with /updates


app.get("/", (req, res) => {
    res.send("Welcome to MPL Backend");
})


// Socket.io Events
let usersData = []; // You can fetch this from the database on initialization




// io.on("connection", (socket) => {
//     console.log("A user connected");

//     // Handle user selection
//     socket.on("selectUser", async (selectedUserId) => {
//         try {
//             // Fetch the selected user from the database
//             const selectedUser = await User.findById(selectedUserId);
//             if (selectedUser) {
//                 io.emit("userSelected", selectedUser); // Broadcast to all clients
//             } else {
//                 console.error("User not found");
//             }
//         } catch (error) {
//             console.error("Error fetching user:", error);
//         }
//     });

//     // Handle price updates
//     socket.on("updatePrice", async (updatedUser) => {
//         try {
//             // Update the user data in the database
//             const updatedUserData = await User.findByIdAndUpdate(
//                 updatedUser.id,
//                 { $set: { position: updatedUser.position } }, // Example: Update position
//                 { new: true }
//             );

//             if (updatedUserData) {
//                 io.emit("priceUpdated", updatedUserData); // Broadcast the updated user
//             } else {
//                 console.error("User not found for update");
//             }
//         } catch (error) {
//             console.error("Error updating user:", error);
//         }
//     });

//     socket.on("disconnect", () => {
//         console.log("A user disconnected");
//     });
// });





// Socket.IO events
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
  
    // Handle player selection
    socket.on('selectPlayer', (player) => {
      io.emit('playerSelected', player);
    });
  
    // Handle bid update
    socket.on('updateBid', (data) => {
      io.emit('bidUpdated', data);
    });
  
    // Handle final bid
    socket.on('finalizeBid', (data) => {
      io.emit('bidFinalized', data);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
  



// Start the server
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});






