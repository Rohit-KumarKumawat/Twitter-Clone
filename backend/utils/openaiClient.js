const axios = require("axios");
require("dotenv").config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.MODEL || "gpt-4o-mini";

async function queryOpenAI(messages) {
  // messages: [{role: 'system'|'user'|'assistant', content: '...'}]
  const payload = {
    model: MODEL,
    messages,
    temperature: 0.2,
    max_tokens: 800,
  };

  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );

  const reply = res.data.choices[0].message.content;
  return reply;
}

module.exports = { queryOpenAI };
