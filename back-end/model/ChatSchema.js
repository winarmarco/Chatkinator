const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    title: {type : String, rqeuired: true},
    messages: [
        {
            message: {type: String},
            sentBy: {type: String, required: true, enum: ["bot", "user"]},
        },
    ],
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat