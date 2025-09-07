import { API_URL } from "@/lib/const";


export const addProduct = async (formData:any) => {
  if (!formData) {
    return {
      success: false,
      message: "Please enter proper credentials",
    };
  }



  try {
    const res = await fetch(`${API_URL}/products/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

      if (!res.ok) {
          console.log(result);
          return { success: false,error: result.message}
          return;

      }

    return { success: true, ...result };
  } catch (err) {
    const error = err as Error;
    console.error(error);
    return {
      success: false,
      message: error.message || "Something went wrong, please try again later",
    };
  }
};


export const addToCart = async (shopkeeper_id: number, product_id: number, price: number) => {
  if (!shopkeeper_id || !product_id || !price) {
    return {
      success: false,
      message: "Invalid request",
    };
  }

  try {
    const res = await fetch(`${API_URL}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ shopkeeper_id, product_id, price}),
    });

    const data = await res.json();

    if (!res.ok) {
        console.log(data);
        return {success: false, message:data.message}
    }

    return data; 
  } catch (error) {
    console.error("Add to cart error:", error);
   
  }
};
