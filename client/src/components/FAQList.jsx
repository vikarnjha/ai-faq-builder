import axios from "axios";

import toast from "react-hot-toast";

import {
    FaEdit,
    FaTrash,
    FaRegFolderOpen,
    FaRegLightbulb,
} from "react-icons/fa";

export default function FAQList({
    faqs,
    fetchFaqs,
    setEditingFaq,
    loading = false,
}) {

    const deleteFaq = async (id) => {

        try {

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/faqs/${id}`
            );

            toast.success("FAQ Deleted");

            fetchFaqs();

        } catch (error) {

            toast.error("Delete Failed");
            console.error(error);
        }
    };
    if (faqs.length === 0) {

        if (loading) {

            return (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <div className="h-4 w-28 rounded-full bg-white/10 animate-pulse" />
                            <div className="mt-3 h-8 w-52 max-w-full rounded-2xl bg-white/10 animate-pulse" />
                        </div>

                        <div className="h-10 w-10 rounded-2xl bg-white/10 animate-pulse" />
                    </div>

                    <div className="mt-6 space-y-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-white/10 bg-slate-950/50 p-5"
                            >
                                <div className="h-4 w-32 rounded-full bg-white/10 animate-pulse" />
                                <div className="mt-4 h-6 w-4/5 rounded-full bg-white/10 animate-pulse" />
                                <div className="mt-3 h-4 w-full rounded-full bg-white/10 animate-pulse" />
                                <div className="mt-3 h-4 w-3/4 rounded-full bg-white/10 animate-pulse" />
                                <div className="mt-5 flex gap-3">
                                    <div className="h-10 w-24 rounded-2xl bg-white/10 animate-pulse" />
                                    <div className="h-10 w-24 rounded-2xl bg-white/10 animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );

        }

        return (
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center shadow-2xl shadow-black/20 backdrop-blur-xl">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-200">
                    <FaRegFolderOpen className="text-xl" />
                </div>

                <h2 className="mt-5 text-2xl font-semibold text-white">
                    No FAQs Yet
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                    Add your first FAQ to train the assistant and unlock contextual answers.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/50 px-4 py-2 text-xs font-medium text-slate-300">
                    <FaRegLightbulb className="text-indigo-300" />
                    Keep answers short, specific, and reusable.
                </div>

            </div>
        );
    }


    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-4">

            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
                        Knowledge library
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                        Saved FAQs
                    </h2>
                </div>

                <div className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs font-medium text-slate-300">
                    {faqs.length} items
                </div>
            </div>

            <div className="mt-4 space-y-4 pb-2">

            {faqs.map((faq) => (

                <article
                    key={faq._id}
                    className="group rounded-2xl border border-white/10 bg-slate-950/40 p-4.5 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-slate-900/70 md:p-5"
                >

                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
                                FAQ {faqs.indexOf(faq) + 1}
                            </p>

                            <h2 className="mt-2 text-lg font-semibold leading-7 text-white md:text-xl">
                                {faq.question}
                            </h2>
                        </div>

                        <div className="shrink-0 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-200">
                            {faq.category || "Uncategorized"}
                        </div>
                    </div>

                    <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                        {faq.answer}
                    </p>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">

                        <button
                            onClick={() =>
                                setEditingFaq(faq)
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4.5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-white"
                        >
                            <FaEdit />

                            Edit
                        </button>

                        <button
                            onClick={() =>
                                deleteFaq(faq._id)
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4.5 py-2.5 text-sm font-medium text-rose-200 transition hover:border-rose-400/40 hover:bg-rose-500/20 hover:text-white"
                        >
                            <FaTrash />

                            Delete
                        </button>

                    </div>

                </article>
            ))}

            </div>

        </div>
    );
}