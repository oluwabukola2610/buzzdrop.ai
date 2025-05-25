import React from "react";
import { generateAIContent } from "@/lib/ai-server";
import { fileToBase64 } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { getFromIndexedDB } from "@/lib/indexdb";
import { useEffect, useState } from "react";
import ContentPreview from "./ContentPreview";
import SocialPreview from "./SocialPreview";
import GeneratedContent from "./GeneratedContent";
import SettingsCard from "./SettingsCard";

const Generate = () => {
  const [contentData, setContentData] = useState<{
    url: string;
    file: File;
    type: string;
  } | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedVibe, setSelectedVibe] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("");
  const [generatedContent, setGeneratedContent] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    getFromIndexedDB("file-content", "uploads")
      .then((data) => {
        console.log("Data from IndexedDB:", data);
        setContentData({
          url: URL.createObjectURL(data),
          file: data,
          type: data.type,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error retrieving data from IndexedDB:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const platforms = Object.keys(generatedContent);
    if (platforms.length > 0) {
      setActiveTab(platforms[0]);
    }
  }, [generatedContent]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  const handlegenerate = async () => {
    // if (!contentData)
    //   return toast({
    //     title: "No content available",
    //     description: "Please upload a file to generate content.",
    //     variant: "destructive",
    //   });
    // if (selectedPlatforms.length === 0) {
    //   return toast({
    //     title: "No platforms selected",
    //     description: "Please select at least one platform.",
    //     variant: "destructive",
    //   });
    // }
    // if (!selectedVibe) {
    //   return toast({
    //     title: "No vibe selected",
    //     description: "Please select a vibe for the content.",
    //     variant: "destructive",
    //   });
    // }
    try {
      setIsGenerating(true);
      const base64 = (await fileToBase64(contentData.file)).split(",")[1];
      const res = await generateAIContent(
        selectedPlatforms,
        selectedVibe,
        contentData.type,
        base64
      );
      setGeneratedContent(JSON.parse(res));
      toast({
        title: "Content generated successfully",
        description: "You can now view and edit the generated content.",
        variant: "success",
      });
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <ContentPreview contentData={contentData} />
        <SettingsCard
          selectedPlatforms={selectedPlatforms}
          setSelectedPlatforms={setSelectedPlatforms}
          selectedVibe={selectedVibe}
          setSelectedVibe={setSelectedVibe}
          handlegenerate={handlegenerate}
          isGenerating={isGenerating}
        />
        <GeneratedContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          generatedContent={generatedContent}
          setGeneratedContent={setGeneratedContent}
        />
      </div>
      <div>
        <SocialPreview
          contentData={contentData}
          generatedContent={generatedContent}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
};

export default Generate;
