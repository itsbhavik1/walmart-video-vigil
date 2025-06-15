
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

interface RestockRequestButtonProps {
  item: string;
  disabled?: boolean;
}

const RestockRequestButton: React.FC<RestockRequestButtonProps> = ({ item, disabled }) => {
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    setLoading(true);
    // Simulate sending request -- in real usage, replace with API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Restock Request Sent",
        description: `A request to restock "${item}" has been submitted to inventory management.`,
      });
    }, 900);
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleRequest}
      disabled={loading || disabled}
      className="border-[#0071ce60] text-[#0071ce] hover:bg-[#e6f1ff] ml-2"
    >
      <ShoppingCart size={16} className="mr-1" />
      {loading ? "Requesting..." : "Restock"}
    </Button>
  );
};

export default RestockRequestButton;
