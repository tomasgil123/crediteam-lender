import { Loans } from "./_components/loans";

export default function MyLoans() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white px-12 py-12">
      <div className="w-full max-w-5xl">
        <Loans />
      </div>
    </main>
  );
}
