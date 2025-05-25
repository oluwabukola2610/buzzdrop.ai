import { platforms, vibes } from "@/lib/utils";
import { RefreshCw, Sparkles } from "lucide-react";
import { FC } from "react";

interface SettingsCardProps {
  selectedPlatforms: string[];
  setSelectedPlatforms: (platforms: string[]) => void;
  selectedVibe: string;
  setSelectedVibe: (vibe: string) => void;
  handlegenerate: () => void;
  isGenerating: boolean;
}

const SettingsCard: FC<SettingsCardProps> = ({
  selectedPlatforms,
  setSelectedPlatforms,
  selectedVibe,
  setSelectedVibe,
  handlegenerate,
  isGenerating,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          Choose your target vibe and platforms
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Target Platforms
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {platforms.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setSelectedPlatforms((prev) =>
                    prev.includes(item.value)
                      ? prev.filter((p) => p !== item.value)
                      : [...prev, item.value]
                  );
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                  selectedPlatforms.includes(item.value)
                    ? "bg-radient-text text-violet-300 ring-2 ring-violet-500"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <span className="text-2xl mb-2">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content Vibe
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {vibes.map((vibe) => (
              <button
                key={vibe.value}
                onClick={() => setSelectedVibe(vibe.value)}
                className={`flex items-center gap-3 p-4 rounded-lg transition-all ${
                  selectedVibe === vibe.value
                    ? "bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 ring-2 ring-violet-500"
                    : `${vibe.color} text-gray-700 dark:text-gray-300 hover:opacity-90`
                }`}
              >
                <span className="text-2xl">{vibe.icon}</span>
                <span className="text-sm font-medium">{vibe.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handlegenerate}
          disabled={selectedPlatforms.length === 0 || !selectedVibe}
          className="w-full px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Contents
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SettingsCard;
