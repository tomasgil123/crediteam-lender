"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { LoanCard } from "../_components/loan-card";
import { getUserByWorldUserId } from "@/services/users";
import type { User } from "@/services/users";

export const Loans = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      if (session?.user?.name) {
        try {
          const userData = await getUserByWorldUserId(session.user.name);
          setUser(userData);
        } catch (err) {
          setError("Failed to fetch user data");
          console.error("Error fetching user:", err);
        }
      }
      setLoading(false);
    }

    fetchUser();
  }, [session]);

  if (loading) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-600">Loading loans...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center bg-destructive/10 text-destructive">
        <p>{error}</p>
      </Card>
    );
  }

  if (!session) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-600">Please login to view available loans</p>
      </Card>
    );
  }

  // Determine loan availability based on verification level
  const verificationLevel = user?.verification_level || "none";
  const canAccessDeviceLoan =
    verificationLevel === "device" || verificationLevel === "orb";
  const canAccessOrbLoan = verificationLevel === "orb";

  return (
    <div className="w-full max-w-md space-y-4">
      <LoanCard
        type="Basic Loan"
        amount="200"
        installments="6"
        disabled={!canAccessDeviceLoan}
      />

      <LoanCard
        type="Premium Loan"
        amount="400"
        installments="6"
        disabled={!canAccessOrbLoan}
      />
    </div>
  );
};
