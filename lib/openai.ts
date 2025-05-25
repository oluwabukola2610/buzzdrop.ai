"use server";
import { OpenAI } from "openai";

export async function generateTrendingContentIdeas(niche: string) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const prompt = `
You are a viral content strategist AI.

Based on the niche: **${niche}**, generate 4 **trendy content ideas** that could go viral on social platforms.

For each idea:
- Give it a **clear topic title**
- Write **4 unique scroll-stopping hooks** that could be used as intros for reels, captions, tweets, or video content
- Hooks should be short, curiosity-driven, and catchy

**Output format (JSON only)**:
[
  {
    "topic": "The Rise of AI Tools in Everyday Life",
    "hooks": [
      "You're using AI every day... without knowing it 🤯",
      "This tool is replacing 3 full-time jobs 💼",
      "AI isn’t the future. It’s already running your life.",
      "Watch this before you apply to another job 👀"
    ]
  },
  ...
]
`;

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You create viral, platform-native content ideas tailored to a niche, formatted for short-form video, captions, and tweets.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.9,
    response_format: { type: "json_object" },
  });

  const raw = res.choices[0]?.message?.content;
  console.log(raw);
  if (!raw) throw new Error("No response from OpenAI");

  return JSON.parse(raw);
}
