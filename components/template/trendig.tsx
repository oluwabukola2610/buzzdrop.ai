import React, { useState } from "react";
import {
  TrendingUp,
  Flame,
  RefreshCw,
  Sparkles,
  Target,
  Zap,
  Eye,
  Heart,
  MessageCircle,
} from "lucide-react";
import { generateTrendingContentIdeas } from "@/lib/openai";

const niches = [
  { id: "tech", name: "Tech", icon: "💻" },
  { id: "fitness", name: "Fitness", icon: "💪" },
  { id: "food", name: "Food", icon: "🍕" },
  { id: "travel", name: "Travel", icon: "✈️" },
  { id: "finance", name: "Finance", icon: "💰" },
  { id: "lifestyle", name: "Lifestyle", icon: "🌟" },
  { id: "business", name: "Business", icon: "📈" },
  { id: "health", name: "Health", icon: "🏥" },
];

const TrendingContentDisplay = () => {
  const [selectedNiche, setSelectedNiche] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
 

const handlegenerate = async () => {
  try {
    setIsGenerating(true);
    const res = await generateTrendingContentIdeas(selectedNiche);
    setGeneratedContent(res); 
    console.log(res);
  } catch (error) {
    console.error("Error generating content:", error);
    toast({
      title: "Error generating content",
      description: "Please try again later.",
      variant: "destructive",
    });
  } finally {
    setIsGenerating(false);
  }
};

  const getEngagementColor = (engagement) => {
    const percent = parseFloat(engagement);
    if (percent >= 7) return "text-green-600 bg-green-100 dark:bg-green-900/20";
    if (percent >= 5)
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
    return "text-red-600 bg-red-100 dark:bg-red-900/20";
  };

  const getEngagementIcon = (engagement) => {
    const percent = parseFloat(engagement);
    if (percent >= 7) return <TrendingUp className="w-3 h-3" />;
    if (percent >= 5) return <Eye className="w-3 h-3" />;
    return <Heart className="w-3 h-3" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Trending Content Explorer
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Discover viral topics and high-engagement hooks powered by AI
          </p>
        </div>

        {/* Niche Selection */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Target className="w-7 h-7 text-violet-500" />
              Select Your Niche
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Choose a niche to get targeted content ideas and engagement
              insights
            </p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {niches.map((niche) => (
                <button
                  key={niche.id}
                  onClick={() => setSelectedNiche(niche.id)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 text-center group hover:scale-105 ${
                    selectedNiche === niche.id
                      ? "border-violet-500 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 shadow-lg"
                      : "border-gray-200 dark:border-gray-600 hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-md"
                  }`}
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                    {niche.icon}
                  </div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">
                    {niche.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Flame className="w-7 h-7 text-violet-500" />
                Trending Topics & Hooks
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                AI-powered content suggestions with engagement predictions
              </p>
            </div>
            <button
              onClick={handlegenerate}
              disabled={isGenerating}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center gap-3 shadow-lg hover:shadow-xl"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Refresh Ideas
                </>
              )}
            </button>
          </div>

          {/* <div className="p-8">
            <div className="space-y-6">
              {generatedContent.trending.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.topic}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${getEngagementColor(
                            item.engagement
                          )}`}
                        >
                          {getEngagementIcon(item.engagement)}
                          {item.engagement} Engagement
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {item.hooks.length} hooks available
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      High-Engagement Hooks:
                    </h4>
                    {item.hooks.map((hook, hookIndex) => (
                      <div
                        key={hookIndex}
                        className="bg-white dark:bg-gray-600 rounded-xl p-4 border border-gray-100 dark:border-gray-500 hover:border-violet-200 dark:hover:border-violet-500 transition-all duration-200 group"
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-gray-800 dark:text-gray-200 flex-1 leading-relaxed">
                            &#34;{hook}&ldquo;
                          </p>
                          <button className="ml-4 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 hover:from-violet-600 hover:to-purple-600 whitespace-nowrap">
                            Use Hook
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>

        {/* AI Insights */}
        {/* <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Brain className="w-7 h-7 text-violet-500" />
              AI Performance Insights
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Real-time analytics and engagement predictions
            </p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  89%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Trend Match Rate
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  12.4K
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Avg Reach
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  7.1%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Avg Engagement
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">94%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Accuracy Score
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TrendingContentDisplay;
