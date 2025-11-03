// Chatbot.jsx
import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages([...messages, userMsg]);
    setLoading(true);
    setInput("");

    try {
      const response = await fetch("https://cohere-serverr.onrender.com/generatet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer B6AKE73-M2C4DR4-H6HRCBS-9D7NAKA" // if needed
        },
        body: JSON.stringify({
          message: input,
          workspaceId: "travelagentbot", // Use correct ID
        }),
      });

      const data = await response.json();
      const botReply = { role: "bot", content: data?.answer || "No reply" };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">AnythingLLM Chat</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <p className="bg-gray-100 p-2 my-1 rounded">{m.content}</p>
          </div>
        ))}
        {loading && <p className="italic">Typing...</p>}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        className="w-full p-2 border rounded mb-2"
        placeholder="Ask me anything..."
      />
      <button
        onClick={sendMessage}
        className="w-full bg-blue-500 text-white py-2 rounded"
        disabled={loading}
      >
        Send
      </button>
    </div>
  );
}
