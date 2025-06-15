import { useState } from "react";
import WalmartHeader from "@/components/WalmartHeader";
import VideoUpload from "@/components/VideoUpload";
import FraudResults from "@/components/FraudResults";
import { analyzeVideoWithModel, Detection } from "@/api/fraudDetection";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/AnimatedBackground";
import FancyTitle from "@/components/FancyTitle";

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
    <div className="min-h-screen relative overflow-x-hidden flex flex-col bg-transparent font-inter">
      <AnimatedBackground />
      <WalmartHeader />
      <main className="flex flex-col flex-1 py-12 md:px-24 px-2 items-center gap-y-8 w-full">

        {/* Improved heading */}
        <FancyTitle
          title="Fraudulent Activity Video Detection"
          subtitle="Let advanced AI instantly spot shoplifting, vandalism, or other incidents in your security footage."
        />

        <div className="flex justify-center items-center gap-16 w-full animate-fade-in">
          <p className="text-base md:text-xl text-gray-700 font-light bg-white/60 rounded-xl px-7 py-4 shadow-lg backdrop-blur-sm max-w-2xl border-l-4 border-[#ffc220] font-inter">
            Upload your in-store footage and let our advanced AI detect security threats in seconds.<br className="hidden md:inline" />
            <span className="text-[#ffc220] font-semibold underline underline-offset-2 decoration-dotted decoration-[#ffc220]/70 font-inter">
              Trusted for modern retail vigilance.
            </span>
          </p>
        </div>
        <section className="w-full max-w-2xl mx-auto rounded-3xl bg-white/85 backdrop-blur-2xl shadow-2xl p-8 border-2 border-[#0071ce26] animate-fade-in scale-100 hover:scale-[1.012] transition duration-200 card-glass font-inter">
          <VideoUpload onVideoSelected={handleVideoSelected} isProcessing={loading} />
          <div className="flex flex-row flex-wrap justify-between items-center gap-2 mt-4">
            <Button
              className="bg-[#ffc220] hover:bg-[#ffd966] text-[#0071ce] font-semibold shadow-lg shadow-[#ffc2203c] transition-all duration-200 px-10 py-3 rounded-2xl text-lg scale-100 hover:scale-105 focus:scale-95 font-inter"
              size="lg"
              onClick={handleAnalyze}
              disabled={!file || loading}
              style={{
                boxShadow: "0 4px 32px 0 #ffc2202a"
              }}
            >
              <span className="tracking-wide px-2">{loading ? "Analyzing..." : "Analyze Video"}</span>
              {loading && <span className="ml-2 animate-spin h-5 w-5 border-t-2 border-b-2 border-[#0071ce] rounded-full inline-block" />}
            </Button>
            {previewUrl && (
              <span className="ml-2 text-xs bg-blue-100 px-3 py-1 rounded shadow text-[#0071ce] animate-fade-in font-inter">
                Video Ready!
              </span>
            )}
          </div>
        </section>
        <section className="w-full max-w-2xl mt-2 md:mt-6 drop-shadow-xl animate-fade-in font-inter">
          <FraudResults detections={detections} loading={loading} error={error} />
        </section>
        <div className="pt-10 text-gray-500 text-xs w-full max-w-lg mx-auto text-center animate-fade-in font-inter">
          <span className="bg-white/70 rounded py-2 px-4 shadow border border-[#ffc22060]">
            This demo uses <b>simulated video analysis</b> results.<br />
            For real detections, set up your backend in
            <code className="font-mono text-yellow-700 mx-1">src/api/fraudDetection.ts</code>
          </span>
        </div>
      </main>
      {/* Soft floating gradient blobs for human touch */}
      <div className="absolute right-0 bottom-0 w-2/5 max-w-lg h-80 bg-gradient-to-tr from-[#7fbcff50] to-[#ffeeb0] blur-[100px] rounded-full opacity-40 pointer-events-none -z-10 animate-fade-in" />
      <div className="absolute left-[-80px] top-16 w-1/3 max-w-md h-64 bg-gradient-to-br from-[#ffc2205a] to-[#0071ce33] blur-2xl rounded-full opacity-40 pointer-events-none -z-10 animate-fade-in" />
      <style>{`
        .card-glass {
          backdrop-filter: blur(27px) saturate(143%);
          background: rgba(255,255,255,0.82);
          box-shadow: 0 12px 54px 0 #0071ce0f, 0 1.5px 7px #0071ce21;
          border-radius: 2.3rem;
        }
      `}</style>
    </div>
  );
};

export default Index;
