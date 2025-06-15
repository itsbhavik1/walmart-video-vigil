import React, { useState } from "react";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, MapPin, User, Menu } from "lucide-react";
import CrowdNavbar from "./CrowdNavbar";

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

type CrowdTab = "dashboard" | "hotzones" | "menu";

const CrowdDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CrowdTab>("dashboard");

  return (
    <section className="w-full max-w-4xl mx-auto mb-10 animate-fade-in">
      {/* Decorative mini navbar */}
      <CrowdNavbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Switch between tabs */}
      {activeTab === "dashboard" && (
        <>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-[#0071ce] flex items-center gap-2 font-playfair">
                <Users size={25} className="text-[#ffc220]" />
                Store Crowd Monitoring
              </h2>
              <CardDescription className="text-gray-500 mt-1 mb-0 text-base font-normal">
                Analyze live congestion, crowd levels, and assigned staff for each key zone.
              </CardDescription>
            </div>
            <div className="flex items-end gap-2 mt-2 md:mt-0">
              <span className="text-lg font-semibold text-gray-800">Overall Level:</span>
              <span
                className="text-base px-3 py-1 rounded-full font-bold"
                style={{ background: levelColor, color: "#fff" }}
              >
                {overallLevel}
              </span>
            </div>
          </div>

          <Card className="bg-white/95 shadow-xl border-[#43a8f420] rounded-3xl overflow-hidden">
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch">
                {/* Video Panel */}
                <div className="flex-1 flex items-center justify-center min-h-[20rem]">
                  <video
                    src={DEMO_CROWD_VIDEO}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="rounded-2xl w-full max-w-[26rem] max-h-64 border bg-black shadow-md object-contain mx-auto"
                    poster="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=640&q=80"
                    style={{ display: "block" }}
                  />
                </div>
                {/* Details Panel */}
                <div className="flex flex-col flex-1 md:justify-center gap-2 w-full">
                  <div className="mt-2 mb-1">
                    <strong className="text-[#0071ce] text-base">Hot Zones:</strong>
                  </div>
                  <ul className="space-y-4">
                    {hotZones.map((zone) => (
                      <li
                        key={zone.name}
                        className="flex flex-col gap-2 bg-[#f9fafb] px-4 py-3 rounded-lg shadow border-l-4"
                        style={{ borderColor: zone.color }}>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <div className="flex items-center gap-2 min-w-[140px]">
                            <MapPin size={16} style={{ color: zone.color }} />
                            <span className="font-medium">{zone.name}</span>
                            <span
                              className="ml-2 px-2 py-0.5 rounded text-xs font-semibold"
                              style={{ background: zone.color, color: "#fff" }}
                            >
                              {zone.density}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[13px] text-gray-700 mt-1 sm:mt-0">
                            <User size={15} style={{ color: zone.color }} />
                            <span>
                              <b>{zone.people.length}</b> assigned:
                            </span>
                            <div className="flex flex-wrap gap-1 ml-2">
                              {zone.people.map((person) => (
                                <span
                                  key={person}
                                  className="inline-block bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5 text-xs font-semibold text-gray-800 shadow-sm"
                                >
                                  {person}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-xs text-gray-400">
                    *This video and data are for demonstration only. Not real-time.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === "hotzones" && (
        <Card className="bg-white/95 shadow-xl border-[#43a8f420] rounded-3xl overflow-hidden mt-4">
          <CardContent>
            <h3 className="text-xl font-bold text-[#0071ce] mb-3 flex items-center gap-2">
              <MapPin size={20} className="text-[#ffc220]" />
              Hot Zones
            </h3>
            <ul className="space-y-4">
              {hotZones.map((zone) => (
                <li
                  key={zone.name}
                  className="flex flex-col gap-2 bg-[#f9fafb] px-4 py-3 rounded-lg shadow border-l-4"
                  style={{ borderColor: zone.color }}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center gap-2 min-w-[140px]">
                      <MapPin size={16} style={{ color: zone.color }} />
                      <span className="font-medium">{zone.name}</span>
                      <span
                        className="ml-2 px-2 py-0.5 rounded text-xs font-semibold"
                        style={{ background: zone.color, color: "#fff" }}
                      >
                        {zone.density}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-gray-700 mt-1 sm:mt-0">
                      <User size={15} style={{ color: zone.color }} />
                      <span>
                        <b>{zone.people.length}</b> assigned:
                      </span>
                      <div className="flex flex-wrap gap-1 ml-2">
                        {zone.people.map((person) => (
                          <span
                            key={person}
                            className="inline-block bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5 text-xs font-semibold text-gray-800 shadow-sm"
                          >
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-xs text-gray-400">
              *This data is for demonstration only.
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "menu" && (
        <Card className="bg-white/95 shadow-xl border-[#43a8f420] rounded-3xl overflow-hidden mt-4">
          <CardContent>
            <h3 className="text-xl font-bold text-[#0071ce] mb-2 flex items-center gap-2">
              <Menu size={20} className="text-[#ffc220]" /> Menu
            </h3>
            <p className="text-gray-600">Menu functionality will be available soon.</p>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default CrowdDashboard;
