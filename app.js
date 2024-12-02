import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "./config/db.js"
import UserRoutes from "./routes/UserRoutes.js"
import MatchRoutes from "./routes/MatchRoutes.js"
import UpdatesRoutes from "./routes/UpdatesRoutes.js"
import cors from "cors"

const port = process.env.PORT || 7000;
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true,
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", UserRoutes)
app.use('/api/updates', UpdatesRoutes); // Prefix all update routes with /updates
app.use('/api/match', MatchRoutes); // Prefix all update routes with /updates


app.get("/", (req, res) => {
    res.send("Welcome to MPL Backend");
})

app.listen(port, () => {
    console.log(`listening at port ${port}`)
})






