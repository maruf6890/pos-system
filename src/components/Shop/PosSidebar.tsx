import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter,SidebarTrigger, SidebarHeader, useSidebar } from '../ui/sidebar'
import POSCartPage from '@/app/(private)/pos/page';

export default function PosSidebar() {
  const { setOpen} = useSidebar();
  
 setOpen(false)
  return (
    <Sidebar side="right" >
      <SidebarHeader />
      <SidebarTrigger className='relative right-10 top-6/12' />
      <SidebarContent>
     
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
