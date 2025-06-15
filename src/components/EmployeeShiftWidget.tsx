
import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { User, Users, Coffee } from "lucide-react";

const EMPLOYEES = [
  {
    name: "Maria Gomez",
    role: "Front End Lead",
    status: "On Shift",
    icon: <User size={20} className="text-[#0071ce]" />,
  },
  {
    name: "James Lee",
    role: "Pharmacy",
    status: "Break",
    icon: <Coffee size={20} className="text-[#ffc220]" />,
  },
  {
    name: "Lina Patel",
    role: "Inventory",
    status: "On Shift",
    icon: <Users size={20} className="text-green-500" />,
  },
  {
    name: "Oscar Wu",
    role: "Customer Service",
    status: "Off Shift",
    icon: <User size={20} className="text-gray-400" />,
  },
];

const STATUS_COLOR: Record<string, string> = {
  "On Shift": "bg-green-100 text-green-700",
  "Break": "bg-yellow-100 text-[#cc9600]",
  "Off Shift": "bg-gray-100 text-gray-500",
};

const EmployeeShiftWidget: React.FC = () => (
  <section className="w-full max-w-4xl mx-auto mb-4 animate-fade-in">
    <Card className="bg-white/90 rounded-2xl border-blue-100 shadow-lg border">
      <CardContent className="py-4">
        <div className="flex items-center gap-2 mb-2">
          <Users size={23} className="text-[#0071ce]" />
          <CardTitle className="text-base font-bold text-[#0071ce] font-playfair">
            Employee Shift Status
          </CardTitle>
        </div>
        <div className="flex flex-wrap gap-4">
          {EMPLOYEES.map((emp) => (
            <div
              key={emp.name}
              className="flex flex-col items-center min-w-[100px] rounded-xl border border-blue-50 bg-[#f6fafd] px-4 py-2 shadow hover:scale-105 transition"
            >
              {emp.icon}
              <span className="font-medium text-[#232e41]">{emp.name}</span>
              <span className="text-xs text-gray-600">{emp.role}</span>
              <span
                className={`mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLOR[emp.status]}`}
              >
                {emp.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </section>
);

export default EmployeeShiftWidget;
