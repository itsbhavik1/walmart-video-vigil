
import { useState } from "react";
import WalmartHeader from "@/components/WalmartHeader";
import VideoUpload from "@/components/VideoUpload";
import FraudResults from "@/components/FraudResults";
import { analyzeVideoWithModel, Detection } from "@/api/fraudDetection";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [detections, setDetections] = useState<Detection[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVideoSelected = (file: File, preview: string) => {
    setFile(file);
    setPreviewUrl(preview);
    setDetections(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setDetections(null);
    try {
      const dets = await analyzeVideoWithModel(file);
      setDetections(dets);
    } catch (err: any) {
      setError(err?.message || "Failed to analyze video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7fa] flex flex-col">
      <WalmartHeader />
      <main className="flex flex-col flex-1 py-10 md:px-24 px-2 items-center gap-6 w-full">
        <h2 className="text-3xl font-bold text-[#0071ce] mb-2 mt-4 text-center">Fraudulent Activity Video Detection</h2>
        <div className="w-full max-w-2xl">
          <VideoUpload onVideoSelected={handleVideoSelected} isProcessing={loading} />
        </div>
        <Button
          className="bg-[#ffc220] hover:bg-[#ffd966] text-[#0071ce] font-semibold mt-2"
          size="lg"
          onClick={handleAnalyze}
          disabled={!file || loading}
        >
          Analyze Video
        </Button>
        <div className="w-full max-w-2xl">
          <FraudResults detections={detections} loading={loading} error={error} />
        </div>
        <div className="pt-10 text-gray-500 text-xs w-full max-w-lg mx-auto text-center">
          This demo uses simulated video analysis results.<br />
          To run real detections, see API integration steps in <code>src/api/fraudDetection.ts</code>
        </div>
      </main>
    </div>
  );
};

export default Index;
