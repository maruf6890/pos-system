"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { API_URL } from "@/lib/const";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CartSearchUser, { CustomerSearchData } from "./CartUserSearch";

export interface CartItem {
  cart_id: number;
  shopkeeper_id: number;
  product_id: number;
  quantity: number;
  cart_price: number;
  product_name: string;
  stock_quantity: number;
}

export function Cart({ shopkeeper_id }: { shopkeeper_id: number | null }) {
  const [open, setOpen] = useState(false);
  const total = useCartStore((state) => state.count);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [customer, setCustomer] = useState<CustomerSearchData|null> (null);
  const [customerPrevDue, setCustomerPrevDue] = useState<null|number>(null);
  const [paidAmount, setPaidAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await fetch(`${API_URL}/cart/${shopkeeper_id}`, {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();
        if (!res.ok) {
          console.log(result);
          return result;
        }
        setCartItems(result.data);

        // Calculate subtotal
        const total = result.data.reduce(
          (sum: number, item: CartItem) =>
            sum + item.cart_price * item.quantity,
          0
        );
        setSubtotal(total);
      } catch (error) {
        console.error(error);
      }
    };
    if (open) {
      getCart();
    }
  }, [shopkeeper_id, open]);

  const handleQuantityChange = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const res = await fetch(`${API_URL}/cart/update-quantity`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_id: id,
          quantity: newQuantity,
        }),
      });

      if (res.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.cart_id === id ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/cart/remove-item`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart_id: id }),
      });

      if (res.ok) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.cart_id !== id)
        );
        // Update the cart store count
        useCartStore.getState().decrement();
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  let payableAmount = subtotal - discount;
  if (customer?.paymentDue) {
    payableAmount = customer.paymentDue;
  }
  const dueAmount = payableAmount - paidAmount;


  const handleConfirmSale = async () => {
    try {
      const res = await fetch(`${API_URL}/sales/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shopkeeper_id,
          items: cartItems,
          discount,
          paid_amount: paidAmount,
          payment_method: paymentMethod,
          total_amount: payableAmount,
        }),
      });

      if (res.ok) {
        // Clear cart on successful sale
        setCartItems([]);
        setOpen(false);
        // Reset cart count in store
      
      }
    } catch (error) {
      console.error("Error confirming sale:", error);
    }
  };
  
  const handleSearch = (user:CustomerSearchData) => {
    setCustomer(user);
    setCustomerPrevDue(user.paymentDue);

  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {total > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {total}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full w- sm:max-w-md lg:max-w-xl p-10 overflow-y-auto">
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <SheetTitle className="text-xl font-bold">Your Cart</SheetTitle>
        </SheetHeader>
        <div className="space-y-1">
          <CartSearchUser onSelect={handleSearch} />
        </div>
        {customer && (
          <div>
            <h3 className="font-semibold text-lg">Customer Details</h3>
            <p>Name: {customer.name}</p>
            <p>Phone: {customer.phone}</p>
            {customer.email && <p>Email: {customer.email}</p>}
          </div>
        )}

        <div className="py-4 space-y-4">
          {/* Cart Items */}
          <div className="space-y-3 max-h-[35vh] overflow-y-auto pr-2">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <Button className="mt-4" onClick={() => setOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cart_id}
                  className="flex gap-3 p-3 border rounded-lg bg-card"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.product_name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.cart_price} × {item.quantity}
                    </p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          handleQuantityChange(item.cart_id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="mx-2 text-sm font-medium min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          handleQuantityChange(item.cart_id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.stock_quantity}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive/90"
                      onClick={() => removeItem(item.cart_id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                    <p className="font-semibold text-sm">
                      ${(item.cart_price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <>
              <Separator />

              {/* Order Summary */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Order Summary</h3>

                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)}</span>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="discount" className="text-xs">
                    Discount
                  </Label>
                  <Input
                    id="discount"
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    min="0"
                    max={subtotal}
                    className="h-9"
                  />
                </div>
                {customer?.paymentDue && <p>payment due: {customer.paymentDue}</p>}

                <div className="flex justify-between font-medium text-base pt-2">
                  <span>Payable Amount</span>
                  <span>${payableAmount.toFixed(2)}</span>
                </div>

                <Separator />

                {/* Payment Section */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <Label htmlFor="paidAmount" className="text-xs">
                        Paid Amount
                      </Label>
                      <Input
                        id="paidAmount"
                        type="number"
                        value={paidAmount}
                        onChange={(e) => setPaidAmount(Number(e.target.value))}
                        min="0"
                        max={payableAmount}
                        className="h-9"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="paymentMethod" className="text-xs">
                        Payment Method
                      </Label>
                      <Select
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                      >
                        <SelectTrigger className="h-9 w-full">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="Card">Card</SelectItem>
                          <SelectItem value="Mobile Payment">
                            Mobile Payment
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="note" className="text-xs">
                      Note (Optional)
                    </Label>
                    <Textarea
                      id="note"
                      placeholder="Add a note to this order"
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-medium">Payment Due:</span>
                    <Badge
                      variant={dueAmount > 0 ? "secondary" : "default"}
                      className="text-sm px-2 py-1"
                    >
                      ${dueAmount.toFixed(2)}
                    </Badge>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <SheetFooter className="flex flex-row gap-2 pt-4">
            <Button variant="outline" className="flex-1 h-10">
              Save as Pending
            </Button>
            <Button className="flex-1 h-10" onClick={handleConfirmSale}>
              Confirm Sale
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
