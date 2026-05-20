import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

import {
  FaRobot,
  FaQuestionCircle,
} from "react-icons/fa";

import { MdDashboard } from "react-icons/md";

import { useEffect, useState } from "react";

import axios from "axios";

import FAQForm from "../components/FAQForm";
import FAQList from "../components/FAQList";
import ChatBox from "../components/ChatBox";

import { Toaster } from "react-hot-toast";

export default function Dashboard() {

  const { user } = useUser();

  const [faqs, setFaqs] = useState([]);

  const [editingFaq, setEditingFaq] =
    useState(null);

  const fetchFaqs = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/faqs/${user.id}`
      );

      setFaqs(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    if (user) {
      fetchFaqs();
    }

  }, [user]);

  return (
    <>
      <SignedIn>

        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

          <Toaster />

          {/* MAIN LAYOUT */}
          <div className="flex flex-col md:flex-row">

            {/* SIDEBAR */}
            <aside className="w-full md:w-64 bg-gradient-to-b from-blue-950 to-black text-white md:min-h-screen p-4 md:p-6">

              {/* TOP */}
              <div className="flex md:flex-col md:items-start items-center justify-between">

                {/* LOGO */}
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <FaRobot />
                  AI FAQ
                </h1>

                {/* USER */}
                <div className="md:hidden">
                  <UserButton afterSignOutUrl="/" />
                </div>

              </div>


              {/* DESKTOP USER INFO */}
              <div className="hidden md:flex mt-16 items-center gap-3">

                <UserButton afterSignOutUrl="/" />

                <div>
                  <h2 className="font-semibold">
                    {user?.firstName}
                  </h2>

                  <p className="text-sm text-gray-300 break-all">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>

              </div>

            </aside>
            {/* MAIN CONTENT */}
            <main className="flex-1 p-4 md:p-8">

              {/* HEADER */}
              <div className="mb-8">

                <h1 className="text-4xl font-bold text-gray-800">
                  Welcome back 👋
                </h1>

                <p className="text-gray-500 mt-2">
                  Manage your FAQs and AI assistant
                </p>

              </div>

              {/* GRID */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                <FAQForm
                  user={user}
                  fetchFaqs={fetchFaqs}
                  editingFaq={editingFaq}
                  setEditingFaq={setEditingFaq}
                />

                <FAQList
                  faqs={faqs}
                  fetchFaqs={fetchFaqs}
                  setEditingFaq={setEditingFaq}
                />

              </div>

              {/* CHAT */}
              <div className="mt-8">

                <ChatBox faqs={faqs} />

              </div>

            </main>

          </div>

        </div>

      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}