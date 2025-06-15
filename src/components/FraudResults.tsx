
import React from "react";
import { ShieldAlert, CheckCircle2 } from "lucide-react";

type Detection = {
  timestamp: string;
  label: string;
  description: string;
  confidence: number;
};

interface Props {
  detections: Detection[] | null;
  loading: boolean;
  error: string | null;
}

const FraudResults: React.FC<Props> = ({ detections, loading, error }) => {
  if (loading)
    return (
      <div className="flex flex-col items-center py-9">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071ce] mb-4" />
        <span className="font-medium text-[#0071ce] text-xl">Analyzing video for suspicious activity...</span>
      </div>
    );
  if (error)
    return (
      <div className="text-red-600 font-semibold py-6">
        <ShieldAlert className="inline mr-2" /> {error}
      </div>
    );
  if (!detections)
    return (
      <div className="text-gray-500 italic pt-7">
        Upload a video and click <b>Analyze</b> to view results here.
      </div>
    );
  if (detections.length === 0)
    return (
      <div className="flex items-center gap-2 justify-center text-green-600 font-medium pt-7">
        <CheckCircle2 /> No suspicious activity detected.
      </div>
    );

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      <div className="text-xl font-semibold text-[#0071ce] mb-4 flex items-center gap-2">
        <ShieldAlert /> Fraudulent/Suspicious Activity Detected
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg border shadow-sm">
          <thead>
            <tr className="bg-blue-100 text-gray-900">
              <th className="px-2 py-2">Time</th>
              <th className="px-2 py-2">Event</th>
              <th className="px-2 py-2">Details</th>
              <th className="px-2 py-2">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {detections.map((det, i) => (
              <tr key={i} className="border-b hover:bg-blue-50">
                <td className="px-2 py-2 text-sm font-mono">{det.timestamp}</td>
                <td className="px-2 py-2">{det.label}</td>
                <td className="px-2 py-2">{det.description}</td>
                <td className="px-2 py-2 text-center">
                  <span
                    className={`font-semibold ${
                      det.confidence > 0.8
                        ? "text-red-700"
                        : det.confidence > 0.6
                        ? "text-yellow-600"
                        : "text-gray-700"
                    }`}
                  >
                    {(det.confidence * 100).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FraudResults;
