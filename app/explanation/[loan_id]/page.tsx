"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import Link from "next/link";

export default function ExplanationPage({
  params,
}: {
  params: { loan_id: string };
}) {
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
            You need at least 2 friends to back your loan
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
            Share this code with your friends. When they enter this code in
            their app, they&apos;ll become warrants for your loan. Remember, you
            need at least 2 friends to proceed.
          </p>

          <div className="w-full text-center p-4 bg-gray-100 rounded-lg">
            <p className="text-2xl font-bold text-primary">{params.loan_id}</p>
          </div>

          <Button
            className="w-full gap-2 bg-primary"
            size="lg"
            onClick={() => {
              navigator.clipboard.writeText(params.loan_id);
              // You might want to add a toast notification here
            }}
          >
            <Send className="h-5 w-5" />
            Copy Code
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
