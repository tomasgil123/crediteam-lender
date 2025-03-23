import Image from "next/image";
import { LoanCard } from "./_components/loan-card";

export default function Home({
  verification_level,
}: {
  verification_level: string;
}) {
  // Determine loan availability based on verification level
  const canAccessDeviceLoan =
    verification_level === "device" || verification_level === "orb";
  const canAccessOrbLoan = verification_level === "orb";

  return (
    <main className=" bg-white px-12 py-12">
      {/* Loan Cards */}
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
    </main>
  );
}
