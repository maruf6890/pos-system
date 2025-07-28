
"use client";
import { Button } from "@/components/ui/button";
import BasicFooter from "@/components/utils/BasicFooter";
import BasicHeader from "@/components/utils/BasicHeader";
import { AlertCircle, Home } from "lucide-react";
import Link from "next/link";

export default function Error() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
     <BasicHeader/>

      <main className="flex-grow flex flex-col justify-center items-center px-4 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex flex-col items-center">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-semibold mb-3 text-gray-800">
              Something Went Wrong
            </h1>
            <p className="mb-6 text-gray-600">
              An unexpected error occurred. Please try again later.
            </p>

            <Button
              asChild
              className="mt-4"
              style={{ backgroundColor: "#e51e5a" }}
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Return to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <BasicFooter />
    </div>
  );
}