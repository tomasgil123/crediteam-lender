"use client";
import { signIn, signOut, useSession } from "next-auth/react";
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
      </p>
      <div className="text-center">
        <Button variant="default" onClick={() => signIn()}>
          Sign in
        </Button>
      </div>
    </div>
  );
};
