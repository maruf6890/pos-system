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
  Store,
  CheckCircle,
  XCircle,
  LineChart,
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
import { SalesAreaGraph } from "./Performance";

export type ContactInfo = {
  phone: string;
  altPhone?: string;
  email?: string;
  whatsapp?: string;
};

export type BDAddress = {
  division: string;
  district: string;
  cityOrUpazila: string;
  areaOrUnion?: string;
  villageOrZone?: string;
  postalCode?: string;
  landmark?: string;
};

export type EmploymentInfo = {
  joined: string;
  status: "Active" | "Inactive" | "Terminated";
};

export type VerificationInfo = {
  isVerified: boolean;
  documents: ("NID" | "Trade License" | "TIN" | "Utility Bill")[];
};

export type Shopkeeper = {
  id: string;
  name: string;
  contact: ContactInfo;
  address: BDAddress;
  joined?: string;
  employment: EmploymentInfo;
  verification: VerificationInfo;
  isTracked?: boolean;
};

const shopkeeper: Shopkeeper = {
  id: "shop-005",
  name: "Rahim",
  contact: {
    phone: "01710000005",
    altPhone: "01820000005",
    email: "rahimstore@example.com",
    whatsapp: "01710000005",
  },
  address: {
    division: "Dhaka",
    district: "Dhaka",
    cityOrUpazila: "Mirpur",
    areaOrUnion: "Section 10",
    postalCode: "1216",
    landmark: "Near Mirpur 10 Circle",
  },
  joined: "2023-05-15T10:00:00Z",
  employment: {
    joined: "2023-05-15T10:00:00Z",
    status: "Active",
  },
  verification: {
    isVerified: true,
    documents: ["NID", "Trade License"],
  },
  isTracked: true,
};

const transactions = [
  {
    id: "txn-001",
    date: "2025-07-23T16:15:00Z",
    amount: 12500,
    type: "Credit",
    description: "Product purchase",
    status: "Completed",
  },
  {
    id: "txn-002",
    date: "2025-06-18T11:30:00Z",
    amount: 8500,
    type: "Credit",
    description: "Product purchase",
    status: "Completed",
  },
  {
    id: "txn-003",
    date: "2025-05-10T14:45:00Z",
    amount: 15000,
    type: "Debit",
    description: "Payment received",
    status: "Completed",
  },
];

const productsSupplied = [
  {
    id: "prod-001",
    name: "Premium Rice (5kg)",
    lastSupplied: "2025-07-23T16:15:00Z",
    price: 650,
    stock: 45,
  },
  {
    id: "prod-002",
    name: "Refined Oil (2L)",
    lastSupplied: "2025-06-15T10:30:00Z",
    price: 320,
    stock: 28,
  },
  {
    id: "prod-003",
    name: "Sugar (1kg)",
    lastSupplied: "2025-05-10T14:45:00Z",
    price: 90,
    stock: 62,
  },
];

export default function ShopkeeperPage() {
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const formatAddress = (address: BDAddress) => {
    const parts = [];
    if (address.areaOrUnion) parts.push(address.areaOrUnion);
    if (address.cityOrUpazila) parts.push(address.cityOrUpazila);
    if (address.district) parts.push(address.district);
    if (address.division) parts.push(address.division);
    if (address.postalCode) parts.push(address.postalCode);
    return parts.join(", ");
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      <Card className="rounded-xl shadow-sm border-0">
        <CardHeader className="p-6 pb-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-lg bg-[#4f46e5] border flex items-center justify-center">
                <Store className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold">{shopkeeper.name}</h1>
                  {shopkeeper.verification.isVerified && (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <ShieldCheck className="w-4 h-4 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <Badge
                    variant={
                      shopkeeper.employment.status === "Active"
                        ? "default"
                        : shopkeeper.employment.status === "Inactive"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {shopkeeper.employment.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    Joined:{" "}
                    {format(new Date(shopkeeper.joined || ""), "dd MMM yyyy")}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    {formatAddress(shopkeeper.address)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant={shopkeeper.isTracked ? "default" : "secondary"}
                    className="flex items-center gap-1"
                  >
                    {shopkeeper.isTracked ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Tracked
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        Not Tracked
                      </>
                    )}
                  </Badge>
                </div>
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
                  {shopkeeper.verification.isVerified
                    ? "Revoke Verification"
                    : "Verify"}
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3">
                  {shopkeeper.isTracked ? (
                    <>
                      <Ban className="w-4 h-4" />
                      Stop Tracking
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Start Tracking
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3">
                  <Mail className="w-4 h-4" />
                  Send Notification
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 text-red-600">
                  <Trash2 className="w-4 h-4" />
                  Remove Shopkeeper
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
      </Card>

      {/* Shopkeeper Details Section with Tabs */}
      <Card className="rounded-xl">
        <CardContent className="p-4">
          <Tabs defaultValue="info">
            <TabsList className="px-4 h-14 pb-0 border-b rounded-t-xl space-x-2">
              <TabsTrigger
                value="info"
                className="px-4 py-2 h-auto data-[state=active]:text-[#4f46e5] gap-2"
              >
                <User className="w-4 h-4" />
                Information
              </TabsTrigger>
              <TabsTrigger
                value="performance"
                className="px-4 py-2 h-auto data-[state=active]:text-[#4f46e5] gap-2"
              >
                <LineChart/>
                  Performance
                </TabsTrigger>
                  
              <TabsTrigger
                value="history"
                className="px-4 py-2 h-auto data-[state=active]:text-[#4f46e5] gap-2"
              >
                <History className="w-4 h-4" />
                Transaction History
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="px-4 py-2 h-auto data-[state=active]:text-[#4f46e5] gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Documents
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
                        <TableCell>{shopkeeper.contact.phone}</TableCell>
                      </TableRow>
                      {shopkeeper.contact.altPhone && (
                        <TableRow>
                          <TableCell className="font-medium flex items-center gap-2">
                            <Smartphone className="w-4 h-4" />
                            Alternate Phone
                          </TableCell>
                          <TableCell>{shopkeeper.contact.altPhone}</TableCell>
                        </TableRow>
                      )}
                      {shopkeeper.contact.whatsapp && (
                        <TableRow>
                          <TableCell className="font-medium flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            WhatsApp
                          </TableCell>
                          <TableCell>{shopkeeper.contact.whatsapp}</TableCell>
                        </TableRow>
                      )}
                      {shopkeeper.contact.email && (
                        <TableRow>
                          <TableCell className="font-medium flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email
                          </TableCell>
                          <TableCell>{shopkeeper.contact.email}</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Address Information</h3>
                  <Table className="border">
                    <TableBody>
                      {Object.entries(shopkeeper.address).map(
                        ([key, value]) => (
                          <TableRow key={key}>
                            <TableCell className="font-medium capitalize">
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace("Or", "/")
                                .trim()}
                            </TableCell>
                            <TableCell>{value}</TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Employment Information</h3>
                  <Table className="border">
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Status</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              shopkeeper.employment.status === "Active"
                                ? "default"
                                : shopkeeper.employment.status === "Inactive"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {shopkeeper.employment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Joined Date
                        </TableCell>
                        <TableCell>
                          {format(
                            new Date(shopkeeper.employment.joined),
                            "dd MMM yyyy"
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="p-6">
            <SalesAreaGraph/>
                
            </TabsContent>

            <TabsContent value="documents" className="p-6">
              <div className="space-y-4">
                <h3 className="font-medium">Verification Documents</h3>
                {shopkeeper.verification.documents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {shopkeeper.verification.documents.map((doc, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                            <CreditCard className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">{doc}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Verified
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No documents uploaded
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
