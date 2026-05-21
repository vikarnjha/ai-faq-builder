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
  FaBars,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { MdDashboard } from "react-icons/md";

import { useCallback, useEffect, useState } from "react";

import axios from "axios";

import FAQForm from "../components/FAQForm";
import FAQList from "../components/FAQList";
import ChatBox from "../components/ChatBox";

import { Toaster } from "react-hot-toast";

export default function Dashboard() {

  const { user } = useUser();

  const [faqs, setFaqs] = useState([]);

  const [loadingFaqs, setLoadingFaqs] = useState(true);

  const [editingFaq, setEditingFaq] =
    useState(null);

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [activeSection, setActiveSection] = useState("overview");

  const fetchFaqs = useCallback(async () => {

    if (!user?.id) {
      return;
    }

    try {

      setLoadingFaqs(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/faqs/${user.id}`
      );

      setFaqs(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoadingFaqs(false);

    }
  }, [user]);

  useEffect(() => {

    if (!user?.id) {
      return;
    }

    const loadFaqs = async () => {
      await fetchFaqs();
    };

    void loadFaqs();

  }, [user?.id, fetchFaqs]);

  useEffect(() => {
    const syncActiveSection = () => {
      const currentHash = window.location.hash.replace("#", "");
      setActiveSection(currentHash || "overview");
    };

    syncActiveSection();
    window.addEventListener("hashchange", syncActiveSection);

    return () => {
      window.removeEventListener("hashchange", syncActiveSection);
    };
  }, []);

  const firstName =
    user?.firstName ||
    user?.fullName ||
    "there";

  const uniqueCategories = new Set(
    faqs
      .map((faq) => faq.category?.trim())
      .filter(Boolean)
      .map((category) => category.toLowerCase())
  ).size;

  const navItems = [
    {
      label: "Overview",
      href: "#overview",
      icon: MdDashboard,
    },
    {
      label: "Builder",
      href: "#builder",
      icon: FaQuestionCircle,
    },
    {
      label: "AI Chat",
      href: "#ai-chat",
      icon: FaRobot,
    },
  ];

  const stats = [
    {
      label: "FAQ entries",
      value: faqs.length,
      note: loadingFaqs
        ? "Syncing your knowledge base"
        : faqs.length > 0
          ? "Live content ready for the AI"
          : "Add your first answer to get started",
      icon: MdDashboard,
    },
    {
      label: "Categories",
      value: uniqueCategories,
      note: "Organized topics for cleaner answers",
      icon: FaQuestionCircle,
    },
    {
      label: "Assistant status",
      value: faqs.length > 0 ? "Ready" : "Idle",
      note: faqs.length > 0
        ? "The chatbot can answer from your FAQs"
        : "Waiting for FAQ content",
      icon: FaRobot,
    },
    {
      label: "Editor state",
      value: editingFaq ? "Editing" : "Ready",
      note: editingFaq
        ? "Updating an existing FAQ"
        : "Create a new FAQ entry",
      icon: FaBars,
    },
  ];

  const renderSkeletonCard = (index) => (
    <div
      key={index}
      className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="h-4 w-28 rounded-full bg-white/10 animate-pulse" />
        <div className="h-10 w-10 rounded-2xl bg-white/10 animate-pulse" />
      </div>
      <div className="mt-5 h-8 w-20 rounded-2xl bg-white/10 animate-pulse" />
      <div className="mt-4 h-4 w-full rounded-full bg-white/10 animate-pulse" />
      <div className="mt-3 h-4 w-4/5 rounded-full bg-white/10 animate-pulse" />
    </div>
  );

  return (
    <>
      <SignedIn>

        <div className="min-h-screen bg-[#0f172a] text-slate-100 scroll-smooth">

          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute left-0 top-40 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
          </div>

          <Toaster />

          <div className="relative flex min-h-screen flex-col md:flex-row">

            <div className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl md:hidden">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-indigo-300 shadow-lg shadow-black/20">
                    <FaRobot />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">AI FAQ Builder</p>
                    <p className="text-xs text-slate-400">Modern knowledge dashboard</p>
                  </div>
                </div>

                <UserButton afterSignOutUrl="/" />
              </div>

              <div className="flex gap-2 overflow-x-auto px-4 pb-4">
                {navItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-white"
                    >
                      <Icon className="text-xs text-indigo-300" />
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>

            <aside
              className={`hidden md:flex md:sticky md:top-0 md:h-screen md:flex-col md:border-r md:border-white/10 md:bg-slate-950/80 md:backdrop-blur-2xl md:transition-all md:duration-300 ${
                sidebarCollapsed ? "md:w-24" : "md:w-72"
              }`}
            >
              <div className={`flex h-full flex-col ${sidebarCollapsed ? "p-4" : "p-6"}`}>
                <div className={`flex ${sidebarCollapsed ? "flex-col items-center gap-3" : "items-center justify-between gap-4"}`}>
                  <div className={`flex items-center overflow-hidden ${sidebarCollapsed ? "justify-center" : "gap-3"}`}>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-linear-to-br from-indigo-500/20 to-violet-500/20 text-indigo-200 shadow-lg shadow-black/20">
                      <FaRobot />
                    </div>

                    <div className={sidebarCollapsed ? "md:hidden" : "md:block"}>
                      <h1 className="text-lg font-semibold tracking-tight text-white">AI FAQ</h1>
                      <p className="text-xs text-slate-400">Knowledge system</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSidebarCollapsed((current) => !current)
                    }
                    className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-white"
                    aria-label="Collapse sidebar"
                  >
                    {sidebarCollapsed ? (
                      <FaChevronRight className="text-sm" />
                    ) : (
                      <FaChevronLeft className="text-sm" />
                    )}
                  </button>
                </div>

                <nav className="mt-10 space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.href.replace("#", "");

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className={`group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 transition-all hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-white ${
                          sidebarCollapsed ? "md:justify-center md:px-3" : ""
                        } ${
                          isActive
                            ? "border-indigo-400/40 bg-indigo-500/15 text-white shadow-lg shadow-indigo-500/10"
                            : ""
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <Icon className={`shrink-0 text-base transition ${isActive ? "text-indigo-200" : "text-indigo-300 group-hover:text-indigo-200"}`} />
                        <span className={sidebarCollapsed ? "md:hidden" : "md:block"}>
                          {item.label}
                        </span>
                      </a>
                    );
                  })}
                </nav>

                <div className={`mt-auto pt-8 ${sidebarCollapsed ? "px-0" : ""}`}>
                  <div className={`rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-black/20 ${sidebarCollapsed ? "p-2.5" : "p-4"}`}>
                    <div className={`flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"}`}>
                      <UserButton afterSignOutUrl="/" />

                      <div className={sidebarCollapsed ? "md:hidden" : "md:block"}>
                        <p className="text-sm font-medium text-white">{firstName}</p>

                        <p className="max-w-45 truncate text-xs text-slate-400">
                          {user?.primaryEmailAddress?.emailAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </aside>

            <main className="relative flex-1 px-4 py-6 md:px-6 md:py-8 lg:px-8">
              <section
                id="overview"
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-8"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-3xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.32em] text-indigo-200">
                      SaaS AI dashboard
                    </span>

                    <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                      Welcome back, {firstName}
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                      Manage your FAQs, shape the assistant&apos;s knowledge, and
                      keep your support experience polished in one place.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4 shadow-xl shadow-black/20 md:p-5">
                    <div className="flex items-center gap-3">
                      <UserButton afterSignOutUrl="/" />

                      <div>
                        <p className="text-sm font-medium text-white">{firstName}</p>
                        <p className="max-w-60 truncate text-sm text-slate-400">
                          {user?.primaryEmailAddress?.emailAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {loadingFaqs && faqs.length === 0
                  ? Array.from({ length: 4 }).map((_, index) =>
                      renderSkeletonCard(index)
                    )
                  : stats.map((stat) => {
                      const Icon = stat.icon;

                      return (
                        <div
                          key={stat.label}
                          className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/10"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                                {stat.label}
                              </p>

                              <p className="mt-3 text-3xl font-semibold text-white">
                                {stat.value}
                              </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 text-indigo-300">
                              <Icon />
                            </div>
                          </div>

                          <p className="mt-4 text-sm leading-6 text-slate-400">
                            {stat.note}
                          </p>
                        </div>
                      );
                    })}
              </section>

              <section
                id="builder"
                className="mt-8 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]"
              >
                <FAQForm
                  user={user}
                  fetchFaqs={fetchFaqs}
                  editingFaq={editingFaq}
                  setEditingFaq={setEditingFaq}
                />

                <div id="library" className="self-start flex h-fit min-h-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-xl">
                  <div className="max-h-[calc(100vh-13rem)] overflow-y-auto pr-1.5 pb-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600/70 hover:scrollbar-thumb-slate-500/80">
                    <FAQList
                      faqs={faqs}
                      fetchFaqs={fetchFaqs}
                      setEditingFaq={setEditingFaq}
                      loading={loadingFaqs}
                    />
                  </div>
                </div>
              </section>

              <section id="ai-chat" className="mt-8">
                <ChatBox faqs={faqs} />
              </section>

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