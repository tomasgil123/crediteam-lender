"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { getLoanById } from "@/services/loans";
import { createLoanBacking } from "@/services/loan_backings";
import { getUserByWorldUserId } from "@/services/users";

export const WarrantCodeValidator = () => {
  const { data: session } = useSession();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!session?.user?.name) {
      setError("Please login first");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Get the loan by ID (code)
      const loan = await getLoanById(code);
      if (!loan) {
        setError("Invalid loan code");
        return;
      }

      // Check if loan status is pending
      if (loan.status !== "pending") {
        setError("This loan is no longer accepting warrants");
        return;
      }

      // Get the current user's ID
      const user = await getUserByWorldUserId(session.user.name);
      if (!user) {
        setError("Could not find your user account");
        return;
      }

      // Create the loan backing
      const loanBacking = await createLoanBacking({
        loan_id: loan.id,
        backer_id: user.id,
        status: "pending",
      });

      if (!loanBacking) {
        setError("Failed to become a warrant. Please try again.");
        return;
      }

      setSuccess(true);
    } catch (err) {
      console.error("Error creating loan backing:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-lg font-medium">
        Enter the code your friend gave you to become their warrant
      </h2>

      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="px-4 py-2 border rounded-md"
        placeholder="Enter code"
        disabled={isLoading}
      />

      {error && (
        <Card className="p-4 bg-destructive/10 text-destructive relative">
          {error}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-1 right-1 h-6 w-6 p-0"
            onClick={() => setError(null)}
          >
            ✕
          </Button>
        </Card>
      )}

      {success && (
        <Card className="p-4 bg-green-100 text-green-800 relative">
          You have successfully become a warrant for this loan!
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-1 right-1 h-6 w-6 p-0"
            onClick={() => {
              setSuccess(false);
              setCode("");
            }}
          >
            ✕
          </Button>
        </Card>
      )}

      <Button onClick={handleSubmit} disabled={isLoading || !code}>
        {isLoading ? "Processing..." : "Confirm"}
      </Button>
    </div>
  );
};
