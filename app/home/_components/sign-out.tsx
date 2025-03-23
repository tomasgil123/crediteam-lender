"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export const SignOut = () => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="flex justify-center pt-12">
      <Button
        variant="outline"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-destructive hover:text-destructive"
      >
        <LogOut />
        Sign out
      </Button>
    </div>
  );
};
