"use server"

import { cookies } from "next/headers"

const getCookie = async (key: string) => {
    const cookieStore = await cookies();
    const value = cookieStore.get(key);
    return value || null;
}
const setCookie = async(key: string, value: string)=>{
    const cookieStore = await cookies();
    cookieStore.set({
        name: key,
        value: value,
        httpOnly: true,
        sameSite:'strict',
        path:'/'
    
    })
    
}
const deleteCookie = async (key: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(key);
}
const hasCookie = async (key: string) => {
  const cookieStore = await cookies();
    return cookieStore.has(key);
};

export {getCookie,setCookie,hasCookie,deleteCookie}