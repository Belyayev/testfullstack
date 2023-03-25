const express = require("express");
var cors = require("cors");
require("dotenv").config();
const { errorHandler } = require("./backend/middleware/errorMiddleware");
const connectDB = require("./backend/config/db");
const PORT = process.env.PORT || 5000;
const path = require("path");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./backend/routes/userRoutes"));
app.use("/api/lists", require("./backend/routes/listRoutes"));
app.use("/api/shared", require("./backend/routes/sharedRoutes"));
app.use("/api/public", require("./backend/routes/publicRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}!`);
});
