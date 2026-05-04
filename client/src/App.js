import { useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      const botMessage = {
        role: "assistant",
        content: data.reply,
      };

      setMessages([...updatedMessages, botMessage]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Server error" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-[#343541] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#202123] p-4 hidden md:block">
        <h2 className="text-lg font-bold mb-4">Chats</h2>
        <button className="w-full bg-[#3e3f4b] p-2 rounded">
          + New Chat
        </button>
      </div>

      {/* Main Chat */}
      <div className="flex flex-col flex-1">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg max-w-3xl ${
                msg.role === "user"
                  ? "bg-[#0b93f6] self-end"
                  : "bg-[#444654] self-start"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {loading && <div className="text-gray-400">Thinking...</div>}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700 flex gap-2">
          <input
            className="flex-1 p-3 rounded bg-[#40414f] outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="bg-green-500 px-4 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
