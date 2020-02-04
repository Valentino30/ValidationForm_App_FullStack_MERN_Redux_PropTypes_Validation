const express = require("express");
const mongoose = require("mongoose");
const form = require("./api/routes/form");

require("dotenv").config();

const app = express();
const db = process.env.MONGO_URI;
const port = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/form", form);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      status: error.status
    }
  });
});

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log("MongoDB connected...")
  )
  .then(() =>
    app.listen(port, () => console.log("Server listening on port " + port))
  )
  .catch(error => console.log(error.message));
