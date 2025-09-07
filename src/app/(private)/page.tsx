
import React from 'react'
import ProductsPage from './products/ProductPage'
import { getCookie } from '@/lib/cookies';

export default async function page() {
    const userCookie = await getCookie("user");

    const user = userCookie?.value ? JSON.parse(userCookie.value) : null;
  return (
    <ProductsPage user={user} />
  )
}
