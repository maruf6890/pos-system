import { Card ,CardAction,CardContent,CardHeader,CardTitle,CardFooter,CardDescription} from '@/components/ui/card';
import React from 'react'

import { Button } from '@/components/ui/button';
import { Plus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Product } from './ProductPage';

export default function ProductCard({ product, onSelect }: { product: Product , onSelect: (product_id: number,price:string) => void}) {
  return (
    <Card className="justify-between">
      <CardContent>
        <CardTitle className="text-sm">{product.name}</CardTitle>
        <CardDescription className="text-xs">
          {product.category_name}
          <p>{product.brand_name}</p>
        </CardDescription>
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg mt-2 font-bold">${product?.price}</p>
        </div>
        <div className="flex items-center gap-1 text-yellow-500"></div>
      </CardContent>
      <CardFooter className="flex  justify-between">
        <p className="text-xs ">
          <span className="text-[#e51e5a] capitalize font-bold">
            {product.stock_quantity} in stock
          </span>
        </p>
        <Button
          onClick={()=>{onSelect(product.product_id,product.price.toString())}}
          variant="secondary"
          className="border bg-[#e51e5a] hover:bg-[#e51e5a]/70 text-white"
          size="icon"
        >
          <ShoppingCart className="h-4 w-4 text-white " />
        </Button>
      </CardFooter>
    </Card>
  );
}
