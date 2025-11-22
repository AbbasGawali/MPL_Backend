// app.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "./config/db.js";
import UserRoutes from "./routes/UserRoutes.js";
import MatchRoutes from "./routes/MatchRoutes.js";
import UpdatesRoutes from "./routes/UpdatesRoutes.js";
import finalisedBiddingRoutes from "./routes/finalisedBiddingRoutes.js";
import cors from "cors";

import { Server } from "socket.io";
import http from "http";

const port = process.env.PORT || 8000;

// Initialize express and HTTP server
const app = express();
const server = http.createServer(app);

// Set up socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // production me specific origin set karna
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", UserRoutes);
app.use("/api/updates", UpdatesRoutes);
app.use("/api/match", MatchRoutes);
app.use("/api/finalisedbiddings", finalisedBiddingRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to MPL Backend");
});

// -------------------- SOCKET.IO: LIVE AUCTION STATE --------------------

// Yeh global variable HAMESHA latest auction state rakhega
// Restart hone par obviously reset ho jayega (memory-only)
let currentAuctionState = null;
// Shape:
// {
//   player: {...},
//   currentBid: Number,
//   lastBiddingTeam: String,
//   isBidFinalised: Boolean
// }

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Naya client connect hua -> agar koi current state hai, turant bhej do
  if (currentAuctionState) {
    socket.emit("auctionState", currentAuctionState);
  }

  // Client agar manually bhi maange
  socket.on("getCurrentAuctionState", () => {
    if (currentAuctionState) {
      socket.emit("auctionState", currentAuctionState);
    }
  });

  // 1) Player select kiya admin ne
  // data: { player, lastBiddingTeam }
  socket.on("selectPlayer", (data) => {
    const { player, lastBiddingTeam } = data;

    currentAuctionState = {
      player,
      currentBid: player?.startingBid || 200,
      lastBiddingTeam: lastBiddingTeam || "No bids yet",
      isBidFinalised: false,
    };

    // Sabhi clients ko broadcast karo
    io.emit("playerSelected", currentAuctionState);
  });

  // 2) Bid update
  // data: { player, currentBid, lastBiddingTeam }
  socket.on("updateBid", (data) => {
    if (!currentAuctionState) {
      currentAuctionState = {};
    }

    currentAuctionState = {
      ...currentAuctionState,
      player: data.player || currentAuctionState.player,
      currentBid: data.currentBid,
      lastBiddingTeam:
        data.lastBiddingTeam || currentAuctionState.lastBiddingTeam,
      isBidFinalised: false,
    };

    io.emit("bidUpdated", currentAuctionState);
  });

  // 3) Final bid (sold)
  // data: { player, finalBid, lastBiddingTeam }
  socket.on("finalizeBid", (data) => {
    if (!currentAuctionState) {
      currentAuctionState = {};
    }

    currentAuctionState = {
      ...currentAuctionState,
      player: data.player || currentAuctionState.player,
      currentBid: data.finalBid,
      lastBiddingTeam:
        data.lastBiddingTeam || currentAuctionState.lastBiddingTeam,
      isBidFinalised: true,
    };

    io.emit("bidFinalized", currentAuctionState);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
