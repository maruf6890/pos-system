"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

type SalesData = {
  date: string;
  sales: number;
};

const generateSalesData = (days: number): SalesData[] => {
  const data: SalesData[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    data.push({
      date: format(date, "MMM dd"),
      sales: Math.floor(Math.random() * 10000) + 2000, // Random sales between 2000-12000
    });
  }

  return data;
};

export function SalesAreaGraph() {
  const [timeRange, setTimeRange] = useState<"7" | "30">("7");
  const salesData = generateSalesData(timeRange === "7" ? 7 : 30);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Sales Overview</h3>
        <Tabs
          value={timeRange}
          onValueChange={(value) => setTimeRange(value as "7" | "30")}
        >
          <TabsList>
            <TabsTrigger value="7">Last 7 Days</TabsTrigger>
            <TabsTrigger value="30">Last 30 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={salesData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e51e5a" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#e51e5a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `৳${value.toLocaleString()}`}
              tickMargin={10}
            />
            <Tooltip
              formatter={(value) => [
                `৳${Number(value).toLocaleString()}`,
                "Sales",
              ]}
              labelStyle={{ fontWeight: 500 }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#e51e5a"
              fillOpacity={1}
              fill="url(#colorSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
