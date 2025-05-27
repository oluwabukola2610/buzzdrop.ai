"use server";
import { GoogleGenAI } from "@google/genai";
const apiKey = process.env.GOOGLE_API_KEY!;

const ai = new GoogleGenAI({ apiKey });

export async function generateTrendingContentIdeas(
  niche: string,
  userPrompt: string
) {
  const prompt = `
You are a viral content strategist AI.

Based on the niche: ${niche} and specific topic: ${userPrompt}, generate 4 **trendy content ideas** that could go viral on social platforms.

Context from user: ${userPrompt}

For each idea:
- Give it a **clear topic title** related to the user's prompt
- Write **4 unique scroll-stopping hooks** that could be used as intros for reels, captions, tweets, or video content
- Hooks should be short, curiosity-driven, and catchy
- Estimate a potential **engagement rate** (as a percentage) based on how likely the idea is to go viral
- Include specific keywords and themes from the user's prompt

**IMPORTANT: Return ONLY valid JSON in this exact format, no extra text:**

[
  {
    "topic": "Topic Title (based on ${userPrompt})",
    "hooks": [
      "Hook 1 incorporating ${niche} elements",
      "Hook 2 related to ${userPrompt}",
      "Hook 3 targeting the specific audience",
      "Hook 4 with trending angle"
    ],
    "engagementRate": "85%",
  }
]`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ text: prompt }],
      config: {
        responseMimeType: "application/json",
        maxOutputTokens: 6000,
        temperature: 0.9,
      },
    });

    if (!response.text) {
      throw new Error("No text in response");
    }
    return JSON.parse(response.text);
  } catch (err) {
    console.error("Gemini trending content generation failed:", err);
    return err;
  }
}
