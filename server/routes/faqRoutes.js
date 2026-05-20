const router = require("express").Router();

const Faq = require("../models/Faq");


// CREATE FAQ
router.post("/", async (req, res) => {
  try {

    const faq = await Faq.create(req.body);

    res.status(201).json(faq);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});


// GET USER FAQS
router.get("/:userId", async (req, res) => {
  try {

    const faqs = await Faq.find({
      clerkUserId: req.params.userId,
    });

    res.json(faqs);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});


// UPDATE FAQ
router.put("/:id", async (req, res) => {
  try {

    const updatedFaq =
      await Faq.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(updatedFaq);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});


// DELETE FAQ
router.delete("/:id", async (req, res) => {
  try {

    await Faq.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "FAQ Deleted",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});

module.exports = router;