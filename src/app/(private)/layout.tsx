import AppSidebar from '@/components/dashboard/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';
import React from 'react'
import { Notification } from './Notification';
import { ProfileDropdown } from './ProfileDropdown';
import { Cart } from './Cart';
import { getCookie } from '@/lib/cookies';

export default async function layout({children}: {children: React.ReactNode}) {
  const userCookie = await getCookie("user");
  
 const user = userCookie?.value ? JSON.parse(userCookie.value) : null;
  console.log(user);
    const token="jeff"
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
                   <Cart shopkeeper_id={user.id}/>

                   
                   
                 </div>
               </header>
               <main className=''>{children}</main>
             </div>
           </SidebarProvider>
         </div>
       );
    }
}
