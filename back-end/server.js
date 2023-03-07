require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const {checkAuth} = require("./util/middleware");

const authRouter = require("./routes/authentication");
const chatRouter = require("./routes/chat");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//     next();
// });

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());


app.use("/", authRouter);
app.use("/chat", checkAuth, chatRouter);


// Handle logic error
app.use((error, req, res, next) => {
  const status = error.status;
  const message = error.message;
  const cause = error.cause;
  const requiredField = error.requiredField;

  if (status && message) {
    return res.status(status).json({message, requiredField, cause});
  }

  next(error);
});

// Handle mongoose error
app.use((error, req, res, next) => {
  const modelNameString = error.message.split(" ").at(-1);
  const modelName = modelNameString.replace(/\"/g, '');
  console.log(modelName)

  if (modelName === "User") {
    res.status(401).json({message: "Unauthorized user"});
  }

  if ((error.name = "ValidationError")) {
    return res.status(400).json({message: error.message});
  }

  if (error.name === "Cast Error") {
    return res.status(400).json({message: "Invalid ID"});
  }

  console.error(error);
  return res.status(500).json({message: "Something went wrong!"});
});


app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
