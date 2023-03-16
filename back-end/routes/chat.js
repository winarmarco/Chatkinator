const express = require("express");
const User = require("../model/UserSchema");
const Chat = require("../model/ChatSchema");
const router = express.Router();
const {fetchResponse, getTitle} = require("../util/chat");
const {
  NotFoundError,
  NotAuthError,
  ValidationError,
  ServerError,
} = require("../util/errors");
const mongoose = require("mongoose");

router.get("/", async (req, res, next) => {
  const userId = req.token.userID;

  try {
    const user = await User.findById(userId).populate({
      path: "chats",
      select: "title",
    });

    if (!user) {
      throw new NotAuthError("Unauthorized user");
    }

    res.status(201).json({chats: user.chats});
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const userId = req.token.userID;
  const prompt = req.body.prompt;

  if (!prompt) {
    return next(
      new ValidationError({
        message: "`prompt` field is required",
        requiredField: ["prompt"],
      })
    );
  }

  try {
    const title = req.body.title || (await getTitle(prompt));
    const botResponse = await fetchResponse(prompt);

    const chat = new Chat({
      title: title,
      messages: [
        {
          message: prompt,
          sentBy: "user",
        },
        {
          message: botResponse,
          sentBy: "bot",
        },
      ],
    });

    await chat.save();

    await User.findOneAndUpdate(
      {_id: userId},
      {$push: {chats: chat}},
      {new: true}
    );

    const messages = chat.messages;

    res.status(201).json({
      _id: chat._id,
      title: title,
      response: messages[messages.length - 1],
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:chatId", async (req, res, next) => {
  const userId = req.token.userID;
  const chatId = req.params.chatId;

  try {
    const user = await User.findOne({_id: userId}).populate("chats");

    if (!user) {
      throw new NotAuthError("Unauthorized user");
    }

    const chat = user.chats.find((c) => c._id.toString() === chatId);

    if (!chat) {
      throw new NotFoundError("No chat with that ID");
    }

    res.status(201).json(chat);
  } catch (err) {
    next(err);
  }
});

router.post("/:chatId", async (req, res, next) => {
  const chatId = req.params.chatId;
  const userId = req.token.userID;
  const prompt = req.body.prompt;

  if (!prompt) {
    return next(
      new ValidationError({
        message: "`prompt` field is required",
        requiredField: ["prompt"],
      })
    );
  }

  try {
    const response = await fetchResponse(prompt);

    const userPrompt = {
      message: prompt,
      sentBy: "user",
    };

    const botResponse = {
      message: response,
      sentBy: "bot",
    };

    const user = await User.findOne({_id: userId, chats: chatId});

    if (!user) throw new NotAuthError("Not Authenticated");

    const updatedChat = await Chat.findOneAndUpdate(
      {_id: chatId},
      {$push: {messages: [userPrompt, botResponse]}},
      {new: true}
    );

    if (!updatedChat) throw new ServerError("Cannot update chat!");

    const messages = updatedChat.messages;

    res.status(201).json({
      response: messages[messages.length - 1],
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:chatId", async (req, res, next) => {
  const chatId = req.params.chatId;
  const userId = req.token.userID;

  try {
    const user = await User.findOne({_id: userId, chats: chatId});

    if (!user) throw new NotAuthError("Not Authenticated");

    const deletedChat = await Chat.deleteOne({_id: chatId});

    if (!deletedChat) throw new ServerError("Cannot delete chat");
  
    return setTimeout(() => res.status(201).json({status: "Success",chat: deletedChat}), 5000);
  } catch (error) {
    next(error);
  }
});

router.patch("/:chatId", async (req, res, next) => {
  const chatId = req.params.chatId;
  const userId = req.token.userID;
  const title = req.body.title;

  try {
    const user = await User.findOne({_id: userId, chats: chatId});

    if (!user) throw new NotAuthError("Not Authenticated");

    const updatedChat = await Chat.findOneAndUpdate(
      {
        _id: chatId,
      },
      {$set: {title: title}},
      {new: true}
    );

    if (!updatedChat) throw new ServerError("Cannot update chat!");

    return res.status(200).json({status: "Success", chat: updatedChat});

  } catch (error) {
    next(error);
  }
});

module.exports = router;
