"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import Link from "next/link";

function generateShareableLink(loanId: string) {
  const appId = process.env.APP_ID;
  const baseUrl = process.env.NEXTAUTH_URL;

  if (!appId || !baseUrl) {
    throw new Error("Missing required environment variables");
  }

  const path = encodeURIComponent(`${baseUrl}/warrant?loan_id=${loanId}`);
  return `https://worldcoin.org/mini-app?app_id=${appId}&path=${path}&loan_id=${loanId}`;
}

export default function ExplanationPage({
  params,
}: {
  params: { loan_id: string };
}) {
  const shareableLink = generateShareableLink(params.loan_id);

  return (
    <main className="flex min-h-screen flex-col items-center bg-white px-4 py-12">
      <Card className="w-full max-w-md space-y-8 p-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl">💰</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-primary">
            GATHER YOUR TEAM OF WARRANTS
          </h1>

          <p className="text-xl text-gray-600">
            You need at least 3 friends to back your loan
          </p>
        </div>

        <div className="space-y-4 text-center">
          <p className="text-gray-600">
            Your friends will act as warrants and commit to pay your loan
            installments if you can&apos;t
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Share this unique link with your friends. Once they accept,
            they&apos;ll become warrants for your loan. Remember, you need at
            least 3 friends to proceed.
          </p>

          <Button
            className="w-full gap-2 bg-primary"
            size="lg"
            onClick={() => {
              navigator.clipboard.writeText(shareableLink);
              // You might want to add a toast notification here
            }}
          >
            <Send className="h-5 w-5" />
            Copy Shareable Link
          </Button>

          <Link href="/home" className="block text-center">
            <Button variant="link" className="text-primary">
              Go back to home
            </Button>
          </Link>
        </div>
      </Card>
    </main>
  );
}
