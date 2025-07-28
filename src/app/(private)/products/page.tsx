'use client'
import React, { useState } from 'react'
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import PosSidebar from '@/components/Shop/PosSidebar';
import { Button } from '@/components/ui/button';
import ProductsPage from './ProductPage';

export default function page() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const handleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    }
        
    
  return (
    <div className="max-w-7xl  mx-auto min-h-screen">
      <SidebarProvider>
        <ProductsPage />
        
        <PosSidebar />
      </SidebarProvider>
    </div>
  );
}
