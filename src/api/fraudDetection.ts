
/*
This file simulates the suspicious activity model API.
- Replace the SIMULATED API implementation with a real HTTP call to your backend after deploying your Python model.
- See instructions below.
*/

export type Detection = {
  timestamp: string; // Example: "00:01:23"
  label: string; // Example: "Suspicious Person"
  description: string; // Example: "Person loitering near exit"
  confidence: number; // Between 0 and 1
};

export async function analyzeVideoWithModel(file: File): Promise<Detection[]> {
  // -- SIMULATED DELAY & RESULT --
  await new Promise((res) => setTimeout(res, 3200));
  // Simulated random detection data
  return Math.random() > 0.5
    ? [
        {
          timestamp: "00:00:05",
          label: "Suspicious Action",
          description: "Detected rapid movement behind cash register.",
          confidence: 0.89,
        },
        {
          timestamp: "00:02:37",
          label: "Unattended Bag",
          description: "Bag left alone in customer area.",
          confidence: 0.72,
        },
      ]
    : [];
}

/*
========= HOW TO INTEGRATE YOUR MODEL =========

1. Deploy your model backend as a REST API (e.g., Flask, FastAPI, etc.), using code from https://github.com/OmRajpurkar/Alert-Generation-on-Detection-of-Suspicious-Activity-using-Transfer-Learning/tree/main

2. Add an endpoint for video file upload and return detections in this format:
  [{
    timestamp: "00:00:05",
    label: "Suspicious Action",
    description: "...",
    confidence: 0.91
  }, ... ]

3. Replace this function with:
    export async function analyzeVideoWithModel(file: File): Promise<Detection[]> {
      const form = new FormData();
      form.append("file", file);
      const resp = await fetch("YOUR_BACKEND_API_URL/analyze", {
        method: "POST",
        body: form,
      });
      if (!resp.ok) throw new Error("Backend API error");
      return await resp.json();
    }

4. Backend must handle CORS for frontend localhost/prod domain.

DONE! The rest of the product works end-to-end.

*/
