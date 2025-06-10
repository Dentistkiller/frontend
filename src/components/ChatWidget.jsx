import { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://cohere-serverr.onrender.com/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "bot", text: data.text }]);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-focus transition"
      >
        💬
      </button>

      {/* Chat popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-neutral-900 border border-base-200 rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-2 border-b border-base-200 text-neutral-content">
            <h2 className="font-semibold">AI Chatbot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-200"
            >
              ✖️
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-2xl max-w-[70%] text-sm break-words ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-green-500 text-white rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-gray-400 text-sm italic text-left">
                Typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-2 border-t border-base-200">
            <input
              type="text"
              className="w-full border border-base-300 rounded p-2 text-sm bg-neutral-800 text-neutral-content placeholder-gray-500"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
          </div>
        </div>
      )}
    </>
  );
}
