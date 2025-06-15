
import React from "react";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, MapPin, User } from "lucide-react";

// Use a reliable, always-accessible demo video:
const DEMO_CROWD_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";

// Hot zones with people assigned
const hotZones = [
  {
    name: "Entrance A",
    density: "High",
    color: "#ff4343",
    people: ["Maria Lin", "James Smith", "Kara Patel", "Luis Wang", "Deepa Tandon", "Anil Raj"],
  },
  {
    name: "Checkout Lanes",
    density: "Medium",
    color: "#ffc220",
    people: ["Roberto Salinas", "Priya Das"],
  },
  {
    name: "Electronics",
    density: "Low",
    color: "#42ba96",
    people: ["Sam Reed"],
  },
];

const overallLevel = "High"; // Demo
const levelColor =
  overallLevel === "High"
    ? "#ff4343"
    : overallLevel === "Medium"
    ? "#ffc220"
    : "#42ba96";

const CrowdDashboard: React.FC = () => (
  <section className="w-full max-w-4xl mx-auto mb-8 animate-fade-in">
    <Card className="bg-white/95 shadow-xl border-[#43a8f420] rounded-3xl overflow-hidden">
      <CardContent>
        <div className="flex flex-col md:flex-row gap-7 items-center md:items-stretch">
          {/* Video Panel */}
          <div className="flex-1 flex items-center justify-center min-h-[16rem]">
            <video
              src={DEMO_CROWD_VIDEO}
              controls
              autoPlay
              loop
              muted
              playsInline
              className="rounded-xl w-full max-w-[420px] max-h-64 border bg-black shadow object-contain mx-auto"
              poster="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=640&q=80"
              style={{ display: "block" }}
            />
          </div>
          {/* Details Panel */}
          <div className="flex flex-col flex-1 md:justify-center gap-2 w-full">
            <div className="flex items-center gap-2">
              <Users size={22} className="text-[#0071ce]" />
              <CardTitle className="text-xl text-[#0071ce] font-bold">
                Crowd Management
              </CardTitle>
            </div>
            <CardDescription className="text-gray-500 mb-2">
              Live visualization of store occupancy and congestion hot spots.
            </CardDescription>
            <div className="flex items-end gap-2">
              <span className="text-lg font-semibold text-gray-800">
                Current Crowd Level:
              </span>
              <span
                className="text-base px-3 py-1 rounded-full font-bold"
                style={{ background: levelColor, color: "#fff" }}
              >
                {overallLevel}
              </span>
            </div>
            <div className="mt-4">
              <span className="block font-semibold mb-1 text-gray-700">Hot Zones:</span>
              <ul className="space-y-3">
                {hotZones.map((zone) => (
                  <li key={zone.name} className="flex items-start sm:items-center gap-3 flex-col sm:flex-row bg-[#f9fafb] px-3 py-2 rounded-lg shadow border-l-4" style={{ borderColor: zone.color }}>
                    <div className="flex items-center gap-2 min-w-[150px]">
                      <MapPin size={16} style={{ color: zone.color }} />
                      <span className="font-medium">{zone.name}</span>
                      <span
                        className="ml-2 px-2 py-0.5 rounded text-xs font-semibold"
                        style={{ background: zone.color, color: "#fff" }}
                      >
                        {zone.density}
                      </span>
                      <span className="ml-2 flex items-center gap-1 text-[12px] text-gray-600">
                        <User size={14} style={{ color: zone.color }} />
                        <b>{zone.people.length}</b> assigned
                      </span>
                    </div>
                    <div className="pl-7 flex flex-wrap gap-2 mb-1">
                      {zone.people.map((person) => (
                        <span
                          key={person}
                          className="inline-block bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm"
                        >
                          {person}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-3 text-xs text-gray-400">
              *This video and data are for demonstration only. Not real-time.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
);

export default CrowdDashboard;

