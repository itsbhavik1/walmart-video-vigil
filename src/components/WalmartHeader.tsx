
import walmartLogo from "@/assets/walmart-logo.png";

const WalmartHeader = () => (
  <header className="bg-[#0071ce] flex items-center px-8 py-4 shadow-md">
    <img src={walmartLogo} alt="Walmart Logo" className="h-10 w-10 mr-3" />
    <span className="text-white text-2xl font-semibold tracking-tight">
      Walmart Security | Suspicious Activity Detection
    </span>
  </header>
);

export default WalmartHeader;
