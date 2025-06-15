
import React, { useEffect } from "react";

// Sample public dummy MP4 (short and reliable). Could also be a gif.
const DUMMY_VIDEO_URL = "https://www.w3schools.com/html/mov_bbb.mp4";

interface Props {
  onVideoSelected: (file: File | null, previewUrl: string) => void;
  isProcessing: boolean;
}

const VideoUpload: React.FC<Props> = ({ onVideoSelected, isProcessing }) => {
  // On mount, notify parent of dummy video (simulate "selection")
  useEffect(() => {
    // We cannot send a File, so we send null and preview url
    onVideoSelected(null, DUMMY_VIDEO_URL);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 py-7 px-2 w-full border rounded-lg bg-white shadow-sm">
      <div className="w-full flex flex-col items-center">
        <span className="font-medium text-[#0071ce] text-lg mb-2 flex items-center gap-2">
          <span className="animate-pulse inline-block w-3 h-3 rounded-full bg-green-400" />
          Livestream (Demo)
        </span>
        <video
          src={DUMMY_VIDEO_URL}
          controls
          muted
          autoPlay
          loop
          playsInline
          className="max-h-64 w-full rounded-lg border bg-black"
        />
      </div>
    </div>
  );
};

export default VideoUpload;

