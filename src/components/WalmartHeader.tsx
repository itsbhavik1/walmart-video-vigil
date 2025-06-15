
const WalmartSVG = () => (
  <svg
    className="h-10 w-10 mr-3"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Walmart Logo"
  >
    <circle cx="32" cy="32" r="32" fill="#ffc220" />
    <g>
      <path
        d="M32 16v12M32 36v12M20.57 20.57l8.49 8.49M35.43 35.43l8.49 8.49M16 32h12M36 32h12M20.57 43.43l8.49-8.49M35.43 28.57l8.49-8.49"
        stroke="#0071ce"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

const WalmartHeader = () => (
  <header className="relative bg-gradient-to-r from-[#0071ce] via-[#1988e8] to-[#43a8f4] flex items-center px-8 py-5 shadow-lg">
    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-[#0071ce]/30 pointer-events-none" />
    <div className="relative z-10 flex items-center">
      <WalmartSVG />
      <span className="text-white text-2xl md:text-3xl font-bold tracking-tight drop-shadow-sm font-sans">
        Walmart Security <span className="hidden md:inline">|</span>
        <span className="ml-2 text-yellow-300 font-semibold whitespace-nowrap drop-shadow">(Suspicious Activity Detection)</span>
      </span>
    </div>
  </header>
);

export default WalmartHeader;
