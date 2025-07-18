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
import { niches } from "@/lib/utils";



interface ContentIdea {
  topic: string;
  hooks: string[];
  engagementRate: string;
}
const TrendingContentDisplay = () => {
  const [selectedNiche, setSelectedNiche] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<ContentIdea[]>([]);
  const [userPrompt, setuserPrompt] = useState("");
  const handlegenerate = async () => {
    try {
      setIsGenerating(true);
      const res = await generateTrendingContentIdeas(selectedNiche, userPrompt);
      setGeneratedContent(res || []);
      console.log(res);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getEngagementColor = (engagement) => {
    const percent = parseFloat(engagement);
    if (percent >= 80)
      return "text-green-600 bg-green-100 dark:bg-green-900/20";
    if (percent >= 50)
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
    return "text-red-600 bg-red-100 dark:bg-red-900/20";
  };

  const getEngagementIcon = (engagement) => {
    const percent = parseFloat(engagement);
    if (percent >= 80) return <TrendingUp className="w-3 h-3" />;
    if (percent >= 50) return <Eye className="w-3 h-3" />;
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
                  onClick={() => setSelectedNiche(niche.name)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 text-center group hover:scale-105 ${
                    selectedNiche === niche.name
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
          {selectedNiche === "Other" && (
            <div className="p-8">
              <div className="relative mt-4 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-violet-500" />
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Describe Your Custom Niche
                  </label>
                </div>
                <div className="relative">
                  <textarea
                    value={userPrompt}
                    onChange={(e) => setuserPrompt(e.target.value)}
                    placeholder="E.g., Pet fashion photography, Sustainable urban farming, Vintage car restoration..."
                    className="w-full h-24 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 resize-none"
                    maxLength={200}
                  />
                  <div className="absolute right-3 bottom-3 text-xs text-gray-400 dark:text-gray-500">
                    {userPrompt.length}/200
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Be specific about your niche to get more targeted content
                  suggestions
                </p>
              </div>
            </div>
          )}
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

          <div className="p-8">
            <div className="p-8">
              {generatedContent.length === 0 ? (
                <div className="text-center py-12">
                  <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Ready to Generate Content Ideas?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500">
                    Select a niche above and click &ldquo;Generate Ideas&quot;
                    to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {generatedContent?.map((item, index) => (
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
                                item.engagementRate
                              )}`}
                            >
                              {getEngagementIcon(item.engagementRate)}
                              {item.engagementRate} Engagement
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
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingContentDisplay;
