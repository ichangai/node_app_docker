const express = require("express");
const mongoose = require("mongoose");

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

const app = express();
const cors = require("cors");

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

// ================ CONNECTIONS ===========================
const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

const port = process.env.PORT || 3000;

// ----------- MIDDLWARES -------------
app.use(cors({}));
app.use(express.json());
app.enable("trust proxy");
// ------------ ROUTES ----------------
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

// route for testing
app.get("/api", (req, res) => {
  res.send(
    "Amazing and glorious purpose! It's awesome purpose. And simple and Great. Let's make the world a better place"
  );
  console.log("Yeah, I got hit");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
