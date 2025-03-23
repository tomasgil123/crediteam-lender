"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export const SignIn = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/home");
    }
  }, [session, router]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <Image
        src="/crediteam_image.png"
        alt="Crediteam Image"
        width={300}
        height={100}
      />
      <Image
        src="/crediteam_logo.png"
        alt="Crediteam Logo"
        width={300}
        height={100}
      />
      <p className="text-center max-w-2xl mt-4 text-gray-600">
        Redefining credit to be a tool for change, not just debt.
      </p>
      <div className="text-center">
        <Button
          variant="default"
          onClick={() => signIn("worldcoin", { callbackUrl: "/home" })}
        >
          Sign in with Worldcoin
        </Button>
      </div>
    </div>
  );
};
