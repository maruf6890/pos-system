"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Product = {
  id: number;
  name: string;
  company: string;
  quantity: number;
  sales: number;
  image: string;
};

export function TopProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Mock fetch - replace with actual API call
    async function loadProducts() {
      const response = await fetch("/data/product.json");
      const data = await response.json();
      const sorted = data
        .sort((a: Product, b: Product) => b.sales - a.sales)
        .slice(0, 5);
      setProducts(sorted);
    }

    loadProducts();
  }, []);

  return (
    <div className="rounded-md border p-6 my-10">
      <h1 className="text-lg font-semibold p-4 border-b">Top Selling Products</h1>

      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Product</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Sales</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium w-[250px] ">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  {product.name.slice(0, 20)  + (product.name.length > 20 ? "..." : "")}
                </div>
              </TableCell>
              <TableCell>{product.company}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell className="text-right">112</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
