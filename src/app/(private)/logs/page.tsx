'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import {
  Eye,
  FileDown,
  Trash,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const logs = [
  {
    id: '1',
    url: 'http://localhost:5000/login',
    activity: 'User Login',
    date: '16/08/2021',
    time: '10:30 AM',
    user: 'Odoemelam Emmanuel',
    email: 'manuelsnr.design@gmail.com',
    role: 'user',
    status: 'Success',
    authorized: true,
  },
  {
    id: '2',
    url: 'http://localhost:5000/login',
    activity: 'User Login',
    date: '16/08/2021',
    time: '11:23 PM',
    user: 'Ralph Edwards',
    email: 'michael.mitc@example.com',
    role: 'Admin',
    status: 'Failed',
    authorized: false,
  },
  // Add more logs here...
];

export default function SystemLogPage() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(logs.length / itemsPerPage);

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedRows(prev => (prev.length === logs.length ? [] : logs.map(log => log.id)));
  };

  const paginatedLogs = logs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 max-w-6xl  mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">System Log</h2>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Actions <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2">
                <Eye className="w-4 h-4" /> View All
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <FileDown className="w-4 h-4" /> Export All
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                <Trash className="w-4 h-4" /> Delete All
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      
          <Table className="border">
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.length === logs.length && logs.length > 0}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                  />985
                </TableHead>
                <TableHead className="min-w-[150px]">URL</TableHead>
                <TableHead className="min-w-[120px]">Activity</TableHead>
                <TableHead className="min-w-[120px]">Date & Time</TableHead>
                <TableHead className="min-w-[200px]">User Information</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[120px]">Authorization</TableHead>
                <TableHead className="w-20 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLogs.map(log => (
                <TableRow key={log.id} className="hover:bg-muted/20">
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(log.id)}
                      onCheckedChange={() => toggleRowSelection(log.id)}
                      aria-label={`Select row ${log.id}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium truncate max-w-[150px]">{log.url}</TableCell>
                  <TableCell>{log.activity}</TableCell>
                  <TableCell>
                    <div>{log.date}</div>
                    <div className="text-xs text-muted-foreground">{log.time}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{log.user}</div>
                    <div className="text-xs text-muted-foreground">{log.email}</div>
                    <div className="text-xs text-muted-foreground">{log.role}</div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`${
                        log.status === 'Success' ? ' text-green-600' : ' text-red-600'
                      }`}
                    >
                      {log.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`
                        ${log.authorized ? ' text-green-600' : ' text-red-600'}
                      `}
                    >
                      {log.authorized ? 'Authorized' : 'Unauthorized'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Eye className="w-4 h-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <FileDown className="w-4 h-4" /> Export
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                          <Trash className="w-4 h-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 ">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, logs.length)}
              </span>{' '}
              of <span className="font-medium">{logs.length}</span> entries
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'outline' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              {totalPages > 5 && currentPage < totalPages - 2 && <span className="px-2">...</span>}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
      
    </div>
  );
}
