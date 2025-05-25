import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Flame,
  Brain,
  Users,
  RefreshCw,
  Sparkles,
  Target,
  Star,
  Zap,
} from "lucide-react";
import { niches } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TrendingItem {
  topic: string;
  trend: string;
  engagement: string;
  posts: string;
  growth: string;
  contentIdeas: string[];
}

interface ViralTemplate {
  title: string;
  format: string;
  virality: number;
  hooks: string[];
}

interface NicheContent {
  trending: TrendingItem[];
  viral: ViralTemplate[];
}

interface ContentData {
  [key: string]: NicheContent;
}

const TrendingContentCard = () => {
  const [selectedNiche, setSelectedNiche] = useState("tech");
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedTrend, setExpandedTrend] = useState<number | null>(null);
  const [contentData, setContentData] = useState<ContentData>({
    tech: {
      trending: [],
      viral: [],
    },
  });

  const generateTrendingContent = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch("/api/trending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: selectedNiche }),
      });

      if (!response.ok) throw new Error("Failed to generate content");

      const data = await response.json();
      setContentData((prev) => ({
        ...prev,
        [selectedNiche]: data,
      }));
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generateTrendingContent();
  }, [selectedNiche]);

  const getTrendColor = (trend: string): string => {
    if (trend.includes("Viral"))
      return "text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400";
    if (trend.includes("Rising"))
      return "text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400";
    return "text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400";
  };

  const currentNicheData = contentData[selectedNiche] || contentData.tech;

  return (
    <div className="space-y-8">
      {/* Niche Selection Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-violet-500" />
            Select Your Niche
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Choose a niche to get targeted content ideas
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {niches.map((niche) => (
              <button
                key={niche.id}
                onClick={() => setSelectedNiche(niche.id)}
                className={`p-3 rounded-xl border transition-all text-center ${
                  selectedNiche === niche.id
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 shadow-md"
                    : "border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700"
                }`}
              >
                <div className="text-2xl mb-2">{niche.icon}</div>
                <div className="font-medium text-sm text-gray-900 dark:text-white">
                  {niche.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Display Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Flame className="w-6 h-6 text-violet-500" />
              Trending Content
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              AI-powered content suggestions
            </p>
          </div>
          <button
            onClick={generateTrendingContent}
            disabled={isGenerating}
            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 flex items-center gap-2 text-sm"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Refresh Ideas
              </>
            )}
          </button>
        </div>

        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="w-full justify-start border-b border-gray-100 dark:border-gray-700 bg-transparent">
            <TabsTrigger value="trending" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Trending Topics
            </TabsTrigger>
            <TabsTrigger value="viral" className="gap-2">
              <Flame className="w-4 h-4" />
              Viral Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="p-6">
            {currentNicheData.trending?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No trending content available. Click refresh to generate new
                ideas.
              </div>
            ) : (
              <div className="space-y-4">
                {currentNicheData.trending?.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-3"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {item.topic}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(
                          item.trend
                        )}`}
                      >
                        {item.trend}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {item.posts}
                      </span>
                      <span className="text-green-600 font-medium">
                        {item.growth}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        setExpandedTrend(expandedTrend === index ? null : index)
                      }
                      className="text-purple-600 text-xs font-medium hover:underline flex items-center gap-1"
                    >
                      <Zap className="w-3 h-3" />
                      {expandedTrend === index ? "Hide" : "Show"} Ideas (
                      {item.contentIdeas.length})
                    </button>

                    {expandedTrend === index && (
                      <div className="mt-3 space-y-2">
                        {item.contentIdeas.map((idea, iIndex) => (
                          <div
                            key={iIndex}
                            className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded text-xs"
                          >
                            <span className="text-gray-700 dark:text-gray-300 flex-1">
                              {idea}
                            </span>
                            <button
                              onClick={() => insertContentIdea(idea)}
                              className="ml-2 text-purple-600 hover:text-purple-700 font-medium"
                            >
                              Use
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="viral" className="p-6">
            {currentNicheData.viral?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No viral templates available. Click refresh to generate new
                ideas.
              </div>
            ) : (
              <div className="space-y-4">
                {currentNicheData.viral?.map((template, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-3"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {template.title}
                        </h4>
                        <span className="text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 px-2 py-1 rounded mt-1 inline-block">
                          {template.format}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-orange-600">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="font-bold text-xs">
                            {template.virality}/100
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Hook Options:
                      </div>
                      {template.hooks.map((hook, hIndex) => (
                        <div
                          key={hIndex}
                          className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded text-xs"
                        >
                          <span className="text-gray-700 dark:text-gray-300 flex-1">
                            &quot;{hook}&ldquo;
                          </span>
                          <button
                            onClick={() =>
                              insertContentIdea(`${hook} - ${template.title}`)
                            }
                            className="ml-2 text-purple-600 hover:text-purple-700 font-medium"
                          >
                            Use
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Insights Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-violet-500" />
            AI Insights
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Performance metrics and analytics
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-lg font-bold text-purple-600">89%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Match Rate
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">12.4K</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Avg Reach
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-600">3.2%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Engagement
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingContentCard;
