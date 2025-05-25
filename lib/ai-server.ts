"use server";
import { GoogleGenAI } from "@google/genai";
const Apikey = process.env.GOOGLE_API_KEY;

const ai = new GoogleGenAI({ apiKey: Apikey });
export async function generateAIContent(
  platforms: string,
  vibe: string,
  contentType: string,
  contentData: string
) {
  const contents = [
    {
      text: `Please generate captions and hashtags based on the content in the video for these platforms ${platforms} with this ${vibe}`,
    },
    {
      inlineData: {
        mimeType: contentType,
        data: contentData,
      },
    },
  ];

  const systemPrompt = `
 Generate content only for the following platforms: ${platforms}. Use a ${vibe} vibe throughout the content.
Your task is to:
1. Analyze the provided video/image content
2. Generate engaging captions and relevant hashtags
3. Adapt the tone and style to match the specified ${vibe} vibe
4. Format the content appropriately for each selected platform

Platform-specific rules:

Instagram:
- Maximum 4 hashtags
- Include trending hashtags: #instagood #instagram #photooftheday #love #instadaily
- Mix popular hashtags with niche-specific ones
- Ideal caption length: 150-220 characters

TikTok:
- Maximum 3-4 hashtags
- Always include: #fyp #foryou #viral
- Add trending sound-related hashtags if applicable
- Use emoji-rich captions
- Conversational and engaging tone

Twitter/X:
- Maximum 3 hashtags
- Focus on trending topics
- Short, punchy captions
- Character limit: 280

LinkedIn:
- Maximum 3 hashtags
- Use industry-specific hashtags
- Professional tone
- Include relevant business hashtags: #business #professional #networking

Facebook:
- Maximum 2-3 hashtags
- Focus on engagement-driving content
- Include call-to-actions
- Optimal length: 100-250 characters
- Popular tags: #facebook #trending #viral

General rules:
- Maintain the ${vibe} vibe consistently
- Use platform-appropriate language
- Ensure hashtags match content theme
- Keep content authentic and engaging

Response format:
{
    "[platform_name]": {
      "caption": "your caption here",
      "hashtags": ["tag1", "tag2", "tag3"]
    }

}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents,
    config: {
      systemInstruction: systemPrompt,
      maxOutputTokens: 6000,
      temperature: 0.95,
      responseMimeType: "application/json",
  
    },
  });
  console.log(response.text);
  if (!response.text) {
    throw new Error("No content generated. Please check the input parameters.");
  }

  return response.text;
}
