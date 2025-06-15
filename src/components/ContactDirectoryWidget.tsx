
import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PhoneCall, Store, Truck, ShoppingCart } from "lucide-react";

const CONTACTS = [
  {
    department: "Front End",
    extension: "101",
    icon: <Store className="text-[#0071ce]" size={17} />,
    tel: "tel:+18005551001",
  },
  {
    department: "Pharmacy",
    extension: "103",
    icon: <ShoppingCart className="text-[#ffc220]" size={17} />,
    tel: "tel:+18005551003",
  },
  {
    department: "Receiving Dock",
    extension: "105",
    icon: <Truck className="text-green-600" size={17} />,
    tel: "tel:+18005551005",
  },
  {
    department: "Manager On Duty",
    extension: "999",
    icon: <PhoneCall className="text-pink-600" size={17} />,
    tel: "tel:+18005559999",
  },
];

const ContactDirectoryWidget: React.FC = () => (
  <section className="w-full max-w-4xl mx-auto mb-4 animate-fade-in">
    <Card className="bg-white/90 border-blue-100 rounded-2xl shadow-lg border">
      <CardContent className="py-4">
        <div className="flex items-center gap-2 mb-2">
          <PhoneCall size={22} className="text-[#0071ce]" />
          <CardTitle className="text-base font-bold text-[#0071ce] font-playfair">
            Quick Store Contact Directory
          </CardTitle>
        </div>
        <div className="flex flex-wrap gap-4">
          {CONTACTS.map((c) => (
            <a
              key={c.department}
              href={c.tel}
              className="flex flex-col items-center min-w-[96px] rounded-xl border border-blue-50 bg-[#f7fbff] px-4 py-2 shadow hover:scale-105 hover:bg-[#eafdff] transition"
              title={`Call ${c.department} (${c.extension})`}
            >
              {c.icon}
              <span className="font-semibold text-[#232e41]">{c.department}</span>
              <span className="text-xs text-gray-600">x{c.extension}</span>
              <span className="text-[10px] text-[#0071ce] underline mt-0.5">Call</span>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  </section>
);

export default ContactDirectoryWidget;
