import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

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
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">

        {editingFaq
          ? "Edit FAQ"
          : "Add FAQ"}

      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Enter question"
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          rows="5"
          placeholder="Enter answer"
          value={answer}
          onChange={(e) =>
            setAnswer(e.target.value)
          }
          className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-3">

          <button
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl"
          >

            {editingFaq
              ? "Update FAQ"
              : "Add FAQ"}

          </button>

          {editingFaq && (

            <button
              type="button"
              onClick={clearForm}
              className="bg-gray-300 hover:bg-gray-400 transition px-6 py-3 rounded-xl"
            >
              Cancel
            </button>

          )}

        </div>

      </form>

    </div>
  );
}