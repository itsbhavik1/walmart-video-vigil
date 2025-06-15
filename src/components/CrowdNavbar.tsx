
import React from "react";
import { LayoutDashboard, LayoutList, Menu } from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Hot Zones",
    icon: LayoutList,
    active: false,
  },
  {
    title: "Menu",
    icon: Menu,
    active: false,
  },
];

const CrowdNavbar: React.FC = () => (
  <nav
    className="flex w-full items-center justify-between rounded-2xl bg-white/95 px-6 py-2 shadow-lg border border-[#43a8f420] mb-5 animate-fade-in"
    aria-label="Crowd Management Navigation"
  >
    <div className="flex items-center gap-4">
      <span className="text-[#0071ce] font-bold text-lg tracking-tight flex items-center gap-2">
        <LayoutDashboard size={20} className="text-[#ffc220]" />
        Crowd Management
      </span>
      <span className="ml-4 text-xs px-2 py-1 rounded-full bg-[#ffeeb0] text-[#ab7200] font-semibold shadow border border-[#ffc22060]">
        Live Demo
      </span>
    </div>
    <div className="flex gap-2">
      {navItems.map((item) => (
        <button
          key={item.title}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition font-medium text-sm
            ${item.active
              ? "bg-[#0071ce]/90 text-white shadow"
              : "bg-gray-50 text-[#0071ce] hover:bg-[#0071ce]/15"
            }
          `}
          aria-current={item.active ? "page" : undefined}
          type="button"
          tabIndex={0}
        >
          <item.icon size={16} /> {item.title}
        </button>
      ))}
    </div>
  </nav>
);

export default CrowdNavbar;
