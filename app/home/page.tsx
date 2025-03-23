import { LoanCard } from "./_components/loan-card";
import { WarrantCodeValidator } from "./_components/warrant-code-validator";
import { SignOut } from "./_components/sign-out";
import { Loans } from "./_components/loans";

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
    <main className="bg-white px-12 py-12">
      {/* Warrant Code Validator */}
      <div className="mb-8">
        <WarrantCodeValidator />
      </div>
      {/* Loan Cards */}
      <Loans />
      <SignOut />
    </main>
  );
}
