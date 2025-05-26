"use client";

import { FC, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Loader2 } from "lucide-react";
import SectionHeading from "@/components/atoms/section-heading";

const ProductDemo: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); 
    }
  }, []);

  const handlePlayPause = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("Video control error:", err);
      setError("Video playback error");
    }
  };

  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    console.error("Video error:", e);
    setError("Failed to load video - please check if the video file exists");
    setIsLoading(false);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Experience BuzzDrop.ai"
          subtitle="Watch how we transform your content creation process"
          centered
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-5xl mx-auto mt-12"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm z-0" />
            <div className="relative aspect-video bg-gray-900">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                muted
                preload="metadata"
                onLoadedMetadata={() => setIsLoading(false)}
                onPlay={() => {
                  setIsPlaying(true);
                }}
                onPause={() => {
                  setIsPlaying(false);
                }}
                onError={handleVideoError}
                onCanPlay={() => setIsLoading(false)}
              >
                <source src="/assets/product-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-2" />
                    <p className="text-white text-sm">Loading demo...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="text-white text-center p-4 max-w-md">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Play className="w-8 h-8 text-red-400" />
                      </div>
                      <p className="text-red-400 mb-2">Video Unavailable</p>
                      <p className="text-gray-300 text-sm mb-4">
                        The demo video is currently being processed. Check back
                        soon!
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setError(null);
                        setIsLoading(true);
                        if (videoRef.current) {
                          videoRef.current.load();
                        }
                      }}
                      className="px-4 py-2 bg-violet-500 hover:bg-violet-600 rounded-md text-sm transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}
              {!error && !isLoading && (
                <motion.button
                  onClick={handlePlayPause}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] group hover:bg-black/40 transition-all"
                  initial={false}
                  animate={{ opacity: isPlaying ? 0 : 1 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-violet-500/20 backdrop-blur-sm flex items-center justify-center border border-white/10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white translate-x-0.5" />
                    )}
                  </motion.div>
                </motion.button>
              )}
            </div>
          </div>

          {/* Glow Effect */}
          <div className="absolute -inset-4 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-20 blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500 to-purple-500 opacity-20 blur-2xl" />
          </div>
        </motion.div>

        {/* Fallback Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8 text-gray-400"
        >
          <p className="text-sm">
            Having trouble with the video? Check out our{" "}
            <a
              href="#features"
              className="text-violet-400 hover:text-violet-300 underline"
            >
              features section
            </a>{" "}
            to learn more about BuzzDrop.ai
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductDemo;
