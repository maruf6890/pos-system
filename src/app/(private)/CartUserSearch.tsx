"use client";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useEffect,useState } from "react";
import { API_URL } from "@/lib/const";
export interface CustomerSearchData{
    customer_id:number,
    name: string,
    email: string,
    phone: string,
    paymentDue:number
}

interface SearchUserProps {
  onSelect: (user: CustomerSearchData) => void; 
}

export default function CartSearchUser({ onSelect }: SearchUserProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CustomerSearchData[]>([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
    const fetchUsers = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

    setLoading(true);
    try {
        const res = await fetch(`${API_URL}/customers/?search=${query}`);
          const result = await res.json();
          if (!res.ok)
          {
              console.log(result);
              return;
          }
        console.log(result.data);
        setResults(result.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchUsers, 400); 
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* Search Input */}
          <Input
        type="text"
        placeholder="Search users."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full text-black"
      />

      {/* Suggestions Dropdown */}
      {(results.length > 0 || loading) && (
        <Card className="absolute top-full left-0 w-full mt-1 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
          {loading ? (
            <p className="p-2 text-gray-500">Searching...</p>
          ) : (
            <ul className="divide-y">
              {results.map((user) => (
                <li
                  key={user.customer_id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onSelect(user);
                    setQuery(user.name);
                      setResults([]); 
                      
                  }}
                >
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </div>
  );
}
