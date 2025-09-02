"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MoreVertical,
  Search,
  Plus,
  MapPinHouse,
  Mail,
} from "lucide-react";
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
  isTracked?: boolean;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

  useEffect(() => {
    fetch("/data/customer.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch customers");
        return res.json();
      })
      .then((data) => {
        setCustomers(data);
        setFilteredCustomers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCustomers(customers);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(term) ||
          Object.values(customer.address).some(
            (val) => val && val.toString().toLowerCase().includes(term)
          )
      );
      setFilteredCustomers(filtered);
    }
  }, [searchTerm, customers]);

  const formatAddress = (address: BDAddress) => {
    const parts = new Set<string>();

    if (address.houseNumber) parts.add(address.houseNumber);
    if (address.roadNumber) parts.add(address.roadNumber);
    if (address.area) parts.add(address.area);
    if (address.village) parts.add(address.village);
    if (address.sector) parts.add(address.sector);
    if (address.union) parts.add(address.union);
    if (address.upazila) parts.add(address.upazila);
    if (address.city && address.city !== address.district)
      parts.add(address.city);
    if (address.district) parts.add(address.district);
    if (address.division) parts.add(address.division);

    return Array.from(parts).join(", ");
  };

  const handleDelete = (id: string) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
    setFilteredCustomers(
      filteredCustomers.filter((customer) => customer.id !== id)
    );
  };

  const handleTrackToggle = (id: string) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === id
          ? { ...customer, isTracked: !customer.isTracked }
          : customer
      )
    );
    setFilteredCustomers(
      filteredCustomers.map((customer) =>
        customer.id === id
          ? { ...customer, isTracked: !customer.isTracked }
          : customer
      )
    );
  };

  if (loading) {
    return (
      <p className="p-5 text-center text-gray-400">Loading customers...</p>
    );
  } else if (error) {
    return (
      <p className="p-5 text-center text-red-500">
        Error loading customers: {error}
      </p>
    );
  }

  return (
    <div className="p-5 space-y-4 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Customers</h1>
        <Button className="bg-[#e51e5a] hover:bg-[#e51e5a]/90">
          <Plus className="h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by name or address..."
          className="pl-9 max-w-72"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCustomers.length === 0 ? (
        <p className="p-5 text-center text-gray-400">No customers found</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((customer) => (
                <Card
                    onClick={() =>{router.push(`/customer/${customer.id}`)} }
                    
                key={customer.id}
                className="border-[#e51e5a] gap-0 hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="flex flex-row justify-between items-start">
                  <div>
                    <h2 className="text-xl text-black font-medium">
                      {customer.name}
                    </h2>
                    {customer.email && (
                                <p className="text-sm flex my-1 text-gray-800 truncate">
                                    <Mail className="w-4 h-4 text-gray-600 mt-[2px] mr-1" />
                        {customer.email}
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
                        onClick={() => handleTrackToggle(customer.id)}
                      >
                        {customer.isTracked ? "Untrack" : "Track"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => handleDelete(customer.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="text-sm text-black space-y-1">
                  <div className="not-italic flex gap-1">
                    <MapPinHouse className="h-4 w-4 text-gray-500" />
                    <span className="truncate">
                      {formatAddress(customer.address)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex text-xs mt-5 justify-between">
                  <p>
                    Last Visit:{" "}
                    {customer.lastPurchasedDate
                      ? format(
                          new Date(customer.lastPurchasedDate),
                          "dd MMM yyyy"
                        )
                      : "N/A"}
                  </p>
                  <div>
                    <div className="flex items-center gap-2">
                      {customer.debt && customer.debt > 0 ? (
                        <Badge className="text-[#e51e5a]" variant="secondary">
                          Dues {customer.debt.toLocaleString()}৳
                        </Badge>
                      ) : (
                        <Badge variant="secondary">No Dues</Badge>
                      )}
                      {customer.isTracked && (
                        <Badge variant="default" className="bg-green-500">
                          Tracking
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <AppPagination totalPages={15} />
          </div>
        </div>
      )}
    </div>
  );
}
