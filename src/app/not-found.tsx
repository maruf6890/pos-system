
import BasicFooter from "@/components/utils/BasicFooter";
import BasicHeader from "@/components/utils/BasicHeader";
import Link from "next/link";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className=" min-h-screen flex flex-col text-white">
      
      <BasicHeader />
      <main className="flex-grow flex flex-col justify-center items-center px-4 text-center max-w-4xl mx-auto">
        <h1
          className="
            text-[8rem] sm:text-[10rem] md:text-[10rem] font-medium
            bg-gradient-to-r from-black via-black to-gray-600 
            bg-clip-text text-transparent select-none
          "
        >
          404
        </h1>
        <p className="text-3xl sm:text-2xl text-gray-900 font-semibold mb-3">
          PAGE NOT FOUND
        </p>
        <p className="mb-8 max-w-md mx-auto text-gray-700 px-2">
          The page you are looking for does not exist or has been moved.
        </p>
      </main>
      <BasicFooter/>
      
    </div>
  );
}
