"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";

type Product = {
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: File | null;
};

export default function ProductAddForm() {
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    quantity: 0,
    category: "",
    image: null,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setProduct((prev) => ({ ...prev, image: acceptedFiles[0] }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // submit logic here
    console.log("Submitting:", product);
  };

    return (
      <div className="max-w-4xl mx-auto ">
        <div>
          <h1 className="text-2xl font-bold mb-1">Add New Product</h1>
          <p className="text-sm text-gray-500 mb-10">
            A form to add a new product to your inventory.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6   bg-white">
          <div>
            <Label htmlFor="name" className="mb-2">
              Product Name
            </Label>
            <Input
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="price" className="mb-2">
              Price
            </Label>
            <Input
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="quantity" className="mb-2">
              Quantity
            </Label>
            <Input
              name="quantity"
              type="number"
              value={product.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="category" className="mb-2">
              Category
            </Label>
            <Input
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label className="mb-2">Upload Image</Label>
            <div
              {...getRootProps()}
              className="border-dashed border-2 p-4 rounded-lg cursor-pointer text-center"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the image here ...</p>
              ) : (
                <p>Drag and drop product image, or click to select</p>
              )}
              {product.image && (
                <div className="mt-2">
                  <Image
                    src={URL.createObjectURL(product.image)}
                    alt="Preview"
                    width={150}
                    height={150}
                    className="rounded"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              variant="default"
              className="bg-[#e51e5a] hover:bg-[#e51e5a]/70 text-white "
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    );
}
