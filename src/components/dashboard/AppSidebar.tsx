"use client"
import React, { ReactNode, useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "../ui/sidebar";
import Link from "next/link";
import {
  FileText,
  ShoppingBag,
  Users,
  User,
  Percent,
  FileClock,
  File,
  ClipboardList,
  Plus,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import Image from "next/image";
export const services:MenuItem[] = [
  {
    name: "Products",
    href: "/",
    icon: <ShoppingBag className="w-5 h-5" />,
    role: "common",
  },
  {
    name: "Customer",
    href: "/customers",
    icon: <Users className="w-5 h-5 text-gray-700" />,
    role: "common",
  },
  {
    name: "Shopkeepers",
    href: "/shopkeepers",
    icon: <User className="w-5 h-5" />,
    role: "admin",
  },
  {
    name: "Sales",
    icon: <Percent className="w-5 h-5" />,
    role: "common",
    href:"#",
    children: [
      {
        name: "My Sales",
        href: "/sales/my-sales",
        icon: <File className="w-5 h-5" />,
        role: "common",
      },
      {
        name: "Pending Sales",
        href: "/sales/pending",
        icon: <FileClock className="w-5 h-5" />,
        role: "common",
      },
      {
        name: "Sales Report",
        href: "/sales/report",
        icon: <FileText className="w-5 h-5" />,
        role: "admin",
      },
    ],
  },
  {
    name: "Logs",
    href: "/logs",
    icon: <ClipboardList className="w-5 h-5" />,
    role: "admin",
  },
];

export const QuickAccessMenu:MenuItem[] = [
  {
    name: "Add Product",
    href: "/product/add",
    icon: <Plus className="w-5 h-5" />,
    role: "common",
  },
  {
    name: "Add Customer",
    href: "/customers/add",
    icon: <Plus className="w-5 h-5" />,
    role: "common",
  },
  {
    name: "Add Shopkeeper",
    href: "/shopkeepers/add",
    icon: <Plus className="w-5 h-5" />,
    role: "admin",
  },
];

type Role = "common" | "admin";


export interface MenuItem {
  name: string;
  href: string;
  icon: ReactNode;
  role: Role;
  children?: MenuItem[];
}

export function filterMenu(menu: MenuItem[], role: Role): MenuItem[] {
  if (role === "admin") {
    return menu; 
  }

  return menu
    .filter(item => item.role === "common")
    .map((item: MenuItem) => ({
      ...item,
      children: item.children ? filterMenu(item.children, role) : undefined,
    }));
}


//recursive rendering of menu
function renderMenu(items: typeof services) {
  return items.map((item, idx) => {
    if (item.children) {
      return (
        <Collapsible key={idx}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton asChild>
              <Link href="#">
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>{renderMenu(item.children)}</SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <SidebarMenuItem key={idx}>
        <SidebarMenuButton
          className="text-md font-medium text-gray-800"
          asChild
        >
          <Link href={item.href}>
            {item.icon}
            <span>{item.name}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  });
}

export default function AppSidebar({ role }: { role: string }) {
  const [menuType, setMenuType] = useState<"admin" | "common">("common");
  
 
  useEffect(() => {
    if(role=="admin") setMenuType("admin")
  }, [role]);
   const filteredServices = filterMenu(services, menuType);
   const filteredQuickAccess = filterMenu(QuickAccessMenu, menuType);

  return (
    <Sidebar>
      <SidebarHeader className="p-3">
        <Image
                   src="/images/logo.png"
                   alt="Logo"
                   width={200}
                   height={40}
                   className=""
                 />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>{renderMenu(filteredServices)}</SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenu(filteredQuickAccess)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter><Button >Logout</Button></SidebarFooter>
    </Sidebar>
  );
}
