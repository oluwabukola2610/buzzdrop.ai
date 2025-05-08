import React from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import AnimatedButton from "@/components/atoms/animated-button";
const FileUpload = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.3,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="relative rounded-xl overflow-hidden gradient-border"
    >
      <div className="bg-secondary/50 backdrop-blur-sm p-8 rounded-xl">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
            <Upload className="h-10 w-10 text-purple-400" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold">Upload Your Content</h3>
            <p className="text-gray-400">Drag and drop your images or videos</p>
          </div>

          <div className="w-full h-40 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Drop files here or click to browse</p>
          </div>

          <AnimatedButton>
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>Upload Files</span>
            </div>
          </AnimatedButton>
        </div>
      </div>

      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-30"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  );
};

export default FileUpload;
