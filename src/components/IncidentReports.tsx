
import React, { useMemo } from "react";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileSpreadsheet } from "lucide-react";

interface Incident {
  id: string;
  time: string;
  type: string;
  zone: string;
  summary: string;
  reporter: string;
}

const INCIDENTS: Incident[] = [
  {
    id: "1",
    time: "2025-06-15 09:13",
    type: "Shoplifting",
    zone: "Electronics",
    summary: "Suspect concealed item in jacket",
    reporter: "AI",
  },
  {
    id: "2",
    time: "2025-06-15 10:02",
    type: "Loitering",
    zone: "Entry",
    summary: "Person remained in foyer 15+ min",
    reporter: "AI",
  },
  {
    id: "3",
    time: "2025-06-15 13:22",
    type: "Vandalism",
    zone: "Garden Center",
    summary: "Item knocked over, broken by customer",
    reporter: "Staff",
  },
  {
    id: "4",
    time: "2025-06-15 15:40",
    type: "Employee Theft",
    zone: "Back Office",
    summary: "Unusual package removal",
    reporter: "AI",
  }
];

// Simple CSV export
const exportCSV = (data: Incident[]) => {
  const headers = "ID,Time,Type,Zone,Summary,Reporter\n";
  const rows = data.map(i => 
    [i.id, `"${i.time}"`, `"${i.type}"`, `"${i.zone}"`, `"${i.summary}"`, `"${i.reporter}"`].join(",")
  ).join("\n");
  const csv = headers + rows;
  const blob = new Blob([csv], {type: "text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "incident_reports.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
};

// Placeholder for PDF export integration
const exportPDF = () => {
  alert("PDF export will be available in the full version!");
};

const IncidentReports: React.FC = () => {
  const incidents = useMemo(() => INCIDENTS, []);

  return (
    <section className="w-full max-w-5xl mx-auto mt-5 animate-fade-in">
      <Card className="bg-white/95 shadow-2xl border-[#0071ce26] rounded-3xl overflow-hidden">
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
            <div>
              <CardTitle className="text-[#0071ce] text-2xl mb-2">Incident Reports</CardTitle>
              <CardDescription className="text-gray-600">Review, investigate, and export all detected events.</CardDescription>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button variant="outline" size="sm" onClick={() => exportCSV(incidents)}>
                <FileSpreadsheet className="mr-1" size={18} /> Export CSV
              </Button>
              <Button variant="outline" size="sm" onClick={exportPDF}>
                <FileText className="mr-1" size={18} /> Export PDF
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto custom-scrollbar rounded-xl">
            <table className="min-w-full text-sm md:text-base font-inter border-t border-[#0071ce18] bg-white/90 rounded-xl shadow">
              <thead>
                <tr className="bg-[#43a8f41d] text-[#0071ce]">
                  <th className="px-4 py-3 text-left font-bold">Time</th>
                  <th className="px-4 py-3 text-left font-bold">Type</th>
                  <th className="px-4 py-3 text-left font-bold">Zone</th>
                  <th className="px-4 py-3 text-left font-bold">Summary</th>
                  <th className="px-4 py-3 text-left font-bold">Reporter</th>
                </tr>
              </thead>
              <tbody>
                {incidents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 py-7">No incident reports yet.</td>
                  </tr>
                ) : (
                  incidents.map((item) => (
                    <tr 
                      key={item.id} 
                      className="hover:bg-[#0071ce0e] transition-colors duration-100"
                    >
                      <td className="whitespace-nowrap px-4 py-2">{item.time}</td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <span className={`px-3 py-1 rounded-xl text-xs font-semibold shadow ${item.type === "Shoplifting" ? "bg-[#ffeeb0] text-[#997200]" : item.type === "Loitering" ? "bg-[#43a8f414] text-[#43a8f4]" : item.type === "Vandalism" ? "bg-pink-100 text-[#b12c5b]" : item.type === "Employee Theft" ? "bg-slate-200 text-slate-600" : "bg-gray-100 text-gray-700"}`}>{item.type}</span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">{item.zone}</td>
                      <td className="px-4 py-2">{item.summary}</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.reporter}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e0ebff;
          border-radius: 8px;
        }
      `}</style>
    </section>
  );
};

export default IncidentReports;

