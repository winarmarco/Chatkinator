require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const {checkAuth} = require("./util/middleware");

const authRouter = require("./routes/authentication");
const chatRouter = require("./routes/chat");

console.log(process.env)

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
const app = express();

// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));


app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());



app.use("/api/", authRouter);
app.use("/api/chat", checkAuth, chatRouter);

app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../front-end/build/index.html"))
);


// Handle logic error
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status;
  const message = error.message;
  const cause = error.cause;
  const requiredField = error.requiredField;

  if (status && message) {
    return  res.status(status).json({message, requiredField, cause});
  }

  next(error);
});

// Handle mongoose error
app.use((error, req, res, next) => {
  const modelNameString = error.message.split(" ").at(-1);
  const modelName = modelNameString.replace(/\"/g, '');
  console.log(modelName)

  if (modelName === "User") {
    return res.status(401).json({message: "Unauthorized user"});
  }

  if ((error.name = "ValidationError")) {
    return res.status(400).json({message: error.message});
  }
0
  if (error.name === "Cast Error") {
    return res.status(400).json({message: "Invalid ID"});
  }

  console.error(error);
  return res.status(500).json({message: "Something went wrong!"});
});


app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
