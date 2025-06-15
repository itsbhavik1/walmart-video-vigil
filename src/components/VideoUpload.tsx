
import React, { useRef, useState } from "react";
import { UploadCloud, Play } from "lucide-react";

interface Props {
  onVideoSelected: (file: File, previewUrl: string) => void;
  isProcessing: boolean;
}

const VideoUpload: React.FC<Props> = ({ onVideoSelected, isProcessing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onVideoSelected(file, url);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 py-7 px-2 w-full border rounded-lg bg-white shadow-sm">
      <label
        htmlFor="video"
        className="cursor-pointer flex flex-col items-center border-2 border-dashed border-blue-500 rounded-lg py-6 px-8 transition hover:bg-blue-50 group"
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadCloud size={38} className="text-[#0071ce] mb-2" />
        <span className="font-medium text-[#0071ce] text-lg group-hover:underline">
          Click to upload a security video
        </span>
        <span className="text-gray-600 text-sm mt-1">
          (MP4, AVI, MOV - up to 100MB)
        </span>
        <input
          type="file"
          ref={fileInputRef}
          accept="video/mp4,video/avi,video/quicktime"
          id="video"
          className="hidden"
          onChange={handleFileChange}
          disabled={isProcessing}
        />
      </label>
      {previewUrl && (
        <div className="w-full flex flex-col items-center mt-3">
          <video src={previewUrl} controls className="max-h-64 w-full rounded-lg border" />
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
