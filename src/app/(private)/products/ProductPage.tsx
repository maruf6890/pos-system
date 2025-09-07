"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductCard from "./ProductCard";
import AppPagination from "@/components/Shop/AppPagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectItem, SelectLabel, SelectGroup, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { API_URL } from "@/lib/const";
import { User } from "@/lib/types";
import { addToCart } from "./product.action";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";
type Category = {
  category_id: number;
  name: string;
}
type Brand = {
  brand_id: number;
  name: string;
};
export interface Product {
  product_id: number;
  name: string;
  price: string;
  discount_price: string;
  stock_quantity: number;
  category_name: string;
  brand_name: string;
}

export default function ProductsPage({user}: {user:User|null}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const searchParams = useSearchParams();
  const [total, setTotal] = useState(1);
  const router = useRouter();
   const setCount = useCartStore((state) => state.setCount);
  const validated = validateQueryParams({
    page: searchParams.get("page"),
    items_per_page: searchParams.get("item_per_page"),
    search: searchParams.get("search"),
    category: searchParams.get("category"),
    brand: searchParams.get("brand"),
    type: searchParams.get("type"),
  });
 
  const { page, items_per_page, search, category,brand, type } = validated;
  const handleSearch = (value : string ) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set('search', value);
    else params.delete('search');
    params.set('page', "1");
    router.replace(`?${params.toString()}`);

  }
  const handleCategoryChange = (value: string) => {
    console.log(value);
     const params = new URLSearchParams(searchParams.toString());
     if (value) params.set("category", value);
     else params.delete("category");
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
    
  }
  const handleBrandChange = (value: string) => {
    console.log("brand "+value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("brand", value);
    else params.delete("brand");
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };
  const handleTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("type", value);
    else params.delete("type");
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/products/category`, {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();
        if (!res.ok) {
          console.log(result.error);
          console.log(result.message);
          return;
        }
      
        setCategories(result.data);
       
      } catch (error) {
        console.log(error);
    
      }
    }
    getCategories();
    
  }, []);

 useEffect(() => {
    const geyBrand = async() => {
     try {
       const res = await fetch(`${API_URL}/products/brand`, {
         method: "GET",
         credentials: "include",
       });
       const result = await res.json();
       if (!res.ok) {
         console.log(result.error);
         console.log(result.message);
         return;
       }
       console.log(result.data);
      setBrands(result.data);
       
     } catch (error) {
       console.log(error);
    
     }
    }
    geyBrand();
    
 }, [])

   useEffect(() => {
     const params = new URLSearchParams();
     params.set("page", page.toString());
     params.set("items_per_page", items_per_page.toString());
     if (search) params.set("search", search);
     if (type) params.set("type",type );
     if (category) params.set("category", category);
    if (brand) params.set("brand", brand);
     const fetchProduct= async () => {
     
       try {
         const res = await fetch(`${API_URL}/products/?${params}`, {
           headers: {
             method: "GET",
             credentials: "include",
           },
         });
         if (!res.ok) {
           return;
         }
         const result = await res.json();
         if (!result.success) {
           console.log(result.message);
          
         }
         console.log(result);
         setProducts(result.data)
         const page = Math.ceil(result.total / items_per_page);
         setTotal(page);
        
       
       } catch (error) {
         console.log(error);
       }
     };
     fetchProduct();
   }, [page, items_per_page, search, category, brand, type]);
  
  
  const handleAddToCart = async(product_id: number,price:string) => {
    if (!user) return;
    
    const result = await addToCart(user.id, product_id, Number(price));
    toast(result.message);
    if (result.success) {
      setCount(result.cartCount);
    }
    
  }



  return (
    <div className="w-full   h-screen p-10">
      <div className="flex  justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold mb-2">Products</h1>
          <p className="text-sm text-gray-500">
            Manage your products and inventory
          </p>
        </div>
        <Button
          onClick={() => {
            router.push("/product/add");
          }}
          variant="outline"
          className="rounded-lg border bg-[#e51e5a] text-gray-100 hover:bg-[#e51e5a]/70 hover:text-white"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={search || ""}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          className="max-w-sm text-black"
        />
        <div className="flex gap-3">
          <Select
            value={category || ""}
            onValueChange={(value) => handleCategoryChange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={category ? category : "Select Category"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((value) => (
                  <SelectItem
                    key={value.category_id}
                    value={value.category_id.toString()}
                  >
                    {value.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={brand || ""}
            onValueChange={(value) => handleBrandChange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={brand ? brand : "Select Brand"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {brands.map((value) => (
                  <SelectItem
                    key={value.brand_id}
                    value={value.brand_id.toString()}
                  >
                    {value.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={type || ""}
            onValueChange={(value) => handleTypeChange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={type} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="in">Stock In</SelectItem>
                <SelectItem value="out">Stock Out</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 mb-10 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
            onSelect={handleAddToCart}
          />
        ))}
      </div>
      {total > 1 && <AppPagination totalPages={total} />}
    </div>
  );
}



export function validateQueryParams(raw: {
  page: string | null;
  items_per_page: string | null;
  search?: string |null ;
  category?: string | null;
  brand?: string | null;
  type: string |null;
}) {
  // Page: positive integer, default 1
  const page =
    raw.page && /^\d+$/.test(raw.page) && Number(raw.page) > 0
      ? Number(raw.page)
      : 1;

  // Items per page: integer 1–100, default 8
  let items_per_page = 8;
  if (raw.items_per_page && /^\d+$/.test(raw.items_per_page)) {
    const n = Number(raw.items_per_page);
    if (n >= 1 && n <= 100) items_per_page = n;
  }

  
  let search: string="";
  if (raw.search) {
    const s = raw.search.trim();
    if (s.length > 0) search = s.slice(0, 255);
  }

 
  const category: string | null = raw.category || null;
  const brand: string | null = raw.brand || null;
  
  
  const allowedType = ["in", "out","all"];
  const type =allowedType.includes(raw.type || "")
    ? raw.type
    : "all";

  return { page, items_per_page, search, category,brand, type};
}