"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

interface LoanCardProps {
  type: string;
  amount: string;
  installments: string;
  disabled?: boolean;
}

export function LoanCard({
  type,
  amount,
  installments,
  disabled = false,
}: LoanCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (!disabled) {
      const loanId = type.toLowerCase().replace(/\s+/g, "-");
      router.push(`/explanation?loan_id=${loanId}`);
    }
  };

  return (
    <Card
      className={`p-5 transition-all duration-300 ${
        disabled
          ? "cursor-not-allowed bg-gray-200"
          : "cursor-pointer bg-purple-500 hover:bg-purple-600"
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2
            className={`text-xl font-medium ${
              disabled ? "text-gray-500" : "text-white"
            }`}
          >
            {type}
          </h2>
          <p
            className={`text-5xl font-bold mt-1 ${
              disabled ? "text-gray-400" : "text-white"
            }`}
          >
            ${amount}
          </p>
          <p
            className={`text-sm mt-1 ${
              disabled ? "text-gray-500" : "text-white"
            }`}
          >
            {installments} installments
          </p>
        </div>
      </div>
    </Card>
  );
}
