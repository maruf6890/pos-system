import React from "react";
import DashboardInfoCard from "../DashboardInfoCard";
import { SalesAreaGraph } from "../shopkeepers/[id]/Performance";
import { InactiveUsersTable } from "../InactiveUsersTable";
import { TopProductsTable } from "../TopProductsTable";

export default function page() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen p-6 py-0 ">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="">Welcome !</p>

      <DashboardInfoCard />
      <SalesAreaGraph />
      <div className="flex gap-5 justify-between">
        <TopProductsTable />
        <InactiveUsersTable />
      </div>
    </div>
  );
}
