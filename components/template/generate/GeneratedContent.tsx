import { Hash, MessageSquare, Copy, Check, Share2 } from "lucide-react";
import { FC, useState } from "react";

interface GeneratedContentProps {
  generatedContent: {
    [platform: string]: {
      caption: string;
      hashtags: string[];
    };
  };
  setGeneratedContent: (content: {
    [platform: string]: {
      caption: string;
      hashtags: string[];
    };
  }) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const GeneratedContent: FC<GeneratedContentProps> = ({
  generatedContent,
  setGeneratedContent,
  activeTab,
  setActiveTab,
}) => {
  const platforms = Object.keys(generatedContent);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  const updateContent = (
    platform: string,
    type: "caption" | "hashtags",
    value: string
  ) => {
    setGeneratedContent({
      ...generatedContent,
      [platform]: {
        ...generatedContent[platform],
        [type]:
          type === "hashtags"
            ? value.split(" ").filter((tag) => tag.trim())
            : value,
      },
    });
  };

  const handleCopy = async (
    platform: string,
    type: "caption" | "hashtags" | "all"
  ) => {
    let textToCopy = "";

    if (type === "caption") {
      textToCopy = generatedContent[platform].caption;
    } else {
      textToCopy = generatedContent[platform].hashtags.join(" ");
    }
    await navigator.clipboard.writeText(textToCopy);
    const key = `${platform}-${type}`;
    setCopiedStates({ ...copiedStates, [key]: true });
    setTimeout(() => setCopiedStates({ ...copiedStates, [key]: false }), 2000);
  };

  const getPlatformColor = (platform: string) => {
    const colors = {
      instagram: "from-purple-500 to-pink-500",
      twitter: "from-blue-400 to-blue-600",
      facebook: "from-blue-600 to-blue-800",
      linkedin: "from-blue-700 to-indigo-800",
      tiktok: "from-black to-gray-800",
      youtube: "from-red-500 to-red-700",
    };
    return colors[platform.toLowerCase()] || "from-gray-400 to-gray-600";
  };

  const getPlatformIcon = (platform: string) => {
    return platform.charAt(0).toUpperCase();
  };

  if (platforms.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <MessageSquare className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No Content Generated Yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Generate content to see your AI-powered social media posts here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r  from-gray-700 to-gray-800 p-6 border-b border-gray-600">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Generated Content
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {platforms.length} platform{platforms.length > 1 ? "s" : ""} •
              AI-optimized content
            </p>
          </div>

          {/* Platform Tabs */}
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => setActiveTab(platform)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === platform
                    ? `bg-gradient-to-r ${getPlatformColor(
                        platform
                      )} text-white shadow-lg`
                    : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeTab === platform
                      ? "bg-white/20"
                      : "bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {getPlatformIcon(platform)}
                </div>
                <span className="capitalize font-medium">{platform}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTab && (
          <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Caption */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-violet-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Caption
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(activeTab, "caption")}
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copiedStates[`${activeTab}-caption`] ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      )}
                    </button>
                  </div>
                </div>

                <textarea
                  value={generatedContent[activeTab].caption}
                  onChange={(e) =>
                    updateContent(activeTab, "caption", e.target.value)
                  }
                  className="w-full h-44 p-6 text-base rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                  placeholder="Enter your caption..."
                />
              </div>

              {/* Hashtags */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hash className="h-6 w-6 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Hashtags (
                      {generatedContent[activeTab].hashtags?.length || 0}
                      )
                    </h3>
                  </div>
                  <button
                    onClick={() => handleCopy(activeTab, "hashtags")}
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {copiedStates[`${activeTab}-hashtags`] ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    )}
                  </button>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl min-h-32">
                  {generatedContent[activeTab].hashtags?.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {generatedContent[activeTab].hashtags.map(
                        (tag, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800"
                          >
                            {tag.startsWith("#") ? tag : `#${tag}`}
                          </span>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic text-center py-8">
                      No hashtags generated
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <button className="flex items-center gap-2 px-6 py-3 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors font-medium">
                <Share2 className="h-5 w-5" />
                Schedule Post
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default GeneratedContent;
