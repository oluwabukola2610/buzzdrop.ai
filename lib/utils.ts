import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const platforms = [
  { value: "instagram", label: "Instagram", icon: "📸" },
  { value: "tiktok", label: "TikTok", icon: "🎵" },
  { value: "twitter", label: "Twitter/X", icon: "🐦" },
  { value: "linkedin", label: "LinkedIn", icon: "💼" },
];

export const vibes = [
  {
    value: "professional",
    label: "Professional",
    icon: "💼",
    color: "bg-blue-100 dark:bg-blue-900",
  },
  {
    value: "casual",
    label: "Casual",
    icon: "😊",
    color: "bg-green-100 dark:bg-green-900",
  },
  {
    value: "humorous",
    label: "Humorous",
    icon: "😄",
    color: "bg-yellow-100 dark:bg-yellow-900",
  },
  {
    value: "informative",
    label: "Informative",
    icon: "📚",
    color: "bg-purple-100 dark:bg-purple-900",
  },
  {
    value: "inspirational",
    label: "Inspirational",
    icon: "✨",
    color: "bg-pink-100 dark:bg-pink-900",
  },
  {
    value: "promotional",
    label: "Promotional",
    icon: "🎯",
    color: "bg-orange-100 dark:bg-orange-900",
  },
];

 export const niches = [
   { id: "tech", name: "Tech", icon: "💻" },
   { id: "fitness", name: "Fitness", icon: "💪" },
   { id: "food", name: "Food", icon: "🍕" },
   { id: "travel", name: "Travel", icon: "✈️" },
   { id: "finance", name: "Finance", icon: "💰" },
   { id: "lifestyle", name: "Lifestyle", icon: "🌟" },
   { id: "business", name: "Business", icon: "📈" },
   { id: "health", name: "Other", icon: "✏️" },
 ];

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}