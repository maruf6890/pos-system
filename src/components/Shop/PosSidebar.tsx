import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter,SidebarTrigger, SidebarHeader, useSidebar } from '../ui/sidebar'

export default function PosSidebar() {
  const { setOpen} = useSidebar();
  
  return (
    <Sidebar side="right" >
      <SidebarHeader />
      <SidebarTrigger className='relative right-10 top-6/12' />
      <SidebarContent />
      <SidebarFooter />
    </Sidebar>
  );
}
