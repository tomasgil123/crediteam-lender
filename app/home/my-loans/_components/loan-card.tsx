"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface LoanCardProps {
  amount: number;
  status: string;
  id: string;
  backerCount: number;
  minBackers: number;
}

export const LoanCard = ({
  amount,
  status,
  id,
  backerCount,
  minBackers,
}: LoanCardProps) => {
  const handleShare = () => {
    navigator.clipboard.writeText(id);
  };

  return (
    <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-3xl font-bold text-primary">${amount}</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600">
              Status:{" "}
              {status.toLowerCase() === "approved" ? (
                <span className="font-medium capitalize px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  {status}
                </span>
              ) : (
                <span className="font-medium capitalize">{status}</span>
              )}
            </p>
            <p className="text-sm text-gray-600">
              Backers: <span className="font-medium">{backerCount}</span> /{" "}
              <span className="font-medium">{minBackers}</span>
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-primary"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Code
        </Button>
      </div>
    </Card>
  );
};
