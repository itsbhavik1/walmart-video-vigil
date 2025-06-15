
import React from "react";
import { cn } from "@/lib/utils";

interface FancyTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const FancyTitle: React.FC<FancyTitleProps> = ({ title, subtitle, className }) => (
  <div
    className={cn(
      "relative mb-6 w-full max-w-2xl mx-auto",
      className
    )}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-[#ffc22040] via-[#43a8f425] to-[#0071ce20] blur-[2.5px] rounded-3xl z-0 pointer-events-none" />
    <div className="relative z-10 text-center px-2 py-4 md:py-6 rounded-3xl shadow-xl bg-white/80 backdrop-blur-md border-2 border-[#0071ce15] card-glass">
      <span className="block text-xl md:text-3xl font-bold text-[#0071ce] font-playfair tracking-tight drop-shadow-md animate-fade-in">
        {title}
      </span>
      {subtitle && (
        <span className="mt-2 block text-sm md:text-lg text-[#535366] font-inter font-normal animate-fade-in-slow">
          {subtitle}
        </span>
      )}
      {/* Decorative underline */}
      <span className="block h-1 w-24 mx-auto mt-4 rounded-full bg-gradient-to-r from-[#ffc220] via-[#ffeeb0] to-[#0071ce50] animate-flash" />
    </div>
    <style>{`
      @keyframes flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      .animate-flash {
        animation: flash 2.2s linear infinite;
      }
      .animate-fade-in {
        animation: fadeInTitle 1.2s cubic-bezier(.45,.7,.5,1.01) both;
      }
      .animate-fade-in-slow {
        animation: fadeInTitle 1.7s 0.25s cubic-bezier(.45,.7,.5,1.01) both;
      }
      @keyframes fadeInTitle {
        0% { opacity: 0; transform: translateY(-18px) scale(.93);}
        100% { opacity: 1; transform: translateY(0) scale(1);}
      }
      .card-glass {
        backdrop-filter: blur(13px) saturate(132%);
        background: rgba(255,255,255,0.82);
        box-shadow: 0 7px 34px 0 #0071ce12, 0 1.5px 7px #0071ce13;
        border-radius: 2.3rem;
      }
    `}</style>
  </div>
);

export default FancyTitle;
