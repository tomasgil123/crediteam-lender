"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { LoanCard } from "./loan-card";
import { getUserByWorldUserId } from "@/services/users";
import { getLoansByBorrowerId, getLoanById } from "@/services/loans";
import { getLoanBackingsByUserId } from "@/services/loan_backings";
import type { Loan, LoanWithBackerCount } from "@/services/loans";
import type { LoanBacking } from "@/services/loan_backings";

export const Loans = () => {
  const { data: session } = useSession();
  const [loans, setLoans] = useState<LoanWithBackerCount[] | null>(null);
  const [backedLoans, setBackedLoans] = useState<
    (LoanWithBackerCount & { backingStatus: string })[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!session?.user?.name) {
        setLoading(false);
        return;
      }

      try {
        // Get user data
        const userData = await getUserByWorldUserId(session.user.name);
        if (!userData) {
          setError("Could not find user data");
          return;
        }

        // Get user's loans
        const userLoans = await getLoansByBorrowerId(userData.id.toString());
        setLoans(userLoans);

        // Get loans user is backing
        const loanBackings = await getLoanBackingsByUserId(
          userData.id.toString()
        );
        if (loanBackings) {
          // For each backing, get the loan details
          const backedLoansData = await Promise.all(
            loanBackings.map(async (backing: LoanBacking) => {
              const loan = await getLoanById(backing.loan_id);
              return loan ? { ...loan, backingStatus: backing.status } : null;
            })
          );
          setBackedLoans(
            backedLoansData.filter(
              (loan): loan is LoanWithBackerCount & { backingStatus: string } =>
                loan !== null
            )
          );
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch loans data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [session]);

  if (loading) {
    return <p className="text-gray-600">Loading loans...</p>;
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
        <p className="text-gray-600">Please login to view your loans</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">My Loans</h2>
        {loans && loans.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {loans.map((loan) => (
              <LoanCard
                key={loan.id}
                id={loan.id}
                amount={loan.amount}
                status={loan.status}
                backerCount={loan.backer_count}
                minBackers={loan.min_backers}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You don&apos;t have any loans</p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Loans I&apos;m Backing</h2>
        {backedLoans && backedLoans.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {backedLoans.map((loan) => (
              <LoanCard
                key={loan.id}
                id={loan.id}
                amount={loan.amount}
                status={loan.backingStatus}
                backerCount={0}
                minBackers={0}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You aren&apos;t backing any loans</p>
        )}
      </div>
    </div>
  );
};
