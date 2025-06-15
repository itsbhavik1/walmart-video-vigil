
import React, { useState } from "react";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, X, CheckCircle } from "lucide-react";

interface Alert {
  id: string;
  time: string;
  type: "Theft" | "Loitering" | "Vandalism" | "Tampering";
  summary: string;
  priority: "High" | "Medium" | "Low";
  acknowledged: boolean;
}

const ALERT_PALETTE: Record<string, string> = {
  High: "bg-[#ffd3d6] text-[#b12c5b]",
  Medium: "bg-[#fff5da] text-[#997200]",
  Low: "bg-[#e2f7ff] text-[#0071ce]",
};

const demoAlerts: Alert[] = [
  {
    id: "a1",
    time: "2025-06-15 14:48",
    type: "Theft",
    summary: "Possible theft detected in Pharmacy aisle.",
    priority: "High",
    acknowledged: false,
  },
  {
    id: "a2",
    time: "2025-06-15 13:13",
    type: "Tampering",
    summary: "Camera #3 lens obstruction noticed.",
    priority: "Medium",
    acknowledged: false,
  },
  {
    id: "a3",
    time: "2025-06-15 12:40",
    type: "Loitering",
    summary: "Person in loading dock area 9+ min.",
    priority: "Low",
    acknowledged: false,
  },
];

const AlertPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(demoAlerts);

  const acknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, acknowledged: true } : a
      )
    );
  };

  const dismiss = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <section className="w-full max-w-5xl mx-auto mb-6 animate-fade-in">
      <Card className="bg-white/95 shadow-xl border-[#ffc2202c] rounded-3xl overflow-hidden">
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Bell size={26} className="text-[#ffc220]" />
              <CardTitle className="text-xl md:text-2xl text-[#b12c5b]">Smart Security Alerts</CardTitle>
            </div>
            <CardDescription className="text-gray-600 hidden md:block">
              AI-flagged incidents requiring urgent or manual review.
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            {alerts.length === 0 ? (
              <div className="text-center text-gray-500 py-7">No active alerts.</div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex flex-col md:flex-row md:items-center justify-between rounded-2xl shadow-md p-4 mb-1 border border-[#ffd3d6]/60 ${alert.acknowledged ? "opacity-65" : ""} ${ALERT_PALETTE[alert.priority]}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-3 w-full">
                    <span>
                      {alert.type === "Theft" ? (
                        <AlertTriangle className="inline mr-1 -mt-0.5 text-[#b12c5b]" size={20} />
                      ) : alert.type === "Loitering" ? (
                        <Bell className="inline mr-1 -mt-0.5 text-[#0071ce]" size={20} />
                      ) : alert.type === "Vandalism" ? (
                        <AlertTriangle className="inline mr-1 -mt-0.5 text-[#997200]" size={20} />
                      ) : (
                        <Bell className="inline mr-1 -mt-0.5 text-[#43a8f4]" size={20} />
                      )}
                    </span>
                    <span className="font-semibold">{alert.type}</span>
                    <span className="text-xs font-light px-2">
                      {alert.summary}
                    </span>
                    <span className="text-xs text-gray-500 px-2">
                      {alert.time}
                    </span>
                    <span className="px-3 py-1 text-xs font-bold rounded-full shadow bg-white/40 ml-2 border border-[#b12c5b30]">
                      {alert.priority} priority
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 md:mt-0">
                    {!alert.acknowledged && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-300 hover:bg-green-100 text-green-800"
                        onClick={() => acknowledge(alert.id)}
                      >
                        <CheckCircle size={16} className="mr-1" /> Acknowledge
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:bg-red-100"
                      onClick={() => dismiss(alert.id)}
                    >
                      <X size={16} className="mr-1" /> Dismiss
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AlertPanel;
