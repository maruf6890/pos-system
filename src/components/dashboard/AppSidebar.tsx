"use client";

import React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

import Image from "next/image";
import { useTranslations } from "next-intl";


import {
  Home,
  CreditCard,
  Users,
  Building,
  BarChart3,
  MessageSquare,
  Ticket,
  ShoppingCart,
  ShoppingBasket,
  ShoppingBag,
} from "lucide-react";

type MenuItem = {
  id: string;
  titleKey: string;
  url?: string;
  icon: React.ElementType;
  role: "common" | "admin";
};

export const sidebarMenu: MenuItem[] = [
  {
    id: "dashboard",
    titleKey: "dashboard",
    url: "/",
    icon: Home,
    role: "common",
  },
  {
    id: "pos",
    titleKey: "pos",
    url: "/pos",
    icon: ShoppingCart,
    role: "common",
  },

  {
    id: "products",
    titleKey: "products",
    url: "/products",
    icon: ShoppingBag,
    role: "common",
  },
  {
    id: "customers",
    titleKey: "customers",
    url: "/customers",
    icon: Users,
    role: "common",
  },
  {
    id: "supplier",
    titleKey: "supplier",
    url: "/supplier",
    icon: Building,
    role: "admin",
  },
  {
    id: "reports",
    titleKey: "reports",
    url: "/reports",
    icon: BarChart3,
    role: "admin",
  },
  {
    id: "selling",
    titleKey: "selling",
    url: "/selling",
    icon: CreditCard,
    role: "common",
  },
  {
    id: "shopkeepers",
    titleKey: "shopkeepers",
    url: "/shopkeepers",
    icon: Users,
    role: "admin",
  },
  {
    id: "logs",
    titleKey: "logs",
    url: "/logs",
    icon: MessageSquare,
    role: "admin",
  },
  {
    id: "sellingHistory",
    titleKey: "sellingHistory",
    url: "/selling-history",
    icon: Ticket,
    role: "common",
  },
];

interface AppSidebarProps {
  userRole: "common" | "admin"; // receive current user role as prop
}

export default function AppSidebar({ userRole }: AppSidebarProps) {
  const t = useTranslations("Menu");

  // Filter menu based on userRole
  const filteredMenu = sidebarMenu.filter(
    (item) => item.role === "common" || item.role === userRole
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-lg text-purple-600 font-bold">
            <Image src="/images/Logo.png" alt="Logo" width={180} height={40} />
          </Link>
         
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="list-none">
            {filteredMenu.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url || "#"}
                    className="flex items-center py-5 px-4 hover:bg-muted/30 rounded-md transition-all"
                  >
                    <item.icon className="w-5 h-5 mr-2" />
                    {t(item.titleKey)}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
