"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Search,
  X,
  Calendar as CalendarIcon,
  RotateCcw,
  ArrowDownToLine,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Badge } from "@/components/ui/badge";
import { InvoicePDF } from "./InvoicePdf";

export type Transaction = {
  id: string;
  invoiceNumber: string;
  date: Date;
  type: "Pending" | "Payment" | "DuePayment" | "Refund";
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  customer: {
    name: string;
    email?: string;
    phone: string;
  };
  seller: string;
  items?: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  paymentMethod: string;
  status: "Completed" | "Pending" | "Failed";
};

const dummyTransactions: Transaction[] = [
  {
    id: "txn-001",
    invoiceNumber: "INV-2023-001",
    date: new Date(2023, 5, 15, 14, 30),
    type: "Pending",
    amount: 12500,
    balanceBefore: 50000,
    balanceAfter: 37500,
    description: "Office supplies purchase",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+8801712345678",
    },
    seller: "Mr Y",
    items: [
      {
        name: "Premium Notebooks",
        quantity: 10,
        price: 500,
        total: 5000,
      },
      {
        name: "Pens (Box)",
        quantity: 5,
        price: 1500,
        total: 7500,
      },
    ],
    paymentMethod: "Cash",
    status: "Completed",
  },
  {
    id: "txn-002",
    invoiceNumber: "INV-2023-002",
    date: new Date(2023, 5, 18, 10, 15),
    type: "DuePayment",
    amount: 10000,
    balanceBefore: 37500,
    balanceAfter: 47500,
    description: "Partial payment of due amount",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+8801712345678",
    },
    seller: "Your Business",
    paymentMethod: "Bank Transfer",
    status: "Completed",
  },
  {
    id: "txn-003",
    invoiceNumber: "INV-2023-003",
    date: new Date(2023, 5, 20, 16, 45),
    type: "Payment",
    amount: 20000,
    balanceBefore: 47500,
    balanceAfter: 67500,
    description: "Advance payment for services",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+8801712345678",
    },
    seller: "Your Business",
    paymentMethod: "bKash",
    status: "Completed",
  },
];

export const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [startingDate, setStartingDate] = useState<Date>();
  const [endingDate, setEndingDate] = useState<Date>();

  const filteredTransactions = dummyTransactions.filter((transaction) => {
    // Search term filter
    const matchesSearch =
      searchTerm === "" ||
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.invoiceNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.customer.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    // Type filter
    const matchesType = typeFilter === "All" || transaction.type === typeFilter;

    // Date range filter
    const transactionDate = transaction.date.getTime();
    const matchesDate =
      (!startingDate || transactionDate >= startingDate.getTime()) &&
      (!endingDate || transactionDate <= endingDate.getTime());

    return matchesSearch && matchesType && matchesDate;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setTypeFilter("All");
    setStartingDate(undefined);
    setEndingDate(undefined);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      case "Failed":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex flex-col gap-4">
          <CardTitle className="text-start my-5">Transaction History</CardTitle>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {/* Starting Date */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[150px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startingDate ? format(startingDate, "PPP") : "Start Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startingDate}
                    onSelect={setStartingDate}
                  />
                </PopoverContent>
              </Popover>

              {/* Ending Date */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[150px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endingDate ? format(endingDate, "PPP") : "End Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endingDate}
                    onSelect={setEndingDate}
                  />
                </PopoverContent>
              </Popover>

              {/* Type Filter Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-[120px]">
                    {typeFilter === "All" ? "All Types" : typeFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {["All", "Purchase", "Payment", "DuePayment", "Refund"].map(
                    (type) => (
                      <DropdownMenuCheckboxItem
                        key={type}
                        checked={typeFilter === type}
                        onCheckedChange={() => setTypeFilter(type)}
                      >
                        {type}
                      </DropdownMenuCheckboxItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex gap-2">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-[200px]"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <Button size="icon" variant="secondary" className="shrink-0" onClick={resetFilters}>
                <RotateCcw className="mr-2 h-4 w-4" />
               
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredTransactions.length} transactions
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount (৳)</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="whitespace-nowrap">
                      {format(transaction.date, "dd MMM yyyy, h:mm a")}
                    </TableCell>
                    <TableCell>{transaction.invoiceNumber}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.type === "Payment" ||
                          transaction.type === "DuePayment"
                            ? "default"
                            : "outline"
                        }
                      >
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{transaction.customer.name}</TableCell>
                    <TableCell>{transaction.seller}</TableCell>
                    <TableCell className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </TableCell>
                    <TableCell className="text-right">
                      <PDFDownloadLink
                        document={<InvoicePDF transaction={transaction} />}
                        fileName={`${transaction.invoiceNumber}.pdf`}
                      >
                        {({ loading }) => (
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={loading}
                            className="h-8 w-8 p-0"
                            title="Download Invoice"
                          >
                            {loading ? (
                              "..."
                            ) : (
                              <ArrowDownToLine className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </PDFDownloadLink>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
