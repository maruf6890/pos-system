"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export function Cart() {
    const [open, setOpen] = useState(false);
    const total = useCartStore((state) => state.count);


  const cartItems = [
    { id: 1, name: "Wireless Mouse", price: 25.99, quantity: 2 },
    { id: 2, name: "Bluetooth Headphones", price: 99.99, quantity: 1 },
  ];

  

  return (
    <Drawer direction="right"   open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {total> 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {total}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader>
          <DrawerTitle>Your Cart</DrawerTitle>
        </DrawerHeader>
        <div className="space-y-3">
          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="mt-4 flex justify-between items-center font-semibold">
            
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
