"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  ShieldCheck,
  Trash2,
  Ban,
  Mail,
  Phone,
  Smartphone,
  MessageSquare,
  MapPin,
  User,
  CreditCard,
  ShoppingBag,
  History,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useState } from "react";
import { TransactionHistory } from "./TransactionHistory";

type BDAddress = {
  division: string;
  district: string;
  postCode?: string;
  city?: string;
  area?: string;
  roadNumber?: string;
  houseNumber?: string;
  sector?: string;
  village?: string;
  union?: string;
  upazila?: string;
};

type Customer = {
  id: string;
  name: string;
  address: BDAddress;
  phoneNumber: string;
  alternatePhoneNumber?: string;
  email?: string;
  whatsappNumber?: string;
  debt?: number;
  lastPurchasedDate?: string;
  isVerified?: boolean;
};

const customer: Customer = {
  id: "cus-005",
  name: "Nayeem Islam",
  address: {
    sector: "5",
    area: "Shaheb Bazar",
    postCode: "6000",
    city: "Rajshahi",
    district: "Rajshahi",
    division: "Rajshahi",
  },
  phoneNumber: "01310000005",
  alternatePhoneNumber: "01420000005",
  email: "nayeem@example.com",
  whatsappNumber: "01310000005",
  debt: 300.0,
  lastPurchasedDate: "2025-07-23T16:15:00Z",
  isVerified: true,
};

const purchasedProducts = [
  {
    id: "prod-001",
    name: "Premium Leather Wallet",
    date: "2025-07-23T16:15:00Z",
    price: 1200,
    quantity: 1,
  },
  {
    id: "prod-002",
    name: "Wireless Earbuds",
    date: "2025-06-15T10:30:00Z",
    price: 2500,
    quantity: 2,
  },
  {
    id: "prod-003",
    name: "Stainless Steel Water Bottle",
    date: "2025-05-10T14:45:00Z",
    price: 800,
    quantity: 1,
  },
];

export default function CustomerPage() {
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const formatAddress = (address: BDAddress) => {
    const parts = [];
    if (address.houseNumber) parts.push(address.houseNumber);
    if (address.roadNumber) parts.push(address.roadNumber);
    if (address.area) parts.push(address.area);
    if (address.sector) parts.push(`Sector ${address.sector}`);
    if (address.city) parts.push(address.city);
    if (address.postCode) parts.push(address.postCode);
    if (address.district) parts.push(address.district);
    if (address.division) parts.push(address.division);
    return parts.join(", ");
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      <Card className="rounded-xl shadow-sm border-0">
        <CardHeader className="p-6 pb-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-lg bg-[#e51e5a] border flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold">{customer.name}</h1>
                  {customer.isVerified && (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <ShieldCheck className="w-4 h-4 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    Joined: {format(new Date(), "dd MMM yyyy")}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <History className="w-4 h-4" />
                    Last Purchase:{" "}
                    {customer.lastPurchasedDate
                      ? format(
                          new Date(customer.lastPurchasedDate),
                          "dd MMM yyyy"
                        )
                      : "N/A"}
                  </div>
                </div>
                {customer.debt && customer.debt > 0 && (
                  <Badge
                    variant="outline"
                    className="flex items-center text-red-600 font-bold p-1"
                  >
                    <CreditCard className="w-4 h-4" />
                    Due: ৳{customer.debt.toLocaleString()}
                  </Badge>
                )}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg h-9 w-9"
                >
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="gap-3">
                  <ShieldCheck className="w-4 h-4" />
                  {customer.isVerified ? "Revoke Verification" : "Verify"}
                </DropdownMenuItem>
                {customer.debt && customer.debt > 0 && (
                  <DropdownMenuItem className="gap-3 text-amber-600">
                    <MessageSquare className="w-4 h-4" />
                    Send Payment Reminder
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="gap-3">
                  <Mail className="w-4 h-4" />
                  Send Promotional Alert
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 text-red-600">
                  <Trash2 className="w-4 h-4" />
                  Delete Customer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
      </Card>

      {/* Customer Details Section with Tabs */}
      <Card className="rounded-xl">
        <CardContent className="p-4">
          <Tabs defaultValue="info">
            <TabsList className="px-4 h-14 pb-0 border-b rounded-t-xl space-x-2">
              <TabsTrigger
                value="info"
                className="px-4 py-2 h-auto data-[state=active]:text-[#e51e5a] gap-2"
              >
                <User className="w-4 h-4" />
                Information
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="px-4 py-2 h-auto data-[state=active]:text-[#e51e5a] gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Purchased Products
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="px-4 py-2 h-auto data-[state=active]:text-[#e51e5a] gap-2"
              >
                <History className="w-4 h-4" />
                Transaction History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Contact Information</h3>
                  <Table className="border rounded-md">
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone
                        </TableCell>
                        <TableCell>{customer.phoneNumber}</TableCell>
                      </TableRow>
                      {customer.alternatePhoneNumber && (
                        <TableRow>
                          <TableCell className="font-medium flex items-center gap-2">
                            <Smartphone className="w-4 h-4" />
                            Alternate Phone
                          </TableCell>
                          <TableCell>{customer.alternatePhoneNumber}</TableCell>
                        </TableRow>
                      )}
                      {customer.whatsappNumber && (
                        <TableRow>
                          <TableCell className="font-medium flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            WhatsApp
                          </TableCell>
                          <TableCell>{customer.whatsappNumber}</TableCell>
                        </TableRow>
                      )}
                      {customer.email && (
                        <TableRow>
                          <TableCell className="font-medium flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email
                          </TableCell>
                          <TableCell>{customer.email}</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Address Information</h3>
                  <Table className="border">
                    <TableBody>
                      {Object.entries(customer.address).map(
                        ([key, value]) =>
                          value && (
                            <TableRow key={key}>
                              <TableCell className="font-medium capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </TableCell>
                              <TableCell>{value}</TableCell>
                            </TableRow>
                          )
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="products" className="p-6">
              <div className="space-y-4">
                <Table className="border">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchasedProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell>
                          {format(new Date(product.date), "dd MMM yyyy")}
                        </TableCell>
                        <TableCell>৳{product.price.toLocaleString()}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell className="text-right">
                          ৳{(product.price * product.quantity).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="history" className="p-6">
              <TransactionHistory />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
