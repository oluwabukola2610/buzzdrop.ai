import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface SocialPreviewProps {
  contentData: {
    url: string;
    type: string;
  } | null;
  generatedContent: {
    [platform: string]: {
      caption: string;
      hashtags: string[];
    };
  };
  activeTab: string; 
}

const SocialPreview: FC<SocialPreviewProps> = ({
  contentData,
  generatedContent,
  activeTab,
}) => {
  const currentPlatform = activeTab && generatedContent[activeTab];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Preview
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          How your content will look on social media
        </p>
      </div>

      <div className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-sm mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="p-4 flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-pink-500"></div>
              <div className="font-medium text-sm">yourusername</div>
              <div className="ml-auto text-gray-500">•••</div>
            </div>

            <div className="aspect-square w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              {contentData && contentData.type.includes("image") ? (
                <Image
                  src={contentData.url}
                  alt="Uploaded content"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  className="w-full h-full object-cover"
                  controls
                  src={contentData?.url}
                />
              )}
            </div>

            <div className="p-4 space-y-2">
              <div className="flex justify-between pb-2">
                <div className="flex space-x-4">
                  <Heart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  <MessageCircle className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  <Share2 className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </div>
                <Bookmark className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </div>

              <div className="text-sm font-medium">42 likes</div>

              <div className="text-sm">
                <span className="font-semibold">yourusername</span>{" "}
                <span className="text-gray-700 dark:text-gray-300">
                  {currentPlatform
                    ? currentPlatform.caption
                    : "Your caption will appear here..."}
                </span>
                {currentPlatform && currentPlatform.hashtags.length > 0 && (
                  <p className="mt-1 text-blue-500 dark:text-blue-400">
                    {currentPlatform.hashtags.map((tag) => `#${tag}`).join(" ")}
                  </p>
                )}
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400">
                View all 12 comments
              </div>

              <div className="text-xs text-gray-400 dark:text-gray-500">
                2 HOURS AGO
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPreview;
