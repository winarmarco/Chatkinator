require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRouter = require("./routes/authentication");

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//     next();
// });

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', authRouter);

app.post("/text-completions", async (req, res) => {
    const prompt = req.body.prompt;

    console.log("prompt: ", prompt);

    const APIKEY = process.env.OPENAPI_KEY;
    const body = {
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 1,
        max_tokens: 2048,
    };

    const options = {
        headers: {
            Authorization: `Bearer ${APIKEY}`,
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/completions",
            body,
            options
        );
        const data = response.data;

        console.log(data.choices[0].text);

        res.json({
            response: data.choices[0].text
        });
    } catch (error) {
        console.log(error);
        res.json({
            reponse: error.message
        });
    }
});


app.listen(8080, () => {
    console.log("Server listening on port 8080");
});
