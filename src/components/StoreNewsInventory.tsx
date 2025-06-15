
import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { AlertCircle, ShoppingCart } from "lucide-react";

const trendingAlerts = [
  {
    icon: <AlertCircle size={22} className="text-red-600" />,
    headline: "Nintendo Switch – SOLD OUT",
    time: "Just now",
    description: (
      <>
        <span className="font-semibold text-red-700">Urgent:</span>{" "}
        The Nintendo Switch console has sold out online and in most locations.
        <br />
        <span>Notify your team when restocked. Customers are asking at all front desks.</span>
      </>
    ),
    color: "bg-[#ffefef] border-l-4 border-[#e9342a]",
  },
  {
    icon: <ShoppingCart size={20} className="text-[#0071ce]" />,
    headline: "Apple iPads – Low Stock",
    time: "7 min ago",
    description: (
      <>
        Supplies low (<span className="font-bold text-[#0071ce]">6 units left</span>) in electronics.
        <br />
        Restock request sent. Track in inventory dashboard.
      </>
    ),
    color: "bg-[#f0f7ff] border-l-4 border-[#43a8f4]",
  },
];

const StoreNewsInventory: React.FC = () => (
  <section className="w-full max-w-4xl mx-auto mb-5 animate-fade-in">
    <Card className="bg-white/90 border-[#0071ce15] rounded-3xl shadow-lg mb-0">
      <CardContent className="py-5">
        <div className="flex items-center gap-2 mb-3">
          <ShoppingCart className="text-[#ffc220]" size={26} />
          <CardTitle className="text-xl font-bold text-[#0071ce] font-playfair">
            Store News &amp; Inventory Alerts
          </CardTitle>
        </div>
        <ul className="flex flex-col gap-3">
          {trendingAlerts.map((item, i) => (
            <li
              key={item.headline}
              className={`flex items-start gap-3 px-4 py-3 rounded-2xl shadow-sm ${item.color}`}
            >
              <span className="mt-0.5">{item.icon}</span>
              <div>
                <div className="text-base font-medium leading-snug text-[#232e41]">
                  {item.headline}
                  <span className="text-xs ml-2 px-2 py-0.5 bg-[#fbe5d6] rounded-full text-[#98500a] font-semibold">
                    {item.time}
                  </span>
                </div>
                <div className="text-xs text-gray-600 mt-0.5">{item.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </section>
);

export default StoreNewsInventory;
