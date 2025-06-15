
/*
This file integrates with your deployed suspicious activity detection model API.

Update the BACKEND_URL to your running backend address!
See: https://github.com/OmRajpurkar/Alert-Generation-on-Detection-of-Suspicious-Activity-using-Transfer-Learning/

Frontend expects backend responses to be in this format:
[
  {
    "timestamp": "00:00:05",
    "label": "Suspicious Action",
    "description": "...",
    "confidence": 0.91
  },
  ...
]
*/

export type Detection = {
  timestamp: string;
  label: string;
  description: string;
  confidence: number;
};

// TODO: Set your backend URL!
const BACKEND_URL = "http://localhost:5000/analyze"; // <-- CHANGE THIS TO THE REAL URL

export async function analyzeVideoWithModel(file: File): Promise<Detection[]> {
  const form = new FormData();
  form.append("file", file);

  const resp = await fetch(BACKEND_URL, {
    method: "POST",
    body: form,
  });

  if (!resp.ok) {
    const errorText = await resp.text();
    throw new Error("Backend API error: " + errorText);
  }

  const detections = await resp.json();
  // Validation: Ensure detections match the expected format
  if (!Array.isArray(detections)) throw new Error("Invalid response from backend.");

  return detections;
}

/*
======== BACKEND SETUP STEPS ========
1. Clone and run the backend from:
   https://github.com/OmRajpurkar/Alert-Generation-on-Detection-of-Suspicious-Activity-using-Transfer-Learning/

2. Deploy and expose an endpoint that accepts video file uploads (e.g., on /analyze).
   - It should return analysis results as shown above.

3. Set BACKEND_URL above to match your backend API.

4. Ensure CORS is enabled for local/prod domains as needed.
=====================================
*/
