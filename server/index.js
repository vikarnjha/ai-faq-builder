const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const faqRoutes = require("./routes/faqRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors({
  origin: "*",
}));
app.use(express.json());

app.use("/api/faqs", faqRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
