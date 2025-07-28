// components/PurchaseHistory.tsx
"use client";

import ProductCard from "../../products/ProductCard";
import { Product } from "@/app/(private)/products/types";
type Props = {
  products: Product[];
};

export default function PurchaseHistory({ products }: Props) {
  const recentFive = products.slice(0, 5);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Purchase History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentFive.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
