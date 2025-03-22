"use client";
import {
  MiniKit,
  VerificationLevel,
  ISuccessResult,
  MiniAppVerifyActionErrorPayload,
  IVerifyResponse,
} from "@worldcoin/minikit-js";
import { useState } from "react";

export type VerifyCommandInput = {
  action: string;
  signal?: string;
  verification_level?: VerificationLevel;
};

const baseVerifyPayload: VerifyCommandInput = {
  action: "login-device",
  signal: "",
};

export const VerifyBlock = () => {
  const [handleVerifyResponse, setHandleVerifyResponse] = useState<
    MiniAppVerifyActionErrorPayload | IVerifyResponse | null
  >(null);

  const handleVerify = async (verificationLevel: VerificationLevel) => {
    if (!MiniKit.isInstalled()) {
      console.warn("Tried to invoke 'verify', but MiniKit is not installed.");
      return null;
    }

    const verifyPayload = {
      ...baseVerifyPayload,
      action:
        verificationLevel === VerificationLevel.Device
          ? "login-device"
          : "login-orb",
      verification_level: verificationLevel,
    };

    const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

    // no need to verify if command errored
    if (finalPayload.status === "error") {
      console.log("Command error");
      console.log(finalPayload);

      setHandleVerifyResponse(finalPayload);
      return finalPayload;
    }

    // Verify the proof in the backend
    const verifyResponse = await fetch(`/api/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: finalPayload as ISuccessResult,
        action: verifyPayload.action,
        signal: verifyPayload.signal,
      }),
    });

    const verifyResponseJson = await verifyResponse.json();

    if (verifyResponseJson.status === 200) {
      console.log("Verification success!");
      console.log(finalPayload);
    }

    setHandleVerifyResponse(verifyResponseJson);
    return verifyResponseJson;
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Verify Block</h1>
      <div className="flex gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg"
          onClick={() => handleVerify(VerificationLevel.Device)}
        >
          Verify with Device
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg"
          onClick={() => handleVerify(VerificationLevel.Orb)}
        >
          Verify with Orb
        </button>
      </div>
      {handleVerifyResponse && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="font-semibold mb-2">Verification Response:</h2>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(handleVerifyResponse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
