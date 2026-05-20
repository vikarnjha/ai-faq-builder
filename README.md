# AI FAQ & Knowledge Base Builder

An AI-powered FAQ and Knowledge Base web application where authenticated users can manage their own FAQs and interact with an AI chatbot that answers strictly from their stored data.

---

# 🚀 Live Demo

Frontend: https://your-frontend-url.vercel.app

Backend: https://your-backend-url.onrender.com

---

# ✨ Features

## 🔐 Authentication
- Secure authentication using Clerk
- Protected dashboard routes
- Session management
- Google + Email login support

## 📚 FAQ Management
- Create FAQs
- Read FAQs
- Update FAQs
- Delete FAQs
- Category support
- User-specific FAQ isolation

## 🤖 AI Chatbot
- AI-powered FAQ assistant using Groq LLM
- Answers only from user-provided FAQs
- Hallucination prevention through prompt engineering
- Graceful fallback when answer is unavailable

## 🎨 UI/UX
- Modern responsive dashboard
- Mobile-friendly layout
- Clean card-based design
- Real-time chatbot interface

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Icons
- React Hot Toast

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas
- Mongoose

## Authentication
- Clerk Authentication

## AI
- Groq API
- Llama 3.3 70B Versatile Model

## Deployment
- Vercel (Frontend)
- Render (Backend)

---

# 📂 Project Structure

```txt
ai-faq-builder/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

## Frontend `.env`

```env
VITE_API_URL=your_backend_url
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

---

# 📦 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/vikarnjha/ai-faq-builder.git
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd ../server
npm install
```

---

# ▶️ Run Project Locally

## Start Backend

```bash
cd server
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

## Start Frontend

```bash
cd client
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# 🧠 AI Prompt Engineering

The chatbot is intentionally constrained to answer only from the logged-in user's stored FAQ entries.

## Prompt Strategy
- User FAQs are injected as context
- The model is explicitly instructed:
  - Not to use external knowledge
  - Not to hallucinate
  - To respond with a fallback message when data is unavailable

## Example Fallback

```txt
"I don't know based on your stored FAQs."
```

This ensures:
- AI grounding
- Reduced hallucination
- User-specific contextual responses

---

# 🔒 User Data Isolation

Each FAQ document stores the authenticated Clerk user ID.

Example:

```js
{
  clerkUserId: user.id,
  question,
  answer,
  category
}
```

All database queries are filtered using the logged-in user's ID, ensuring users can only access their own data.

---

# 📱 Responsive Design

The application is fully responsive:
- Desktop sidebar layout
- Mobile top navigation
- Responsive chatbot
- Adaptive cards and grids

---

# 🚀 Deployment

## Frontend Deployment
Deployed using:
- Vercel

## Backend Deployment
Deployed using:
- Render

---

# 📌 Future Improvements

- Semantic search using embeddings
- Vector database integration
- Streaming AI responses
- FAQ search and filtering
- Dark mode
- Chat history persistence

---

# 📄 Submission Notes

This project was built as part of a take-home assignment focused on:
- Authentication
- CRUD operations
- AI integration
- Prompt engineering
- User data isolation

The implementation prioritizes:
- Clean architecture
- Functional completeness
- Fast and responsive UX
- Practical AI grounding

---

# 👨‍💻 Author

**Vikarn Kumar Jha**

- GitHub: https://github.com/vikarnjha
- LinkedIn: https://linkedin.com/in/vikarn-jha