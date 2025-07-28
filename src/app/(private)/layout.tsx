import AppSidebar from '@/components/dashboard/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';
import React from 'react'
import { Notification } from './Notification';
import { ProfileDropdown } from './ProfileDropdown';

export default  function layout({children}: {children: React.ReactNode}) {
    const token="this is a dummy token" ;
    redirect
    if (!token) {
         redirect('/login');
    } else {
       return (
         <div className="flex h-full">
           <SidebarProvider>
             <AppSidebar userRole="admin"/>
             <div className="flex-1 ">
               <header className="flex justify-between p-5">
                 <SidebarTrigger />
                 <div className="flex gap-3 justify-between">
                   <Notification />
                   <ProfileDropdown />
                 </div>
               </header>
               <main className=''>{children}</main>
             </div>
           </SidebarProvider>
         </div>
       );
    }
}
