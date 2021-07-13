require('dotenv').config();

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3001;


const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(`mongodb+srv://${process.env.UN}:${process.env.PW}@pwaucb.7lgai.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
}).catch(err => {
    console.log('failed');
    console.log(err);
});

// routes
app.use(require("./routes/api.js"));
