
import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { ChartBar, Users, Clock, MessageSquare } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

// Simulated stats (replace with backend API later)
const INCIDENT_TYPES = [
  { type: "Shoplifting", value: 17, color: "#0071ce" },
  { type: "Vandalism", value: 4, color: "#ffc220" },
  { type: "Loitering", value: 9, color: "#43a8f4" },
  { type: "Employee Theft", value: 1, color: "#d97706" },
  { type: "Other", value: 3, color: "#a3a3a3" },
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

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#111" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={13}>
      {percent > 0.04 ? `${(percent * 100).toFixed(0)}%` : ""}
    </text>
  );
};

const cardClass = "flex flex-col items-center justify-center w-full md:w-56 gap-1 py-6 px-2 bg-white rounded-2xl shadow-xl hover:scale-[1.03] transition-transform";

const AnalyticsDashboard: React.FC = () => {
  const totalIncidents = useMemo(() => INCIDENT_TYPES.reduce((sum, item) => sum + item.value, 0), []);
  return (
    <section className="w-full max-w-5xl mx-auto pb-1 animate-fade-in">
      <h2 className="font-bold text-2xl md:text-3xl text-[#0071ce] text-center mb-2 font-playfair shadow-sm">Store Event Analytics</h2>
      <div className="md:flex md:flex-row flex-col gap-4 w-full mb-6 justify-center">
        <div className={cardClass + " border-t-4 border-[#ffc220]"}>
          <ChartBar size={32} className="text-[#ffc220]" />
          <CardTitle className="text-2xl text-[#0071ce]">{SUMMARY.today}</CardTitle>
          <CardDescription className="text-gray-500">Incidents Today</CardDescription>
        </div>
        <div className={cardClass + " border-t-4 border-[#43a8f4]"}>
          <Clock size={32} className="text-[#43a8f4]" />
          <CardTitle className="text-2xl text-[#0071ce]">{SUMMARY.busiestHour}</CardTitle>
          <CardDescription className="text-gray-500">Busiest Hour</CardDescription>
        </div>
        <div className={cardClass + " border-t-4 border-[#0071ce]"}>
          <Users size={32} className="text-[#0071ce]" />
          <CardTitle className="text-2xl text-[#0071ce]">{SUMMARY.activeStaff}</CardTitle>
          <CardDescription className="text-gray-500">Staff Monitored</CardDescription>
        </div>
        <div className={cardClass + " border-t-4 border-[#ffc220]"}>
          <MessageSquare size={32} className="text-[#ffc220]" />
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
                    label={renderCustomizedLabel}
                    outerRadius={82}
                    innerRadius={38}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {INCIDENT_TYPES.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={30} iconType="circle" />
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
                <BarChart data={HOURLY_DATA}>
                  <XAxis dataKey="hour" tick={{ fontSize: 13, fill: "#363636" }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="incidents" fill="#ffc220" radius={[7,7,0,0]} />
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
