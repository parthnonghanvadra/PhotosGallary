const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/database');

const PORT = 9000;

mongoose.connect(config.database, {
  useNewUrlParser: true, useUnifiedTopology: true
}, () => console.log("Database connected!"));

const app = express();
app.use(express.json());

const userRouter = require('routes/user');
app.use("/api/user", userRouter)

const albumRouter = require('routes/album');
app.use("/api/album", albumRouter)

const photoRouter = require('routes/photo');
app.use("/api/photos", photoRouter)

app.get("/", function (req, res) {
  res.end("???");
})

app.listen(PORT, function () {
  console.log("server is listening on port: " + PORT);
});
