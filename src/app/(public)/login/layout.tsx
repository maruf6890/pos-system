import { redirect } from "next/navigation";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
 
    return <>{children}</>;
  
}
