import axios from "axios";

import toast from "react-hot-toast";

export default function FAQList({
    faqs,
    fetchFaqs,
    setEditingFaq,
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

        return (
            <div className="bg-white rounded-2xl p-10 shadow-sm text-center">

                <h2 className="text-2xl font-bold text-gray-700">
                    No FAQs Yet
                </h2>

                <p className="text-gray-500 mt-3">
                    Add your first FAQ to train the AI assistant.
                </p>

            </div>
        );
    }


    return (
        <div className="space-y-5">

            {faqs.map((faq) => (

                <div
                    key={faq._id}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                >

                    <h2 className="text-2xl font-bold text-gray-800">
                        {faq.question}
                    </h2>

                    <p className="mt-3 text-gray-600 leading-relaxed">
                        {faq.answer}
                    </p>

                    <p className="mt-3 text-sm text-blue-600 font-medium">
                        {faq.category}
                    </p>

                    <div className="flex gap-3 mt-5">

                        <button
                            onClick={() =>
                                setEditingFaq(faq)
                            }
                            className="bg-yellow-400 hover:bg-yellow-500 transition text-white px-5 py-2 rounded-lg"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                deleteFaq(faq._id)
                            }
                            className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-lg"
                        >
                            Delete
                        </button>

                    </div>

                </div>
            ))}

        </div>
    );
}