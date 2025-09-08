"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import the dummy sales object
import { Button } from "@/components/ui/button";
const dummySales = [
  {
    sales_id: 1,
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "01710000001",
    },
    shopkeeper: { name: "Alice Smith", phone: "01810000001" },
    status: "pending",
    total: 500.0,
    discount: 50.0,
    tax: 25.0,
    payment_type: "cash",
    note: "First sale of the day",
    due: 100.0,
    total_paid: 425.0,
    previous_due: 50.0,
    created_at: "2025-09-01T10:00:00Z",
  },
  {
    sales_id: 2,
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "01710000002",
    },
    shopkeeper: { name: "Bob Johnson", phone: "01810000002" },
    status: "review",
    total: 1200.0,
    discount: 100.0,
    tax: 60.0,
    payment_type: "bank",
    note: "Urgent delivery",
    due: 200.0,
    total_paid: 960.0,
    previous_due: 100.0,
    created_at: "2025-09-02T11:00:00Z",
  },
  {
    sales_id: 3,
    customer: {
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "01710000003",
    },
    shopkeeper: { name: "Alice Smith", phone: "01810000001" },
    status: "complete",
    total: 750.0,
    discount: 0.0,
    tax: 37.5,
    payment_type: "mobile",
    note: "Regular customer",
    due: 0.0,
    total_paid: 787.5,
    previous_due: 50.0,
    created_at: "2025-09-03T12:00:00Z",
  },
  {
    sales_id: 4,
    customer: {
      name: "Lisa White",
      email: "lisa@example.com",
      phone: "01710000004",
    },
    shopkeeper: { name: "Charlie Lee", phone: "01810000003" },
    status: "pending",
    total: 600.0,
    discount: 50.0,
    tax: 30.0,
    payment_type: "cash",
    note: "New order",
    due: 80.0,
    total_paid: 500.0,
    previous_due: 0.0,
    created_at: "2025-09-04T09:00:00Z",
  },
  {
    sales_id: 5,
    customer: {
      name: "David Clark",
      email: "david@example.com",
      phone: "01710000005",
    },
    shopkeeper: { name: "Bob Johnson", phone: "01810000002" },
    status: "review",
    total: 1500.0,
    discount: 100.0,
    tax: 75.0,
    payment_type: "bank",
    note: "Special order",
    due: 200.0,
    total_paid: 1275.0,
    previous_due: 50.0,
    created_at: "2025-09-05T14:00:00Z",
  },
  {
    sales_id: 6,
    customer: {
      name: "Emma Green",
      email: "emma@example.com",
      phone: "01710000006",
    },
    shopkeeper: { name: "Alice Smith", phone: "01810000001" },
    status: "complete",
    total: 900.0,
    discount: 50.0,
    tax: 45.0,
    payment_type: "mobile",
    note: "Completed order",
    due: 0.0,
    total_paid: 895.0,
    previous_due: 50.0,
    created_at: "2025-09-06T16:00:00Z",
  },
  {
    sales_id: 7,
    customer: {
      name: "Olivia Brown",
      email: "olivia@example.com",
      phone: "01710000007",
    },
    shopkeeper: { name: "Charlie Lee", phone: "01810000003" },
    status: "pending",
    total: 450.0,
    discount: 20.0,
    tax: 22.5,
    payment_type: "cash",
    note: "Pending confirmation",
    due: 50.0,
    total_paid: 402.5,
    previous_due: 0.0,
    created_at: "2025-09-07T10:30:00Z",
  },
  {
    sales_id: 8,
    customer: {
      name: "Liam Smith",
      email: "liam@example.com",
      phone: "01710000008",
    },
    shopkeeper: { name: "Bob Johnson", phone: "01810000002" },
    status: "review",
    total: 1100.0,
    discount: 100.0,
    tax: 55.0,
    payment_type: "bank",
    note: "Check payment",
    due: 150.0,
    total_paid: 905.0,
    previous_due: 50.0,
    created_at: "2025-09-08T11:30:00Z",
  },
  {
    sales_id: 9,
    customer: {
      name: "Noah Johnson",
      email: "noah@example.com",
      phone: "01710000009",
    },
    shopkeeper: { name: "Alice Smith", phone: "01810000001" },
    status: "complete",
    total: 700.0,
    discount: 0.0,
    tax: 35.0,
    payment_type: "mobile",
    note: "Finished sale",
    due: 0.0,
    total_paid: 735.0,
    previous_due: 20.0,
    created_at: "2025-09-09T13:00:00Z",
  },
  {
    sales_id: 10,
    customer: {
      name: "Sophia Lee",
      email: "sophia@example.com",
      phone: "01710000010",
    },
    shopkeeper: { name: "Charlie Lee", phone: "01810000003" },
    status: "pending",
    total: 800.0,
    discount: 50.0,
    tax: 40.0,
    payment_type: "cash",
    note: "Waiting approval",
    due: 100.0,
    total_paid: 690.0,
    previous_due: 20.0,
    created_at: "2025-09-10T14:30:00Z",
  }
];




export default function SalesPage() {
  const [search, setSearch] = useState("");
  const [shopkeeperFilter, setShopkeeperFilter] = useState("");
  const [dueFilter, setDueFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // unique shopkeeper names for filter
  const shopkeepers = useMemo(() => {
    const names = dummySales.map((s) => s.shopkeeper.name);
    return Array.from(new Set(names));
  }, []);

  
  const statuses = useMemo(() => {
    const stats = dummySales.map((s) => s.status);
    return Array.from(new Set(stats));
  }, []);


  const filteredSales = useMemo(() => {
    return dummySales.filter((s) => {
      const matchesCustomer = s.customer.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesShopkeeper = shopkeeperFilter
        ? s.shopkeeper.name === shopkeeperFilter
        : true;
      const matchesStatus = statusFilter ? s.status === statusFilter : true;
      const matchesDue =
        dueFilter === "Due > 0"
          ? s.due > 0
          : dueFilter === "No Due"
          ? s.due === 0
          : true;

      return (
        matchesCustomer && matchesShopkeeper && matchesStatus && matchesDue
      );
    });
  }, [search, shopkeeperFilter, statusFilter, dueFilter]);

  return (
    <div className="p-10 max-w-7xl mx-auto">
      
          <div className="mb-5">
              <h3 className="font-semibold text-2xl">My sales</h3>
              <p>Manage your sales</p>
        </div>

      <div className="flex justify-between gap-4 mb-6">
              <Input
                  className="w-[200px]"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sales ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Due</TableHead>
            <TableHead>Total Paid</TableHead>
            <TableHead>Previous Due</TableHead>
            <TableHead>Payment Type</TableHead>
            <TableHead>Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSales.map((sale) => (
            <TableRow key={sale.sales_id}>
              <TableCell>{sale.sales_id}</TableCell>
              <TableCell>{sale.customer.name}</TableCell>
              <TableCell>{sale.total}</TableCell>
              <TableCell>{sale.discount}</TableCell>
              <TableCell>{sale.tax}</TableCell>
              <TableCell>{sale.due}</TableCell>
              <TableCell>{sale.total_paid}</TableCell>
              <TableCell>{sale.previous_due}</TableCell>
              <TableCell>{sale.payment_type}</TableCell>
              <TableCell>{sale.note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
