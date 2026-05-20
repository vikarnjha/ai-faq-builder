import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

export default function ChatBox({
  faqs,
}) {

  const [question, setQuestion] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState([]);

  const askAI = async () => {

    if (!question) {
      return toast.error(
        "Please ask something"
      );
    }

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    try {

      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chat`,
        {
          question,
          faqs,
        }
      );

      const aiMessage = {
        role: "ai",
        content: res.data.answer,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      setQuestion("");

    } catch (error) {

      toast.error("AI Error");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-3xl font-bold text-gray-800">
            AI FAQ Chatbot
          </h2>

          <p className="text-gray-500 mt-1">
            Ask questions from your FAQs
          </p>

        </div>

        <div className="text-green-600 font-medium text-sm">
          AI answers only from FAQs
        </div>

      </div>

      {/* CHAT AREA */}
      <div className="bg-gray-50 rounded-xl p-4 h-96 overflow-y-auto border mb-5">

        {messages.length === 0 && (

          <div className="h-full flex items-center justify-center text-gray-400 text-center">

            Start chatting with your AI FAQ assistant 🚀

          </div>

        )}

        <div className="space-y-4">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white border text-gray-800"
                }`}
              >

                {msg.content}

              </div>

            </div>

          ))}

          {loading && (

            <div className="flex justify-start">

              <div className="bg-white border px-4 py-3 rounded-2xl">

                Thinking...

              </div>

            </div>

          )}

        </div>

      </div>

      {/* INPUT */}
      <div className="flex flex-col md:flex-row gap-4">

        <textarea
          rows="2"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          className="flex-1 border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={askAI}
          className="bg-green-600 hover:bg-green-700 transition text-white px-8 py-3 rounded-xl"
        >

          Ask AI

        </button>

      </div>

    </div>
  );
}