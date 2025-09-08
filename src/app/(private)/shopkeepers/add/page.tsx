"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Zod schema
const shopkeeperSchema = z.object({
  street: z.string().optional(),
  city_or_upazila: z.string().min(1, "City or Upazila is required"),
  village_or_zone: z.string().optional(),
  postal_code: z.string().optional(),
  landmark: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  phone: z.string().regex(/^\d{10,15}$/, "Phone must be 10-15 digits"),
  email: z.string().email().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["shopkeeper", "admin"]).optional(),
});

type ShopkeeperFormValues = z.infer<typeof shopkeeperSchema>;

export default function ShopkeeperForm() {
  const router = useRouter();

  const form = useForm<ShopkeeperFormValues>({
    resolver: zodResolver(shopkeeperSchema),
    defaultValues: {
      street: "",
      city_or_upazila: "",
      village_or_zone: "",
      postal_code: "",
      landmark: "",
      name: "",
      phone: "",
      email: "",
      password: "",
      role: "shopkeeper",
    },
  });

  const onSubmit = async (data: ShopkeeperFormValues) => {
    console.log("Submitting shopkeeper:", data);

    try {
      const res = await fetch("/api/shopkeepers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success("Shopkeeper added successfully!");
        router.back();
      } else {
        toast.error(result.message || "Failed to add shopkeeper");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <Button
        onClick={() => router.back()}
        variant="secondary"
        className="mb-6"
      >
        Back
      </Button>
      <h1 className="text-2xl font-bold mb-2">Add Shopkeeper</h1>
      <p className="text-gray-500 mb-8">Fill in shopkeeper details.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="017XXXXXXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(val)}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shopkeeper">Shopkeeper</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input placeholder="Street" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city_or_upazila"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City / Upazila</FormLabel>
                <FormControl>
                  <Input placeholder="City or Upazila" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="village_or_zone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Village / Zone</FormLabel>
                <FormControl>
                  <Input placeholder="Village or Zone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="1234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="landmark"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Landmark</FormLabel>
                <FormControl>
                  <Input placeholder="Near XYZ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              className="bg-[#e51e5a] hover:bg-[#e51e5a]/70 text-white"
            >
              Add Shopkeeper
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
