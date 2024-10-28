"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Auth() {
  const router = useRouter();

  useEffect(() => {
    signInWithGoogle();
  }, [router]);

  const signInWithGoogle = async () => {
    try {
      const res = await axios.post("/api/auth", { provider: "google" });
      router.push("/dashboard");
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-semibold">tidy</h1>
      <button
        onClick={signInWithGoogle}
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Sign in with Google
      </button>
    </div>
  );
}
