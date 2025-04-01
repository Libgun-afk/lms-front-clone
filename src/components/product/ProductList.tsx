"use client";

import { useState } from "react";
import { Form, Input, Modal, Select, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { usePathname } from "next/navigation";
import { CREATE_PRODUCT_MUTATION } from "@/graphql/mutation";
import request from "graphql-request";
import { Option } from "antd/es/mentions";

interface Tag {
  id: number;
  name: string;
  status: string;
}

interface Product {
  id: string;
  name: string;
  status: string;
  code: string;
  price: number;
  tags: Tag[];
  weight: number;
  weightUnit: string;
  remaining: number;
  description: string;
  minAge: number;
  createdUserId: string;
  createdAt: string;
  updatedUserId: string;
  updatedAt: string;
}

interface ProductListProps {
  products: Product[];
}

interface ProductData {
  name: string;
  price: number;
  tags: number[];
  weight: number;
  weightUnit: string;
  remaining: number;
  description: string;
  code: string;
}

const createProduct = async (productData: ProductData) => {
  const endpoint =
    "http://loadbalancerlmscore-1401289988.ap-east-1.elb.amazonaws.com/backoffice";
  const token =
    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibnlhbWRvcmptYWlsQGdtYWlsLmNvbSIsInJvbGVzIjpbInByb2R1Y3QiLCJ0YWciLCJ1c2VyIl19.awN_PCBKrw-0rLDlL1EpjMY8OuD8crZD2h-x6gEGcek";

  try {
    const response = await request<{ createProduct: ProductData }>(
      endpoint,
      CREATE_PRODUCT_MUTATION,
      { createProductInput: productData },
      { Authorization: ` ${token}` }
    );
    console.log("Бүтээгдэхүүн амжилттай үүслээ:", response.createProduct);
    return response.createProduct;
  } catch (error) {
    console.error("Бүтээгдэхүүн үүсгэхэд алдаа гарлаа:", error);
    if (error instanceof Error && (error as any).response) {
      console.error("GraphQL Error Response:", (error as any).response.errors);
    }
  }
};

const ProductList = ({ products }: ProductListProps) => {
  const [productData, setProductData] = useState<ProductData>({
    code: "",
    name: "",
    price: 0,
    tags: [],
    weight: 0,
    weightUnit: "",
    remaining: 0,
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]:
        name === "weight" || name === "remaining" ? parseFloat(value) : value,
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const tagsArray = value.split(",").map((tag) => parseInt(tag.trim(), 10));
    setProductData((prev) => ({
      ...prev,
      tags: tagsArray,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productData.name.trim()) {
      alert("Product name is required.");
      return;
    }
    if (productData.price <= 0) {
      alert("Price must be greater than 0.");
      return;
    }
    if (productData.weight <= 0) {
      alert("Weight must be greater than 0.");
      return;
    }
    if (productData.remaining < 0) {
      alert("Remaining quantity cannot be negative.");
      return;
    }

    const result = await createProduct(productData);
    if (result) {
      alert("Product successfully created!");
    }
  };

  const router = usePathname();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const isActive = (path: string) => {
    if (path === router) return true;
    if (path !== "/" && router.startsWith(path)) return true;
    return false;
  };

  const [filter, setFilter] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(true);
  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(true);

  const toggleFilter = () => setIsFilterVisible((prev) => !prev);
  const toggleDetail = () => setIsDetailsVisible((prev) => !prev);

  const [activeTab, setActiveTab] = useState<"product" | "supply">("product");

  const filteredProducts = products.filter((product) => {
    const tagMatch =
      selectedTags.length === 0 ||
      product.tags.some((tag) => selectedTags.includes(tag.name));
    const statusMatch =
      selectedStatus.length === 0 || selectedStatus.includes(product.status);
    const nameMatch = product.name.toLowerCase().includes(filter.toLowerCase());

    return tagMatch && statusMatch && nameMatch;
  });

  // 📋 Хүснэгтийн багана
  const columns: TableProps<Product>["columns"] = [
    {
      title: "Барааны код",
      dataIndex: "code",
      key: "code",
      render: (code) => <span>{code}</span>,
      width: 120,
    },
    {
      title: "Зураг",
      dataIndex: "image",
      key: "code",
      render: (code) => <span>{code}</span>,
      width: 120,
    },
    {
      title: "Барааны нэр",
      dataIndex: "name",
      key: "name",
      render: (name) => <span>{name}</span>,
      width: 180,
    },
    {
      title: "Дагалдах бэлэг",
      dataIndex: "e",
      key: "e",
      render: (price) => <span>{price}</span>,
      width: 120,
    },
    {
      title: "Тайлбар",
      dataIndex: "description",
      key: "description",
      render: (description) => <span>{description || "-"}</span>,
      width: 200,
    },

    {
      title: "Үндсэн үнэ",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price}₮</span>,
      width: 120,
    },

    {
      title: "Хямдарсан үнэ",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price}₮</span>,
      width: 120,
    },

    {
      title: "Төлөв",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          className="rounded-xl"
          color={status === "ACTIVE" ? "green" : "gray"}>
          {status === "ACTIVE" ? "Бүртгэсэн" : "Түр хадгалсан"}
        </Tag>
      ),
      width: 120,
    },

    {
      title: "Төрөл",
      dataIndex: "e",
      key: "pricee",
      render: (price) => <span>{price}</span>,
      width: 120,
    },

    {
      title: "Сүүлд өөрчилсөн огноо",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => (
        <span>{new Date(updatedAt).toLocaleDateString()}</span>
      ),
      width: 150,
    },

    {
      title: "Өөрчилсөн хэрэглэгч",
      dataIndex: "updatedUserId",
      key: "updatedUserId",
      render: (id) => (
        <span>
          {id}
          {/* <img src="" alt="" /> */}
        </span>
      ),
      width: 120,
    },
  ];

  return (
    <div className="flex w-full gap-3" onSubmit={handleSubmit}>
      {/* {isFilterVisible && (
        <div className="w-64 p-4 rounded-xl bg-gray-50 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Шүүлтүүр</h2>
            <button
              onClick={toggleFilter}
              className="text-gray-500 hover:text-gray-700">
              <IoCloseOutline className="w-5 h-5" />
            </button>
          </div>
          <FilterPanel />
        </div>
      )} */}

      <div className="flex flex-col gap-4 w-full rounded-xl bg-white">
        <div className="flex justify-between  h-[60px] items-center border-b border-gray-200 px-2">
          <div className="flex gap-6 items-center justify-center">
            <div className="font-bold text-lg">Бараа материалын жагсаалт</div>
            <div className="flex gap-2 text-sm text-gray-500">
              Нийт:
              <div className="text-black text-sm font-bold">
                {filteredProducts.length}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={toggleFilter}
              className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] rounded-xl w-9 border-2 border-gray-300 justify-center items-center gap-2 p-2">
              <img src="/image.png" alt="" className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFilter}
              className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] rounded-xl w-9 border-2 border-gray-300 justify-center items-center gap-2 p-2">
              <img src="/image copy.png" alt="" className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFilter}
              className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] w-9 rounded-xl border-2 border-gray-300 justify-center items-center gap-2 p-2">
              <img src="/image copy 2.png" alt="" className="w-[14px] h-4" />
            </button>
            <div className="flex gap-2">
              <button
                onClick={showModal}
                className="h-[36px] gap-2 flex items-center justify-center bg-[#3051A0] hover:bg-[#203974] rounded-xl text-white px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105">
                <img src="/image copy 3.png" alt="" className="w-[14px] h-4" />
                Бараа бүртгэх
              </button>
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={filteredProducts.map((product) => ({
            ...product,
            key: product.id,
          }))}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
          className="w-full"
          rowClassName={() => " cursor-pointer"}
          onRow={(record) => ({
            onClick: () => toggleDetail(),
          })}
          style={{
            overflowY: "hidden",
          }}
        />
      </div>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-50 transition-all ${
          isModalVisible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}>
        <div className="bg-white rounded-xl w-[600px] h-[660px]">
          <div className="flex justify-between items-center px-5 py-5 rounded-t-xl bg-[#F0F2F5] ">
            <h2 className="text-xl font-medium text-[#4B5563]">
              Бараа бүртгэх
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form className="flex flex-col p-5 gap-5">
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
      </div>

      {/* {isDetailsVisible && (
        <div className="w-64 p-4 rounded-xl bg-gray-50">
          <ProductDetails />
        </div>
      )} */}
    </div>
  );
};

export default ProductList;
