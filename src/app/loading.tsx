import BasicHeader from "@/components/utils/BasicHeader";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="bg-white min-h-screen flex flex-col text-white">
      <BasicHeader />

      <main className="flex-grow flex flex-col justify-center items-center text-center px-4 space-y-6">
        {/* Pulsing Logo */}
        <div className="animate-pulse">
          <Image
            src="/images/logo.png"
            alt="App Logo"
            width={150}
            height={100}
            className="mx-auto"
          />
        </div>
      </main>
    </div>
  );
}
