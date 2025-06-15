import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { ChartBar, Users, Clock, MessageSquare } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

// More vibrant and harmonious color palette
const CHART_COLORS = [
  "#0071ce", // Walmart Blue
  "#ffc220", // Walmart Yellow
  "#43a8f4", // Light Blue
  "#1769c6", // Deeper Blue
  "#fd7e14", // Orange
  "#d97706", // Gold/Bronze
  "#a3a3a3"  // Gray
];

// Simulated stats (replace with backend API later)
const INCIDENT_TYPES = [
  { type: "Shoplifting", value: 17, color: CHART_COLORS[0] },
  { type: "Vandalism", value: 4, color: CHART_COLORS[1] },
  { type: "Loitering", value: 9, color: CHART_COLORS[2] },
  { type: "Employee Theft", value: 1, color: CHART_COLORS[3] },
  { type: "Other", value: 3, color: CHART_COLORS[6] },
];

const HOURLY_DATA = [
  { hour: "8am", incidents: 0 },
  { hour: "9am", incidents: 1 },
  { hour: "10am", incidents: 2 },
  { hour: "11am", incidents: 4 },
  { hour: "12pm", incidents: 7 },
  { hour: "1pm", incidents: 5 },
  { hour: "2pm", incidents: 4 },
  { hour: "3pm", incidents: 3 },
  { hour: "4pm", incidents: 10 },
  { hour: "5pm", incidents: 6 },
  { hour: "6pm", incidents: 3 },
  { hour: "7pm", incidents: 2 }
];

// Simulate summary stats
const SUMMARY = {
  today: 7,
  thisWeek: 23,
  activeZones: 6,
  activeStaff: 13,
  mostCommonType: "Shoplifting",
  busiestHour: "4pm",
  loiteringToday: 2,
  customerIncidents: 19,
};

// Enhanced Legend
function CustomLegend({ payload }) {
  return (
    <ul className="flex flex-wrap gap-4 justify-center p-2">
      {payload.map((entry, idx) => (
        <li key={entry.value} className="flex items-center gap-2 text-xs font-semibold">
          <span className="block w-4 h-4 rounded-full shadow" style={{ background: entry.color }} />
          <span className="text-gray-700">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
}

// Enhanced Tooltip
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-2xl px-3 py-2 shadow-lg border border-blue-100 bg-white/95 min-w-[110px]">
      <span className="block font-semibold text-[#0071ce] mb-1">{payload[0].name || label}</span>
      {payload.map((item, i) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <div className="w-3 h-3 rounded-full" style={{ background: item.color || item.payload.color }} />
          <span className="text-sm text-gray-700">{item.value} incidents</span>
        </div>
      ))}
    </div>
  );
}

const cardClass = "flex flex-col items-center justify-center w-full md:w-56 gap-1 py-6 px-2 bg-white rounded-2xl shadow-xl hover:scale-[1.03] transition-transform";

const AnalyticsDashboard: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const totalIncidents = useMemo(() => INCIDENT_TYPES.reduce((sum, item) => sum + item.value, 0), []);

  // Pie highlight
  const onPieEnter = (_, i) => setActiveIndex(i);
  const onPieLeave = () => setActiveIndex(-1);

  return (
    <section className="w-full max-w-5xl mx-auto pb-1 animate-fade-in">
      <h2 className="font-bold text-2xl md:text-3xl text-[#0071ce] text-center mb-2 font-playfair shadow-sm">Store Event Analytics</h2>
      <div className="md:flex md:flex-row flex-col gap-4 w-full mb-6 justify-center">
        <div className={cardClass + " border-t-4 border-[#ffc220] bg-gradient-to-tl from-[#fffbe8] via-white to-[#ffeeb0]"}>
          <ChartBar size={32} className="text-[#ffc220] drop-shadow" />
          <CardTitle className="text-2xl text-[#0071ce]">{SUMMARY.today}</CardTitle>
          <CardDescription className="text-gray-500">Incidents Today</CardDescription>
        </div>
        <div className={cardClass + " border-t-4 border-[#43a8f4] bg-gradient-to-tr from-[#eaf8ff] via-white to-[#43a8f4]/10"}>
          <Clock size={32} className="text-[#43a8f4] drop-shadow" />
          <CardTitle className="text-2xl text-[#0071ce]">{SUMMARY.busiestHour}</CardTitle>
          <CardDescription className="text-gray-500">Busiest Hour</CardDescription>
        </div>
        <div className={cardClass + " border-t-4 border-[#0071ce] bg-gradient-to-br from-[#eaf5ff] via-white to-[#0071ce]/10"}>
          <Users size={32} className="text-[#0071ce] drop-shadow" />
          <CardTitle className="text-2xl text-[#0071ce]">{SUMMARY.activeStaff}</CardTitle>
          <CardDescription className="text-gray-500">Staff Monitored</CardDescription>
        </div>
        <div className={cardClass + " border-t-4 border-[#ffc220] bg-gradient-to-r from-[#fffbe8] via-white to-[#ffeeb0]"}>
          <MessageSquare size={32} className="text-[#ffc220] drop-shadow" />
          <CardTitle className="text-2xl text-[#0071ce]">{SUMMARY.mostCommonType}</CardTitle>
          <CardDescription className="text-gray-500">Most Common Issue</CardDescription>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-stretch justify-between">
        <Card className="flex-1 min-w-[290px] bg-white/90 shadow-lg border-blue-100">
          <CardContent>
            <CardTitle className="text-[#0071ce] text-lg">Incident Types Distribution</CardTitle>
            <div className="w-full flex items-center justify-center h-64">
              <ResponsiveContainer width="99%" height="95%">
                <PieChart>
                  <Pie
                    data={INCIDENT_TYPES}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percent, name }) =>
                      percent > 0.059
                        ? (
                          <tspan className="font-semibold fill-[#323237]">
                            {`${name} ${(percent * 100).toFixed(0)}%`}
                          </tspan>
                        )
                        : ""
                    }
                    outerRadius={85}
                    innerRadius={40}
                    dataKey="value"
                    activeIndex={activeIndex}
                    activeShape={props => (
                      <g>
                        <Pie
                          {...props}
                          stroke="#0071ce"
                          strokeWidth={activeIndex >= 0 ? 4 : 2}
                          fill={INCIDENT_TYPES[activeIndex]?.color}
                        />
                      </g>
                    )}
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    isAnimationActive={true}
                  >
                    {INCIDENT_TYPES.map((entry, i) => (
                      <Cell
                        key={`cell-${i}`}
                        fill={entry.color}
                        stroke={activeIndex === i ? "#0071ce" : "#fff"}
                        strokeWidth={activeIndex === i ? 4 : 2}
                        filter={activeIndex === i ? "url(#pie-shadow)" : ""}
                        style={{
                          cursor: "pointer",
                          transition: "filter 0.2s"
                        }}
                      />
                    ))}
                  </Pie>
                  <defs>
                    <filter id="pie-shadow" height="160%">
                      <feDropShadow
                        dx="0"
                        dy="2"
                        stdDeviation="2"
                        floodColor="#b0d4fb"
                        floodOpacity="0.38"
                      />
                    </filter>
                  </defs>
                  <Tooltip content={props => <CustomTooltip {...props} />} />
                  <Legend content={props => <CustomLegend {...props} />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <CardDescription className="text-center pt-3 text-gray-600">
              Total Incidents: <span className="font-semibold">{totalIncidents}</span>
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[290px] bg-white/90 shadow-lg border-blue-100">
          <CardContent>
            <CardTitle className="text-[#0071ce] text-lg">Incidents by Time of Day</CardTitle>
            <div className="w-full flex items-center justify-center h-64">
              <ResponsiveContainer width="97%" height="90%">
                <BarChart
                  data={HOURLY_DATA}
                  barGap={3}
                  margin={{ top: 8, right: 18, left: 10, bottom: 12 }}
                >
                  <XAxis
                    dataKey="hour"
                    tick={{ fontSize: 13, fill: "#363636", fontFamily: "Inter,sans-serif" }}
                    axisLine={{ stroke: "#bde0ff" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#8ca7c4" }}
                    axisLine={{ stroke: "#bde0ff" }}
                    allowDecimals={false}
                  />
                  <Tooltip content={props => <CustomTooltip {...props} />} />
                  <Bar
                    dataKey="incidents"
                    fill="#ffc220"
                    radius={[9,9,0,0]}
                    barSize={30}
                    className="transition-all"
                    stroke="#0071ce"
                    strokeWidth={1.5}
                    onMouseOver={(_, ind) =>
                      document.querySelectorAll('.bar-active').forEach((e, i) =>
                        (e as HTMLElement).style.filter = i === ind ? 'drop-shadow(0 2px 8px #ffe698)' : '')
                    }
                  >
                    {HOURLY_DATA.map((entry, ind) => (
                      <Cell
                        key={`bar-${ind}`}
                        className="bar-active"
                        fill="#ffc220"
                        stroke="#0071ce"
                        strokeWidth={entry.incidents === Math.max(...HOURLY_DATA.map(d => d.incidents)) ? 3 : 1.5}
                        filter={entry.incidents === Math.max(...HOURLY_DATA.map(d => d.incidents)) ? "url(#bar-shadow)" : ""}
                        style={{
                          opacity: entry.incidents
                            ? (entry.incidents === Math.max(...HOURLY_DATA.map(d => d.incidents)) ? 0.98 : 0.88)
                            : 0.7,
                          transition: "filter 0.2s",
                          cursor: "pointer"
                        }}
                      />
                    ))}
                  </Bar>
                  <defs>
                    <filter id="bar-shadow" height="160%">
                      <feDropShadow
                        dx="0"
                        dy="2"
                        stdDeviation="2"
                        floodColor="#ffe698"
                        floodOpacity="0.34"
                      />
                    </filter>
                  </defs>
                  <Legend verticalAlign="top" iconType="circle" height={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <CardDescription className="text-center pt-3 text-gray-600">
              See peak hours and patterns at a glance.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <style>{`
        @media (max-width: 650px) {
          .recharts-responsive-container {
            min-width: 220px !important;
            height: 250px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AnalyticsDashboard;
