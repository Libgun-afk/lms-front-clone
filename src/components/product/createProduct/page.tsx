"use client";
import Router from "next/router";
import { useState } from "react";

const CreateProductPage = () => {
  const [productData, setProductData] = useState<{
    code: string;
    name: string;
    price: string;
    weightUnit: string;
    weight: string;
    remaining: string;
    description: string;
    tags: string[];
  }>({
    code: "",
    name: "",
    price: "",
    weightUnit: "",
    weight: "",
    remaining: "",
    description: "",
    tags: [],
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleTagsChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProductData({ ...productData, tags: event.target.value.split(", ") });
  };

  return (
    <div className="flex justify-center items-center py-32">
      <form className="bg-white p-6  rounded-xl shadow-lg space-y-4 max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="code"
            value={productData.code}
            onChange={handleInputChange}
            placeholder="Product Code"
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            placeholder="Product Price"
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="weightUnit"
            value={productData.weightUnit}
            onChange={handleInputChange}
            placeholder="Weight Unit"
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="weight"
            value={productData.weight}
            onChange={handleInputChange}
            placeholder="Product Weight"
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="remaining"
            value={productData.remaining}
            onChange={handleInputChange}
            placeholder="Remaining Quantity"
            className="p-2 border rounded w-full"
          />
        </div>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          placeholder="Product Description"
          className="p-2 border rounded w-full min-h-[100px]"
        />
        <input
          type="text"
          name="tags"
          value={productData.tags.join(", ")}
          onChange={handleTagsChange}
          placeholder="Tags (comma separated)"
          className="p-2 border rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600 transition font-semibold">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
