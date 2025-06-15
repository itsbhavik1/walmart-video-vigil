
import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Megaphone, UserX, Broom, PhoneCall } from "lucide-react";

const quickActions = [
  {
    icon: <Megaphone size={18} />,
    label: "Announce Lost Child",
    action: "lost_child",
    toastMsg: "Announcement: Lost Child - Please assist in locating the child's guardian immediately.",
  },
  {
    icon: <PhoneCall size={18} />,
    label: "Call Manager",
    action: "call_manager",
    toastMsg: "Manager has been notified and is on the way.",
  },
  {
    icon: <Broom size={18} />,
    label: "Request Cleaning",
    action: "cleaning",
    toastMsg: "Cleaning crew dispatched to the requested area.",
  },
  {
    icon: <UserX size={18} />,
    label: "Open Incident Report",
    action: "incident_report",
    toastMsg: "Incident report panel opened (in real app, this would navigate to the report submission page).",
  },
];

const StoreOperationsPanel: React.FC = () => {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleAction = (action: typeof quickActions[0]) => {
    setLoadingAction(action.action);
    setTimeout(() => {
      setLoadingAction(null);
      toast({
        title: "Store Action",
        description: action.toastMsg,
      });
    }, 1000);
  };

  return (
    <section className="w-full max-w-4xl mx-auto mb-6 animate-fade-in">
      <Card className="bg-white/95 shadow-lg rounded-3xl border-[#0071ce22]">
        <CardContent className="py-5">
          <div className="flex items-center gap-2 mb-3">
            <CardTitle className="text-lg font-bold text-[#0071ce] font-playfair">
              Store Operations: Quick Actions
            </CardTitle>
          </div>
          <div className="flex flex-wrap gap-4 justify-start">
            {quickActions.map((q) => (
              <Button
                key={q.action}
                variant="secondary"
                className="flex items-center gap-2 px-4 py-2 text-[#0071ce] bg-[#e6f1ff] rounded-xl font-medium border border-[#0071ce22] hover:bg-[#ddeeff]"
                onClick={() => handleAction(q)}
                disabled={loadingAction === q.action}
              >
                {q.icon}
                {loadingAction === q.action ? "Processing..." : q.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default StoreOperationsPanel;
