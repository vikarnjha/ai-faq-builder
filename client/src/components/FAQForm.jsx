import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import { FaCheck, FaTimes } from "react-icons/fa";

export default function FAQForm({
  user,
  fetchFaqs,
  editingFaq,
  setEditingFaq,
}) {

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [category, setCategory] =
    useState("");

  useEffect(() => {

    if (editingFaq) {

      setQuestion(editingFaq.question);
      setAnswer(editingFaq.answer);
      setCategory(editingFaq.category);

    }

  }, [editingFaq]);

  const clearForm = () => {

    setQuestion("");
    setAnswer("");
    setCategory("");

    setEditingFaq(null);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!question || !answer) {
      return toast.error(
        "Question and Answer required"
      );
    }

    try {

      if (editingFaq) {

        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/faqs/${editingFaq._id}`,
          {
            question,
            answer,
            category,
          }
        );

        toast.success("FAQ Updated");

      } else {

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/faqs`,
          {
            clerkUserId: user.id,
            question,
            answer,
            category,
          }
        );

        toast.success("FAQ Added");

      }

      clearForm();

      fetchFaqs();

    } catch (error) {

      toast.error("Something went wrong");
        console.error(error);

    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-5 xl:sticky xl:top-6">

      <div className="flex flex-col gap-3.5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-indigo-300">
            FAQ builder
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            {editingFaq ? "Refine an FAQ" : "Create a new FAQ"}
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Write concise questions and answers so the assistant can respond
            with a polished, reliable tone.
          </p>
        </div>

        <div className="inline-flex w-max shrink-0 items-center whitespace-nowrap rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs font-medium text-slate-300">
          {editingFaq ? "Editing mode" : "New entry"}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-5 space-y-4"
      >

        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
            Question
          </label>

          <input
            type="text"
            placeholder="Enter question"
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
            Answer
          </label>

          <textarea
            rows="7"
            placeholder="Enter answer"
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
            Category
          </label>

          <input
            type="text"
            placeholder="Category (optional)"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="flex flex-col gap-3 pt-1.5 sm:flex-row">

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-500 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-400"
          >

            <FaCheck />

            {editingFaq
              ? "Update FAQ"
              : "Add FAQ"}

          </button>

          {editingFaq && (

            <button
              type="button"
              onClick={clearForm}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >

              <FaTimes />

              Cancel
            </button>

          )}

        </div>

      </form>

    </div>
  );
}