"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoveUpRight } from "lucide-react";

type User = {
  id: number;
  name: string;
  phone: string;
  address: string;
  lastVisited: string; // ISO date string
  daysInactive: number;
};

export function InactiveUsersTable() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // 10 Dummy users with BD phone numbers
    const dummyUsers: User[] = [
      {
        id: 1,
        name: "Md. Rahman Ali",
        phone: "+880 1711-234567",
        address: "12/A Dhanmondi, Dhaka",
        lastVisited: "2023-09-10",
        daysInactive: 150,
      },
      {
        id: 2,
        name: "Fatima Begum",
        phone: "+880 1812-345678",
        address: "45 Mirpur Road, Dhaka",
        lastVisited: "2023-10-05",
        daysInactive: 125,
      },
      {
        id: 3,
        name: "Abdul Karim",
        phone: "+880 1913-456789",
        address: "78 Uttara, Sector 7, Dhaka",
        lastVisited: "2023-08-15",
        daysInactive: 175,
      },
      {
        id: 4,
        name: "Ayesha Akter",
        phone: "+880 1614-567890",
        address: "23 Banani, Dhaka",
        lastVisited: "2023-11-20",
        daysInactive: 90,
      },
      {
        id: 5,
        name: "Shahriar Ahmed",
        phone: "+880 1315-678901",
        address: "56 Motijheel, Dhaka",
        lastVisited: "2023-07-01",
        daysInactive: 210,
      },
      {
        id: 6,
        name: "Nusrat Jahan",
        phone: "+880 1516-789012",
        address: "34 Gulshan Avenue, Dhaka",
        lastVisited: "2023-10-30",
        daysInactive: 100,
      },
      
    ].sort((a, b) => b.daysInactive - a.daysInactive); // Sort by most inactive first

    setUsers(dummyUsers);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-BD", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="rounded-md border p-6 my-10">
      <h1 className="text-lg font-semibold p-4 border-b">Inactive Users</h1>  
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Last Visited</TableHead>
          
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {user.address}
              </TableCell>
              <TableCell>{formatDate(user.lastVisited)}</TableCell>
    
              <TableCell className="text-right">
                <Button variant="outline" size="sm">
                <MoveUpRight className="w-4 h-4 mr-2" />
         
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
