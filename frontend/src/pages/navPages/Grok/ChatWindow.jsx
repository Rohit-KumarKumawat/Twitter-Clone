import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Message from "./Message";

const uid = () => Math.random().toString(36).slice(2, 9);

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    let userId = localStorage.getItem("grok_userId");
    if (!userId) {
      userId = uid();
      localStorage.setItem("grok_userId", userId);
    }

    (async () => {
      try {
        const res = await axios.get("http://localhost:5000/history/" + userId);
        setMessages(res.data.history || []);
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    if (messagesRef.current)
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  async function send() {
    if (!input.trim()) return;
    const userId = localStorage.getItem("grok_userId");
    const userMsg = { role: "user", content: input, tempId: uid() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        userId,
        message: userMsg.content,
      });
      const assistantMsg = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry — server error. Try again." },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="flex h-screen w-full bg-black text-white">
      {messages.length === 0 ? (
        // ---------- Landing UI ----------
        <div className="flex flex-col items-center justify-center w-full relative">
          <h1 className="text-5xl font-bold mb-6">🌌 Grok</h1>
          <div className="w-full max-w-2xl px-4">
            <div className="flex items-center bg-[#111] rounded-2xl px-4 py-3 border border-gray-700">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
              />
              <button
                onClick={send}
                className="ml-2 px-4 py-2 bg-blue-600 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        // ---------- Chat UI ----------
        <div className="flex flex-col w-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Grok Assistant</h3>
              <p className="text-xs text-gray-400">
                Assistant — honest, concise and helpful
              </p>
            </div>
            <div className="text-sm text-gray-400">Connected</div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto" ref={messagesRef}>
            {messages.map((m, i) => (
              <Message key={i} role={m.role} content={m.content} />
            ))}
            {loading && (
              <div className="text-sm text-gray-400">Grok is thinking...</div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-800 bg-[#111]">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask anything..."
                className="flex-1 p-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-400"
              />
              <button
                onClick={send}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
