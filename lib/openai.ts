import { OpenAI } from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface TrendingTopic {
  topic: string;
  trend: string;
  engagement: string;
  posts: string;
  growth: string;
  contentIdeas: string[];
}

export interface ViralTemplate {
  title: string;
  format: string;
  virality: number;
  hooks: string[];
}

export interface TrendingContent {
  trending: TrendingTopic[];
  viral: ViralTemplate[];
}

export async function OpenAIStream(prompt: string): Promise<TrendingContent> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a social media trends expert that provides content ideas.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI Stream Error:", error);
    throw error;
  }
}
