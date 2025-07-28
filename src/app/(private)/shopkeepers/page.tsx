"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Search, Plus, MapPin, Mail } from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppPagination from "@/components/Shop/AppPagination";
import { useRouter } from "next/navigation";

// Your types (copy from your definitions)
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
  isTracked?: boolean; // add optional for UI state toggle
};

export default function ShopkeepersPage() {
  const [shopkeepers, setShopkeepers] = useState<Shopkeeper[]>([]);
  const [filteredShopkeepers, setFilteredShopkeepers] = useState<Shopkeeper[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/data/seller.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch shopkeepers");
        return res.json();
      })
      .then((data) => {
        // Initialize isTracked to false for all shopkeepers
        const withTracking = data.shopkeepers.map((sk: Shopkeeper) => ({
          ...sk,
          isTracked: false,
        }));
        setShopkeepers(withTracking);
        setFilteredShopkeepers(withTracking);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredShopkeepers(shopkeepers);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = shopkeepers.filter((shopkeeper) => {
        // Search by name
        if (shopkeeper.name.toLowerCase().includes(term)) return true;

        // Search in contact emails (optional)
        if (shopkeeper.contact.email?.toLowerCase().includes(term)) return true;

        // Search in address fields
        for (const key in shopkeeper.address) {
          const val = (shopkeeper.address as any)[key];
          if (typeof val === "string" && val.toLowerCase().includes(term))
            return true;
        }

        return false;
      });
      setFilteredShopkeepers(filtered);
    }
  }, [searchTerm, shopkeepers]);

const formatAddress = (address: BDAddress) => {
  const parts: string[] = [];

  // Collect parts in order
  const candidates = [
    address?.areaOrUnion,
    address?.villageOrZone,
    address?.cityOrUpazila,
    address?.district,
    address?.division,
  ];

  const seen = new Set<string>();

  for (const part of candidates) {
    if (part && !seen.has(part)) {
      parts.push(part);
      seen.add(part);
    }
  }

  return parts.join(", ");
};

  const handleDelete = (id: string) => {
    setShopkeepers((prev) => prev.filter((sk) => sk.id !== id));
    setFilteredShopkeepers((prev) => prev.filter((sk) => sk.id !== id));
  };

  const handleTrackToggle = (id: string) => {
    setShopkeepers((prev) =>
      prev.map((sk) =>
        sk.id === id ? { ...sk, isTracked: !sk.isTracked } : sk
      )
    );
    setFilteredShopkeepers((prev) =>
      prev.map((sk) =>
        sk.id === id ? { ...sk, isTracked: !sk.isTracked } : sk
      )
    );
  };

  if (loading) {
    return (
      <p className="p-5 text-center text-gray-400">Loading shopkeepers...</p>
    );
  }
  if (error) {
    return (
      <p className="p-5 text-center text-red-500">
        Error loading shopkeepers: {error}
      </p>
    );
  }

  return (
    <div className="p-5 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Shopkeepers</h1>
        <Button className="bg-[#e51e5a] hover:bg-[#e51e5a]/90">
          <Plus className="h-4 w-4" />
          Add shopkeeper
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by name, email or address..."
          className="pl-9 max-w-72"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredShopkeepers.length === 0 ? (
        <p className="p-5 text-center text-gray-400">No shopkeepers found</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShopkeepers.map((shopkeeper) => (
              <Card
                key={shopkeeper.id}
                onClick={() => router.push(`/shopkeepers/${shopkeeper.id}`)}
                className="border-[#e51e5a] gap-0 hover:shadow-lg transition-shadow justify-between duration-300 cursor-pointer"
              >
                <div>
                  <CardHeader className="flex flex-row justify-between items-start">
                    <div>
                      <h2 className="text-xl text-black font-medium">
                        {shopkeeper.name}
                      </h2>
                      {shopkeeper.contact.email && (
                        <p className="text-sm flex my-1 text-gray-800 truncate">
                          <Mail className="w-4 h-4 text-gray-600 mt-[2px] mr-1" />
                          {shopkeeper.contact.email}
                        </p>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleTrackToggle(shopkeeper.id)}
                        >
                          {shopkeeper.isTracked ? "Untrack" : "Track"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => handleDelete(shopkeeper.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>

                  <CardContent className="text-sm text-black space-y-1">
                    <div className="flex gap-1 items-center not-italic">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="truncate">
                        {formatAddress(shopkeeper.address)}
                      </span>
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="flex text-xs mt-5 justify-between">
                  <p>
                    Joined:{" "}
                    {shopkeeper.employment.joined
                      ? format(
                          new Date(shopkeeper.employment.joined),
                          "dd MMM yyyy"
                        )
                      : ""}
                  </p>
                  <div>
                    {shopkeeper.isTracked && (
                      <Badge variant="default" className="bg-green-500">
                        Tracking
                      </Badge>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <AppPagination totalPages={15} />
          </div>
        </>
      )}
    </div>
  );
}
