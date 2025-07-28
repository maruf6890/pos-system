import { Card ,CardAction,CardContent,CardHeader,CardTitle,CardFooter,CardDescription} from '@/components/ui/card';
import React from 'react'
import { Product } from './types';
import { Button } from '@/components/ui/button';
import { Plus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

export default function ProductCard({product}: {product: Product}) {
    return (
      <Card key={product.id} className="justify-between">
        <CardHeader className="w-full flex justify-center">
          <Image
            width={200}
            height={100}
            alt={product.name}
            src={`/` + product.image}
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-sm">{product.name}</CardTitle>
          <CardDescription className="text-xs">
            {product.category}
          </CardDescription>
          <div className="flex items-center justify-between mb-2">
            <p className="text-lg mt-2 font-bold">${product?.regular_price}</p>
          </div>
          <div className="flex items-center gap-1 text-yellow-500"></div>
        </CardContent>
        <CardFooter className="flex  justify-between">
          <p className="text-xs ">
            <span className="text-[#e51e5a] capitalize font-bold">
              {product.quantity} in stock
            </span>
          </p>
          <Button
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
