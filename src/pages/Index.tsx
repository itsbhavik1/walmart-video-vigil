
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
    <div className="min-h-screen bg-gradient-to-tl from-[#e8f0ff] via-white to-[#cde6ff] overflow-x-hidden flex flex-col relative">
      <WalmartHeader />
      <main className="flex flex-col flex-1 py-10 md:px-24 px-2 items-center gap-6 w-full">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0071ce] mb-2 mt-4 text-center tracking-tight drop-shadow font-sans animate-fade-in">
          Fraudulent Activity Video Detection
        </h2>
        <p className="text-base md:text-lg text-gray-500 mb-2 text-center max-w-2xl animate-fade-in">
          Upload your in-store footage below and use cutting-edge AI to detect suspicious activity in seconds.<br className="hidden md:inline" />
          Built for robust Walmart security & modern retail protection.
        </p>
        <section className="w-full max-w-2xl rounded-2xl bg-white/80 backdrop-blur-md shadow-xl p-6 animate-fade-in">
          <VideoUpload onVideoSelected={handleVideoSelected} isProcessing={loading} />
          <div className="flex justify-end mt-4">
            <Button
              className="bg-[#ffc220] hover:bg-[#ffd966] text-[#0071ce] font-semibold shadow-lg transition-all duration-200 px-8 py-3 rounded-lg text-lg"
              size="lg"
              onClick={handleAnalyze}
              disabled={!file || loading}
            >
              {loading ? "Analyzing..." : "Analyze Video"}
            </Button>
          </div>
        </section>
        <section className="w-full max-w-2xl mt-2 md:mt-4 drop-shadow">
          <FraudResults detections={detections} loading={loading} error={error} />
        </section>
        <div className="pt-10 text-gray-500 text-xs w-full max-w-lg mx-auto text-center animate-fade-in">
          This demo uses simulated video analysis results.<br />
          To run real detections, see API integration steps in <code className="font-mono text-yellow-700">src/api/fraudDetection.ts</code>
        </div>
      </main>
      <div className="absolute right-0 bottom-0 w-1/2 max-w-lg h-80 bg-gradient-to-tr from-[#7fbcff50] to-[#ffeeb0] blur-2xl rounded-full opacity-40 pointer-events-none -z-10" />
      <div className="absolute left-[-80px] top-16 w-1/3 max-w-md h-64 bg-gradient-to-br from-[#ffc2205a] to-[#0071ce33] blur-2xl rounded-full opacity-40 pointer-events-none -z-10" />
    </div>
  );
};

export default Index;
