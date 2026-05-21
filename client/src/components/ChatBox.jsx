import { useEffect, useRef, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  FaRobot,
  FaUser,
  FaPaperPlane,
  FaRegCommentDots,
  FaRegLightbulb,
} from "react-icons/fa";

export default function ChatBox({ faqs }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const promptSuggestions = [
    "What is our refund policy?",
    "How do I update my account?",
    "Summarize the onboarding steps.",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  const askAI = async () => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return toast.error("Please ask something");
    }

    if (loading) {
      return;
    }

    const userMessage = {
      role: "user",
      content: trimmedQuestion,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chat`,
        {
          question: trimmedQuestion,
          faqs,
        }
      );

      const aiMessage = {
        role: "ai",
        content: res.data.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setQuestion("");
    } catch (error) {
      toast.error("AI Error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      askAI();
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-3.5 border-b border-white/10 p-5 md:p-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.32em] text-indigo-200">
            <FaRobot className="text-[10px]" />
            AI Assistant
          </p>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            AI FAQ Chatbot
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Ask questions and the assistant will answer from the FAQ library
            with a polished support-style tone.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 self-start rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-200">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Answers grounded in your FAQs
        </div>
      </div>

      <div className="space-y-4 p-5 md:p-5">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-slate-500">
          <span>Conversation</span>
          <span>{messages.length} messages</span>
        </div>

        <div className="h-112 overflow-y-auto rounded-3xl border border-white/10 bg-slate-950/50 p-4 md:p-5">
          {messages.length === 0 && !loading && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-200">
                <FaRegCommentDots className="text-2xl" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                Start chatting with your AI assistant
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                Try a quick question below or ask something specific about your
                help content.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {promptSuggestions.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setQuestion(prompt)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 transition hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300">
                <FaRegLightbulb className="text-indigo-300" />
                Auto-scroll and typing indicators are enabled
              </div>
            </div>
          )}

          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role !== "user" && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-200">
                    <FaRobot />
                  </div>
                )}

                <div
                  className={`max-w-[88%] rounded-3xl px-4 py-3.5 text-sm leading-7 shadow-lg shadow-black/10 md:max-w-[76%] ${
                    msg.role === "user"
                      ? "rounded-br-md border border-indigo-400/20 bg-linear-to-r from-indigo-500 to-violet-500 text-white"
                      : "rounded-bl-md border border-white/10 bg-slate-900/80 text-slate-100"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] opacity-80">
                    {msg.role === "user" ? (
                      <>
                        <FaUser className="text-[10px]" />
                        You
                      </>
                    ) : (
                      <>
                        <FaRobot className="text-[10px]" />
                        AI
                      </>
                    )}
                  </div>

                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>

                {msg.role === "user" && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200">
                    <FaUser />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-end gap-3 justify-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-200">
                  <FaRobot />
                </div>

                <div className="rounded-3xl rounded-bl-md border border-white/10 bg-slate-900/80 px-4 py-3.5 text-slate-100 shadow-lg shadow-black/10">
                  <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-slate-400">
                    AI typing
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-300 animate-bounce [animation-delay:-0.2s]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-violet-300 animate-bounce [animation-delay:-0.1s]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-300 animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-4 shadow-xl shadow-black/10">
          <div className="flex items-center justify-between gap-4 pb-3">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
              Ask the assistant
            </p>

            <span className="text-xs text-slate-400">
              Shift + Enter for a new line
            </span>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
            <textarea
              rows="3"
              placeholder="Ask a question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-30 flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/20"
            />

            <button
              type="button"
              onClick={askAI}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 px-6 py-4 font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:from-indigo-400 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
            >
              <FaPaperPlane />

              {loading ? "Thinking..." : "Ask AI"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
