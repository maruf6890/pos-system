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
  },
  {
    sales_id: 11,
    customer: {
      name: "Ethan Brown",
      email: "ethan@example.com",
      phone: "01710000011",
    },
    shopkeeper: { name: "Bob Johnson", phone: "01810000002" },
    status: "review",
    total: 1250.0,
    discount: 100.0,
    tax: 62.5,
    payment_type: "bank",
    note: "Pending payment",
    due: 150.0,
    total_paid: 1062.5,
    previous_due: 50.0,
    created_at: "2025-09-11T09:00:00Z",
  },
  {
    sales_id: 12,
    customer: {
      name: "Ava Smith",
      email: "ava@example.com",
      phone: "01710000012",
    },
    shopkeeper: { name: "Alice Smith", phone: "01810000001" },
    status: "complete",
    total: 950.0,
    discount: 50.0,
    tax: 47.5,
    payment_type: "mobile",
    note: "Delivered successfully",
    due: 0.0,
    total_paid: 947.5,
    previous_due: 30.0,
    created_at: "2025-09-12T12:45:00Z",
  },
  {
    sales_id: 13,
    customer: {
      name: "Mia Davis",
      email: "mia@example.com",
      phone: "01710000013",
    },
    shopkeeper: { name: "Charlie Lee", phone: "01810000003" },
    status: "pending",
    total: 550.0,
    discount: 25.0,
    tax: 27.5,
    payment_type: "cash",
    note: "Urgent delivery",
    due: 75.0,
    total_paid: 477.5,
    previous_due: 20.0,
    created_at: "2025-09-13T10:15:00Z",
  },
  {
    sales_id: 14,
    customer: {
      name: "William Clark",
      email: "william@example.com",
      phone: "01710000014",
    },
    shopkeeper: { name: "Bob Johnson", phone: "01810000002" },
    status: "review",
    total: 1300.0,
    discount: 100.0,
    tax: 65.0,
    payment_type: "bank",
    note: "Check invoice",
    due: 200.0,
    total_paid: 1065.0,
    previous_due: 50.0,
    created_at: "2025-09-14T13:30:00Z",
  },
  {
    sales_id: 15,
    customer: {
      name: "Isabella Miller",
      email: "isabella@example.com",
      phone: "01710000015",
    },
    shopkeeper: { name: "Alice Smith", phone: "01810000001" },
    status: "complete",
    total: 800.0,
    discount: 0.0,
    tax: 40.0,
    payment_type: "mobile",
    note: "Customer satisfied",
    due: 0.0,
    total_paid: 840.0,
    previous_due: 20.0,
    created_at: "2025-09-15T15:00:00Z",
  },
  {
    sales_id: 16,
    customer: {
      name: "James Johnson",
      email: "james@example.com",
      phone: "01710000016",
    },
    shopkeeper: { name: "Charlie Lee", phone: "01810000003" },
    status: "pending",
    total: 600.0,
    discount: 30.0,
    tax: 30.0,
    payment_type: "cash",
    note: "Awaiting stock",
    due: 70.0,
    total_paid: 530.0,
    previous_due: 0.0,
    created_at: "2025-09-16T11:45:00Z",
  },
  {
    sales_id: 17,
    customer: {
      name: "Charlotte White",
      email: "charlotte@example.com",
      phone: "01710000017",
    },
    shopkeeper: { name: "Bob Johnson", phone: "01810000002" },
    status: "review",
    total: 1400.0,
    discount: 100.0,
    tax: 70.0,
    payment_type: "bank",
    note: "Pending approval",
    due: 200.0,
    total_paid: 1170.0,
    previous_due: 50.0,
    created_at: "2025-09-17T14:10:00Z",
  },
  {
    sales_id: 18,
    customer: {
      name: "Henry Brown",
      email: "henry@example.com",
      phone: "01710000018",
    },
    shopkeeper: { name: "Alice Smith", phone: "01810000001" },
    status: "complete",
    total: 950.0,
    discount: 50.0,
    tax: 47.5,
    payment_type: "mobile",
    note: "Delivered on time",
    due: 0.0,
    total_paid: 947.5,
    previous_due: 30.0,
    created_at: "2025-09-18T16:20:00Z",
  },
  {
    sales_id: 19,
    customer: {
      name: "Amelia Clark",
      email: "amelia@example.com",
      phone: "01710000019",
    },
    shopkeeper: { name: "Charlie Lee", phone: "01810000003" },
    status: "pending",
    total: 500.0,
    discount: 20.0,
    tax: 25.0,
    payment_type: "cash",
    note: "Rush order",
    due: 60.0,
    total_paid: 445.0,
    previous_due: 10.0,
    created_at: "2025-09-19T09:50:00Z",
  },
  {
    sales_id: 20,
    customer: {
      name: "Evelyn Miller",
      email: "evelyn@example.com",
      phone: "01710000020",
    },
    shopkeeper: { name: "Bob Johnson", phone: "01810000002" },
    status: "review",
    total: 1200.0,
    discount: 100.0,
    tax: 60.0,
    payment_type: "bank",
    note: "Check delivery",
    due: 150.0,
    total_paid: 1010.0,
    previous_due: 40.0,
    created_at: "2025-09-20T12:30:00Z",
  },
];

console.log(dummySales);


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

  // unique status for filter
  const statuses = useMemo(() => {
    const stats = dummySales.map((s) => s.status);
    return Array.from(new Set(stats));
  }, []);

  // unique due options (for simplicity we filter by 0 or >0)
  const dueOptions = ["All", "Has Due", "No Due"];

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
              <h3 className="font-semibold text-2xl">Sales Report</h3>
              <p>Manage sales report</p>
        </div>

      <div className="flex justify-between gap-4 mb-6">
              <Input
                  className="w-[200px]"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-4 justify-between">
          <Select
            onValueChange={(val) => setShopkeeperFilter(val)}
            value={shopkeeperFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Shopkeeper" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {shopkeepers.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(val) => setStatusFilter(val)}
            value={statusFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(val) => setDueFilter(val)} value={dueFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Due" />
            </SelectTrigger>
            <SelectContent>
              {dueOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sales ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Shopkeeper</TableHead>
            <TableHead>Status</TableHead>
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
              <TableCell>{sale.shopkeeper.name}</TableCell>
              <TableCell>{sale.status}</TableCell>
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
