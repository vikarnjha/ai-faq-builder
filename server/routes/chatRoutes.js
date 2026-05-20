const router = require("express").Router();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {

  try {

    const { question, faqs } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "Question required",
      });
    }

    const context = (faqs || [])
      .map((faq) => `
Question: ${faq.question}
Answer: ${faq.answer}
Category: ${faq.category}
`)
      .join("\n");

    const prompt = `
You are a private FAQ assistant.

You MUST answer ONLY using the FAQ data below.

Rules:
1. Do NOT use outside knowledge
2. Do NOT hallucinate
3. If answer is unavailable say:
"I don't know based on your stored FAQs."

FAQ DATA:
${context}

USER QUESTION:
${question}
`;

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    res.json({
      answer:
        completion.choices[0].message.content,
    });

  } catch (error) {

    console.log(
      "CHAT ERROR:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "AI request failed",
    });
  }
});

module.exports = router;