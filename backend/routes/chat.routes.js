const express = require("express");
const router = express.Router();
const Message = require("../models/message.model");
const { queryOpenAI } = require("../utils/openaiClient");

// POST /chat
// body: { userId: string, message: string }
router.post("/", async (req, res) => {
  try {
    const { userId, message } = req.body;
    if (!userId || !message)
      return res.status(400).json({ error: "userId and message required" });

    // Save user message
    const userMsg = await Message.create({
      userId,
      role: "user",
      content: message,
    });

    // Fetch last N messages for context
    const CONTEXT_MESSAGES = parseInt(process.env.CONTEXT_MESSAGES || "8", 10);
    const history = await Message.find({ userId })
      .sort({ createdAt: -1 })
      .limit(CONTEXT_MESSAGES)
      .lean();
    const messagesForModel = [];

    // Start with a system prompt to shape behaviour
    messagesForModel.push({
      role: "system",
      content:
        "You are Grok-like assistant: concise, honest, helpful, and if you are unsure, say you are unsure.",
    });

    // add history in chronological order
    history.reverse().forEach((h) =>
      messagesForModel.push({
        role: h.role === "assistant" ? "assistant" : "user",
        content: h.content,
      })
    );

    // add current user message at end
    messagesForModel.push({ role: "user", content: message });

    // Query OpenAI
    const reply = await queryOpenAI(messagesForModel);

    // Save assistant reply
    const assistantMsg = await Message.create({
      userId,
      role: "assistant",
      content: reply,
    });

    // Return reply
    res.json({ reply, id: assistantMsg._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
