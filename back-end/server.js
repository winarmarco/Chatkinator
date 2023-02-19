require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/", async (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

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
