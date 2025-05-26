"use client";
import { useState } from "react";
import Generate from "./GeneratePage";
import { Sparkles, TrendingUp } from "lucide-react";
import TrendingContentDisplay from "../TrendingTab";
const GeneratePage = () => {
  const [activeMainTab, setActiveMainTab] = useState("generate");
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            AI Content Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transform your content into engaging social media posts with
            AI-powered captions and hashtags
          </p>
        </div>
        <div className="mb-8">
          <div className="flex bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 max-w-md mx-auto">
            {[
              { id: "generate", name: "Generate Content", icon: Sparkles },
              { id: "trending", name: "Trending Ideas", icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMainTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeMainTab === tab.id
                    ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
        {activeMainTab === "generate" && <Generate />}
        {activeMainTab === "trending" && <TrendingContentDisplay />}
      </div>
    </main>
  );
};

export default GeneratePage;
