import Image from "next/image";
import { FC } from "react";

interface ContentPreviewProps {
  contentData: {
    url: string;
    type: string;
  } | null;
}

const ContentPreview: FC<ContentPreviewProps> = ({ contentData }) => {
  if (!contentData) return null;

  return (
    <div className="flex items-center gap-4">
      {contentData.type.includes("image") ? (
        <Image
          src={contentData.url}
          alt="Uploaded content"
          width={300}
          height={300}
          className="w-full h-[300px] object-contain rounded-lg"
        />
      ) : (
        <video
          className="w-full h-[300px] rounded-lg"
          controls
          src={contentData.url}
        />
      )}
    </div>
  );
};

export default ContentPreview;
