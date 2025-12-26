import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    const submitRes = await fetch(
      "https://aihorde.net/api/v2/generate/async",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.AI_HORDE_API_KEY,
          "User-Agent": "AI-Image-App:1.0 (by Lavanya)"
        },
        body: JSON.stringify({
          prompt,
          nsfw: false,
          models: ["Deliberate"],
          params: {
            steps: 10,
            width: 512,
            height: 512
          }
        })
      }
    );

    const data = await submitRes.json();

    if (!data.id) {
      return res.status(500).json({ error: "Failed to submit job" });
    }

    // 🚀 Return immediately
    return res.status(200).json({ jobId: data.id });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
