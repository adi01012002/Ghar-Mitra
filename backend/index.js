// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import bodyParser from "body-parser";
// import authRoutes from "./routes/authRoutes.js";
// import pgRoutes from "./routes/pgRoutes.js";
// import accountRoutes from "./routes/accountRoutes.js";
// import studentRoutes from "./routes/studentRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import onlinePaymentRoutes from "./routes/onlinePaymentRoutes.js";
// const app = express();
// dotenv.config();

// // Use CORS to allow requests from your frontend
// const corsOptions = {
//   origin: "http://localhost:5173", // Replace with frontend URL in production
//   optionsSuccessStatus: 200,
//   credentials: true,
// };
// app.use(cors(corsOptions));

// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// // Routes
// app.use("/auth", authRoutes); // Authentication routes
// app.use("/students", studentRoutes); // Student routes
// app.use("/payments", paymentRoutes); // Payment routes
// app.use("/pg", pgRoutes); // pg routes
// app.use("/account", accountRoutes);
// app.use("/onlinePayment", onlinePaymentRoutes);
// // app.get("/", (req, res) => {
// //   res.send("Hello World");
// // });
// app.listen(8090, () => {
//   console.log("server is running on 8090");
// });

// mongoose.connect(
//   "mongodb+srv://adi01012004:9Zjd0LtfEDFKN13K@cluster0.4zo0h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// );

// const db = mongoose.connection;
// db.on("error", (err) => {
//   console.log(err);
// });

// db.on("open", () => {
//   console.log("connected to the database");
// });

// // const PORT = process.env.PORT || 8090;

// // mongoose
// //   .connect("mongodb+srv://aditya10462004:Q6DTBofGd9fWHDFh@cluster0.e6ud1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
// //   .then(() =>
// //     app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
// //   )
// //   .catch((error) => console.log(error.message));

// // MONGODB_URL=mongodb+srv://aditya10462004:Q6DTBofGd9fWHDFh@cluster0.e6ud1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// // these are two user of this application
// // "_id": "6723f9c97f28c3df6e41d3bc",
// // "username": "adi",
// // "email": "adi01@gmail.com",
// // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjNmOWM5N2YyOGMzZGY2ZTQxZDNiYyIsImlhdCI6MTczMDQxMDk1NCwiZXhwIjoxNzMzMDAyOTU0fQ.YxK41nUiWXi-Qinks8FubGRHAhIRe-q7iO432W693QU"

// // "_id": "6724df75dfb2ca2b3911b865",
// // "username": "rishu01",
// // "email": "rishu01@gmail.com",
// // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRkZjc1ZGZiMmNhMmIzOTExYjg2NSIsImlhdCI6MTczMDQ2OTc0OSwiZXhwIjoxNzMzMDYxNzQ5fQ.SP-ZLHWFujUsdpb7d2SHnEU-x9Q5GsgnnvYjwN4XaMk"











import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from 'http'; // Add this import
import path from "path";
// import { Server } from 'socket.io'; // Add this import

// const http = require('http');
// import  { Server } from 'socket.io';
const PORT=process.env.PORT

import authRoutes from "./routes/authRoutes.js";
import pgRoutes from "./routes/pgRoutes.js";
import { fileURLToPath } from 'url';
// import accountRoutes from "./routes/accountRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
// import onlinePaymentRoutes from "./routes/onlinePaymentRoutes.js";
// import socketServer from "./soketServer.js"; // Import your socket server

dotenv.config();

const app = express();
const httpServer = createServer(app); // Create HTTP server

// Socket.io setup
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"]
//   }
// });

// Initialize socket server
// socketServer(io);

// Use CORS to allow requests from your frontend
// const corsOptions = {
//   origin: "http://localhost:5173",
//   optionsSuccessStatus: 200,
//   credentials: true,
// };
app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/payments", paymentRoutes);
app.use("/pg", pgRoutes);
// app.use("/account", accountRoutes);
// app.use("/onlinePayment", onlinePaymentRoutes);

//After all API routes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'client/build')));

// Database connection
mongoose.connect(
  "mongodb+srv://adi01012004:9Zjd0LtfEDFKN13K@cluster0.4zo0h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});

db.on("open", () => {
  console.log("connected to the database");
});

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});