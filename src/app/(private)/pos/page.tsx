"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Printer, Save, Clock, X, Plus, Minus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

// Dummy data
const dummyUsers = [
  { id: 1, name: "John Doe", phone: "+1234567890", due: 150.5 },
  { id: 2, name: "Jane Smith", phone: "+1987654321", due: 0 },
  { id: 3, name: "Mike Johnson", phone: "+1122334455", due: 75.25 },
];

const initialProducts = [
  { id: 1, name: "iPhone 15 Pro", price: 999, stock: 10 },
  { id: 2, name: "AirPods Pro", price: 249, stock: 20 },
];

export default function POSCartPage() {
  const [userSearch, setUserSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<
    (typeof dummyUsers)[0] | null
  >(null);
  const [note, setNote] = useState("");
  const [cart, setCart] = useState(
    initialProducts.map((product) => ({ ...product, quantity: 1 }))
  );

  const filteredUsers = dummyUsers.filter((user) =>
    user.name.toLowerCase().includes(userSearch.toLowerCase())
  );

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  const due = selectedUser?.due || 0;
  const grandTotal = total + due;

  const updateQuantity = (id: number, change: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity + change) } : i
      )
    );
  };

  const handleSell = () => {
    if (!selectedUser) return;
    toast.success(`Sale completed for ${selectedUser.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <Card className="w-full max-w-5xl space-y-4 p-4">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Point of Sale
          </CardTitle>
          <Badge variant="outline">Order #101</Badge>
        </CardHeader>

        {/* Search bar and user selector */}
        <div className="relative">
          <Input
            placeholder="Search customer..."
            className="pl-4"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />
          {!selectedUser && userSearch && (
            <div className="absolute top-full mt-1 bg-white border shadow rounded w-full z-10 max-h-64 overflow-y-auto">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedUser(user);
                    setUserSearch("");
                  }}
                >
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.phone}</p>
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <div className="p-3 text-gray-400 text-sm">No match found</div>
              )}
            </div>
          )}
        </div>

        {selectedUser && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
            <div>
              <p className="font-semibold">{selectedUser.name}</p>
              <p className="text-sm text-gray-500">{selectedUser.phone}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">Due: ${due.toFixed(2)}</Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedUser(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Cart items */}
        <CardContent className="space-y-3 p-0">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-3 rounded"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span>{item.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <div className="w-16 text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </CardContent>

        {/* Totals */}
        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          {due > 0 && (
            <div className="flex justify-between text-amber-600">
              <span>Previous Due</span>
              <span>${due.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total Payable</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Order Notes */}
        <div>
          <label className="block text-sm font-medium mb-2">Order Notes</label>
          <Textarea 
            placeholder="Any special instructions..."
            value={note}
            onChange={(e:any) => setNote(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={() => toast("Order saved to pending")}
          >
            <Clock className="w-4 h-4 mr-1" />
            Save Pending
          </Button>
          <Button variant="outline" onClick={() => toast("Preparing print...")}>
            <Printer className="w-4 h-4 mr-1" />
            Print
          </Button>
          <Button
            onClick={handleSell}
            disabled={!selectedUser || cart.length === 0}
            className="bg-primary text-white"
          >
            Confirm Sale
          </Button>
        </div>
      </Card>
    </div>
  );
}
