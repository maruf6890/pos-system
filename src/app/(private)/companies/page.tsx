"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, ShieldCheck, Trash2, Ban } from "lucide-react";


export default function CompaniesPage() {
  const [data, setData] = useState(Companies.data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleDelete = (index: number) => {
    if (confirm("Are you sure you want to delete this company?")) {
      setData((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPagination = () => {
    const pages = [];
    const visiblePages = 5;
    const half = Math.floor(visiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + visiblePages - 1, totalPages);

    if (end - start < visiblePages - 1) {
      start = Math.max(end - visiblePages + 1, 1);
    }

    if (start > 1) {
      pages.push("1");
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i.toString());
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages.toString());
    }

    return pages;
  };

  return (
    <div className="p-5 m-5">
      <h1 className="text-2xl font-bold">Companies</h1>
      <p className="text-gray-500">Manage your companies here.</p>

      <div className="flex justify-end mt-4">
        <input
          type="text"
          placeholder="Search companies..."
          className="border px-3 py-2 rounded-md w-64"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {paginatedData.map((company, index) => (
          <Card key={index}>
            <CardHeader className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {company.name}
                    {company.isVerified && (
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                    )}
                  </h3>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Verify
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Ban className="w-4 h-4 " />{" "}
                    {company.isBanned ? "Unban" : "Ban"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 "
                    onClick={() =>
                      handleDelete(index + (currentPage - 1) * itemsPerPage)
                    }
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="text-sm text-gray-500 space-y-1">
              <p>{company.email}</p>
              <p>Industry: {company.is}</p>
              <p>Total Tests: {company.totalTests}</p>
              <p>Credits: {company.credit}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-1 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </Button>
        {getPagination().map((page, idx) => (
          <Button
            key={idx}
            variant={page === currentPage.toString() ? "default" : "outline"}
            size="sm"
            disabled={page === "..."}
            onClick={() => page !== "..." && setCurrentPage(Number(page))}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}

 const Companies = {
  data: [
    {
      name: "TechNova Ltd.",
      image: "https://i.pravatar.cc/100?img=1",
      email: "contact@technova.com",
      isVerified: true,
      is: "Software",
      isBanned: false,
      totalTests: 24,
      credit: 1500,
    },
    {
      name: "GreenCore Innovations",
      image: "https://i.pravatar.cc/100?img=2",
      email: "info@greencore.io",
      isVerified: false,
      is: "Energy",
      isBanned: false,
      totalTests: 9,
      credit: 560,
    },
    {
      name: "EduBridge Co.",
      image: "https://i.pravatar.cc/100?img=3",
      email: "hello@edubridge.org",
      isVerified: true,
      is: "Education",
      isBanned: false,
      totalTests: 40,
      credit: 2380,
    },
    {
      name: "FinMate Inc.",
      image: "https://i.pravatar.cc/100?img=4",
      email: "support@finmate.com",
      isVerified: true,
      is: "Finance",
      isBanned: true,
      totalTests: 5,
      credit: 0,
    },
    {
      name: "Visionary AI",
      image: "https://i.pravatar.cc/100?img=5",
      email: "ai@visionary.dev",
      isVerified: false,
      is: "AI & ML",
      isBanned: false,
      totalTests: 18,
      credit: 890,
    },
    {
      name: "NanoNet Solutions",
      image: "https://i.pravatar.cc/100?img=6",
      email: "support@nanonet.io",
      isVerified: true,
      is: "IoT",
      isBanned: false,
      totalTests: 12,
      credit: 310,
    },
    {
      name: "Agrimax BD",
      image: "https://i.pravatar.cc/100?img=7",
      email: "info@agrimax.bd",
      isVerified: false,
      is: "Agriculture",
      isBanned: false,
      totalTests: 7,
      credit: 130,
    },
    {
      name: "MediCore Health",
      image: "https://i.pravatar.cc/100?img=8",
      email: "admin@medicore.health",
      isVerified: true,
      is: "Healthcare",
      isBanned: false,
      totalTests: 29,
      credit: 1120,
    },
    {
      name: "BuildWise Construction",
      image: "https://i.pravatar.cc/100?img=9",
      email: "contact@buildwise.co",
      isVerified: true,
      is: "Construction",
      isBanned: true,
      totalTests: 3,
      credit: 0,
    },
    {
      name: "DataNest Analytics",
      image: "https://i.pravatar.cc/100?img=10",
      email: "support@datanest.com",
      isVerified: true,
      is: "Analytics",
      isBanned: false,
      totalTests: 15,
      credit: 745,
    },
    {
      name: "RoboEdge",
      image: "https://i.pravatar.cc/100?img=11",
      email: "hello@roboedge.io",
      isVerified: false,
      is: "Robotics",
      isBanned: false,
      totalTests: 11,
      credit: 480,
    },
    {
      name: "TransX Logistics",
      image: "https://i.pravatar.cc/100?img=12",
      email: "trans@xlogistics.com",
      isVerified: true,
      is: "Logistics",
      isBanned: false,
      totalTests: 22,
      credit: 1320,
    },
    {
      name: "CloudVerse Ltd.",
      image: "https://i.pravatar.cc/100?img=13",
      email: "cloud@verse.io",
      isVerified: true,
      is: "Cloud",
      isBanned: false,
      totalTests: 36,
      credit: 2600,
    },
    {
      name: "PaySync BD",
      image: "https://i.pravatar.cc/100?img=14",
      email: "billing@paysync.bd",
      isVerified: false,
      is: "FinTech",
      isBanned: false,
      totalTests: 8,
      credit: 210,
    },
    {
      name: "SafeZone Security",
      image: "https://i.pravatar.cc/100?img=15",
      email: "contact@safezone.pro",
      isVerified: true,
      is: "Cybersecurity",
      isBanned: false,
      totalTests: 19,
      credit: 950,
    },
    {
      name: "QuantumQore",
      image: "https://i.pravatar.cc/100?img=16",
      email: "hello@quantumqore.com",
      isVerified: false,
      is: "Quantum Tech",
      isBanned: true,
      totalTests: 2,
      credit: 0,
    },
    {
      name: "EcoTech BD",
      image: "https://i.pravatar.cc/100?img=17",
      email: "eco@techbd.com",
      isVerified: true,
      is: "Sustainability",
      isBanned: false,
      totalTests: 16,
      credit: 670,
    },
    {
      name: "Eventix Hub",
      image: "https://i.pravatar.cc/100?img=18",
      email: "events@eventix.com",
      isVerified: false,
      is: "Event Management",
      isBanned: false,
      totalTests: 13,
      credit: 390,
    },
    {
      name: "PixelDrop Studio",
      image: "https://i.pravatar.cc/100?img=19",
      email: "team@pixeldrop.io",
      isVerified: true,
      is: "Design",
      isBanned: false,
      totalTests: 25,
      credit: 1420,
    },
    {
      name: "CodeCrafters",
      image: "https://i.pravatar.cc/100?img=20",
      email: "dev@codecrafters.dev",
      isVerified: true,
      is: "Software",
      isBanned: false,
      totalTests: 31,
      credit: 1980,
    },
  ],
  total: 20,
};
