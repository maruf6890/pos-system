"use client";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-white font-sans text-gray-900 px-4">
      {/* Background Pattern */}

      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-lg border border-gray-200 z-50">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={40}
            className=""
          />
        </div>

        <h2 className="text-xl font-medium mb-1 text-center">Sign In</h2>
        <p className="text-gray-600 text-md text-center mb-6">
          Access Your Candidate Insights
        </p>

        {/* Form */}
        <form className="space-y-6">
          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email" className="text-gray-800 mb-3">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="bg-gray-50 border-gray-200 text-gray-900 focus-visible:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div className="space-y-1 relative">
            <Label htmlFor="password" className="text-gray-800 mb-3">
              Password
            </Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="bg-gray-50 border-gray-200 text-gray-900 pr-10 focus-visible:ring-purple-500"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm text-[#ff3d6e] hover:text-[#ff3d6e]/80 cursor-pointer hover:underline">
            Forgot Password?
          </div>

          {/* Submit Button */}
          <InteractiveHoverButton className="w-full text-center text-white bg-[#ff3d6e] hover:bg-[#ff3d6e]/80 border-transparent flex items-center justify-center">
            Sign In
          </InteractiveHoverButton>
        </form>

        {/* Signup Link */}
        <div className="text-sm text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <span className="text-[#ff3d6e] hover:text-[#ff3d6e]/80 hover:underline cursor-pointer">
            Sign up
          </span>
        </div>
      </div>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(" ")}
      />
    </div>
  );
}
