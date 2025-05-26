"use server";
import { GoogleGenAI } from "@google/genai";
const apiKey = process.env.GOOGLE_API_KEY!;

const ai = new GoogleGenAI({ apiKey });

export async function generateTrendingContentIdeas(niche: string) {
  const prompt = `
You are a viral content strategist AI.

Based on the niche: **${niche}**, generate 4 **trendy content ideas** that could go viral on social platforms.

For each idea:
- Give it a **clear topic title**
- Write **4 unique scroll-stopping hooks** that could be used as intros for reels, captions, tweets, or video content
- Hooks should be short, curiosity-driven, and catchy
- Estimate a potential **engagement rate** (as a percentage) based on how likely the idea is to go viral

**IMPORTANT: Return ONLY valid JSON in this exact format, no extra text:**

[
  {
    "topic": "Example Topic Title",
    "hooks": [
      "Hook 1 example",
      "Hook 2 example",
      "Hook 3 example",
      "Hook 4 example"
    ],
    "engagementRate": "78%"
  },
  {
    "topic": "Another Topic Title",
    "hooks": [
      "Hook 1 example",
      "Hook 2 example",
      "Hook 3 example",
      "Hook 4 example"
    ],
    "engagementRate": "85%"
  }
]
`;

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
    return undefined;
  }
}
