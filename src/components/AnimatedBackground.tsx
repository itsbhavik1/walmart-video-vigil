
import React from "react";

// SVG morphing blob keyframes in <style>, plus moving colored floating circles.
const AnimatedBackground: React.FC = () => (
  <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden animate-fade-in">
    {/* Morphing SVG Blob */}
    <svg width="900" height="800" viewBox="0 0 900 800" className="absolute left-[-180px] top-[-200px] opacity-40 animate-blob-move" aria-hidden>
      <defs>
        <linearGradient id="grad1" x1="30%" y1="10%" x2="100%" y2="70%">
          <stop offset="0%" stopColor="#7fbcff" />
          <stop offset="100%" stopColor="#ffc220" />
        </linearGradient>
      </defs>
      <path>
        <animate attributeName="d" dur="14s" repeatCount="indefinite"
          values="
            M490,90Q604,161,661.5,281Q719,401,650,499Q581,597,478,637Q375,677,293,605.5Q211,534,156.5,449.5Q102,365,192.5,261.5Q283,158,390.5,124Q498,90,490,90Z;
            M480,120Q591,205,678.5,310Q766,415,692.5,513Q619,611,491.5,664Q364,717,287.5,627.5Q211,538,158,446.5Q105,355,189,260Q273,165,393.5,142.5Q514,120,480,120Z;
            M490,90Q604,161,661.5,281Q719,401,650,499Q581,597,478,637Q375,677,293,605.5Q211,534,156.5,449.5Q102,365,192.5,261.5Q283,158,390.5,124Q498,90,490,90Z;
          "
        />
        <animate attributeName="fill-opacity" values="0.35;0.45;0.35" dur="8s" repeatCount="indefinite" />
      </path>
    </svg>
    {/* Additional gentle blobs */}
    <svg width="400" height="400" className="absolute right-[-100px] bottom-[-60px] opacity-30 animate-blob-move-2"
      aria-hidden>
      <defs>
        <radialGradient id="grad2" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#ffeeb0" />
          <stop offset="90%" stopColor="#0071ce" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="200" rx="180" ry="150" fill="url(#grad2)">
        <animateTransform attributeName="transform" type="rotate"
          from="0 200 200" to="360 200 200" dur="18s" repeatCount="indefinite" />
      </ellipse>
    </svg>
    {/* Particle-like blurred dots floating */}
    {Array.from({ length: 16 }).map((_, i) => (
      <span
        key={i}
        className={`absolute rounded-full pointer-events-none blur-2xl opacity-60`}
        style={{
          background: i % 3 === 0 ? "#7fbcff" : (i % 2 === 0 ? "#ffc220" : "#43a8f4"),
          width: `${32 + ((i * 13) % 70)}px`,
          height: `${32 + ((i * 17) % 52)}px`,
          left: `${(i * 171) % 84}vw`,
          top: `${(i * 41) % 87}vh`,
          animation: `particleFloat ${10 + i % 5}s ease-in-out infinite ${i * 0.7}s alternate`
        }}
      />
    ))}
    <style>{`
      @keyframes particleFloat {
        0% {
          transform: translateY(0) scale(1);
          opacity: .45;
        }
        100% {
          transform: translateY(-60px) scale(1.13) rotate(-7deg);
          opacity: .7;
        }
      }
      .animate-blob-move {
        animation: blobMove 18s ease-in-out infinite alternate;
      }
      @keyframes blobMove {
        0% { transform: scale(1) translateY(0) rotate(0deg);}
        50% { transform: scale(1.04) translateY(18px) rotate(-6deg);}
        100% { transform: scale(0.96) translateY(-14px) rotate(7deg);}
      }
      .animate-blob-move-2 {
        animation: blobMove2 13s cubic-bezier(.68,-0.55,.27,1.55) infinite alternate;
      }
      @keyframes blobMove2 {
        0% { transform: scale(1) translateY(0) rotate(0);}
        50% { transform: scale(1.12) translateY(50px) rotate(14deg);}
        100% { transform: scale(0.9) translateY(-20px) rotate(-18deg);}
      }
    `}</style>
  </div>
);

export default AnimatedBackground;
