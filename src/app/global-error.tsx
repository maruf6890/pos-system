
"use client";
import BasicHeader from "@/components/utils/BasicHeader";
import BasicFooter from "@/components/utils/BasicFooter";
import { AlertCircle } from "lucide-react";

export default function GlobalError() {
  return (
    <div className="bg-[#00030C] min-h-screen flex flex-col text-white">
      <BasicHeader />

      <main className="flex-grow flex flex-col justify-center items-center px-4 text-center max-w-4xl mx-auto">
        <AlertCircle className="w-24 h-24 text-red-500 mb-6" />
        <h1 className="text-3xl sm:text-4xl font-semibold mb-3">
          SOMETHING WENT WRONG
        </h1>
        <p className="mb-8 max-w-md mx-auto text-gray-300 px-2">
          An unexpected error occurred. Please try again later 
        </p>
        {/* Optional Retry or Home Button */}
        {/* <Link href="/" className="text-purple-400 underline hover:text-purple-300 transition">Go to Home</Link> */}
      </main>

      <BasicFooter />
    </div>
  );
}
