"use client";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { LoginFormData, loginSchema } from "@/lib/validation_schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { login } from "./auth.action";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const loginform = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const handleLogin = async (data: LoginFormData) => {
   
    const result = await login({ identifier: data.emailOrPhone, password: data.password });
    if (!result.success) {
      toast(result.message);
      return;
    }
    toast(result.message);
    console.log(result);
    router.push('/')
    
    
  }

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-white font-sans text-gray-900 px-4">
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
        <Form {...loginform}>
          <form
            onSubmit={loginform.handleSubmit(handleLogin)}
            className="space-y-6"
          >
            {/* Email / Phone Field */}
            <FormField
              control={loginform.control}
              name="emailOrPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Or Phone</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Enter email or phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field with Eye Toggle */}
            <FormField
              control={loginform.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="text-black"
                        placeholder="Enter password"
                        {...field}
                      
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <Eye className="h-5 w-5" />
                        ) : (
                          <EyeClosed className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Forgot Password */}
            <div className="text-right text-sm text-[#ff3d6e] hover:text-[#ff3d6e]/80 cursor-pointer hover:underline">
              Forgot Password?
            </div>

            {/* Submit Button */}
            <InteractiveHoverButton className="w-full text-center text-white bg-[#ff3d6e] hover:bg-[#ff3d6e]/80 border-transparent flex items-center justify-center">
              Sign In
            </InteractiveHoverButton>
          </form>
        </Form>

        {/* Signup Link */}
        <div className="text-sm text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <span className="text-[#ff3d6e] hover:text-[#ff3d6e]/80 hover:underline cursor-pointer">
            Sign up
          </span>
        </div>
      </div>

      {/* Background Dot Pattern */}
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
