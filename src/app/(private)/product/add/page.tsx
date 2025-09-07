"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { API_URL } from "@/lib/const";
import { addProduct } from "@/app/(private)/products/product.action";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";


type Category = {
  category_id: number,
  name: string

}
type Brand = {
  brand_id: number;
  name: string;
};
// Zod schema for validation
const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category_id: z.number(),
  brand_id: z.number(),
  price: z.number().min(0),
  discount_price: z.number().min(0),
  stock_quantity: z.number().min(0),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function ProductAddForm() {
  const [categories, setCategories] = useState<Category[]>(
    []
  );
  const [brands, setBrands] = useState<Brand[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category_id: 0,
      brand_id: 0,
      price: 0,
      discount_price: 0,
      stock_quantity: 0,
    },
  });

  // Fetch categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/products/category`, {
          credentials: "include",
        });
        const result = await res.json();
        if (!res.ok) {
          console.log(result.error || result.message);
          return;
        }
        setCategories(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  // Fetch brands
  useEffect(() => {
    const getBrands = async () => {
      try {
        const res = await fetch(`${API_URL}/products/brand`, {
          credentials: "include",
        });
        const result = await res.json();
        if (!res.ok) {
          console.log(result.error || result.message);
          return;
        }
        setBrands(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBrands();
  }, []);

  const onSubmit = async(data: ProductFormValues) => {
    console.log("Submitting:", data);
    const result = await addProduct(data);
    toast(result.message);
    
  };
  
  
  const router = useRouter();
  return (
    <div className="max-w-4xl pb-20 mx-auto ">
      <Button onClick={()=>{router.back()}} variant="secondary" className="mb-10"><ChevronLeft/> Back</Button>
      <div>
        <h1 className="text-2xl font-bold mb-1">Add New Product</h1>
        <p className="text-sm text-gray-500 mb-10">
          A form to add a new product to your inventory.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-gray-800"
                    placeholder="Wireless Headphones"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="High-quality wireless headphones..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    className="text-gray-800"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discount_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Price</FormLabel>
                <FormControl>
                  <Input
                    className="text-gray-800"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock_quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                  <Input
                    className="text-gray-800"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-10">
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={field.value ? String(field.value) : ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger >
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem
                          key={c.category_id}
                          value={c.category_id.toString()}
                        >
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={field.value ? String(field.value) : ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((b) => (
                        <SelectItem
                          key={b.brand_id}
                          value={b.brand_id.toString()}
                        >
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              className="bg-[#e51e5a] hover:bg-[#e51e5a]/70 text-white"
            >
              Add Product
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
