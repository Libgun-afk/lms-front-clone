"use client";

import { useState } from "react";
import { Table, Button, Tag, Checkbox } from "antd";
import type { TableProps } from "antd";
import { IoAddOutline } from "react-icons/io5";

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

const ProductList = ({ products }: ProductListProps) => {
  const [filter, setFilter] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  // 🔍 Шүүлтүүр
  const filteredProducts = products.filter((product) => {
    const tagMatch =
      selectedTags.length === 0 ||
      product.tags.some((tag) => selectedTags.includes(tag.name));
    const statusMatch =
      selectedStatus.length === 0 || selectedStatus.includes(product.status);
    const nameMatch = product.name.toLowerCase().includes(filter.toLowerCase());

    return tagMatch && statusMatch && nameMatch;
  });

  // ✅ Row сонголт
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  // 📋 Хүснэгтийн багана
  const columns: TableProps<Product>["columns"] = [
    {
      title: "Код",
      dataIndex: "code",
      key: "code",
      render: (code) => <span>{code}</span>,
    },
    {
      title: "Бүтээгдэхүүний нэр",
      dataIndex: "name",
      key: "name",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "Үнэ",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price}₮</span>,
    },
    {
      title: "Төрөл",
      dataIndex: "tags",
      key: "tags",
      render: (tags: Tag[]) =>
        tags.map((tag) => (
          <Tag key={tag.id} color={tag.status === "ACTIVE" ? "green" : "gray"}>
            {tag.name}
          </Tag>
        )),
    },
    {
      title: "Төлөв",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>
          {status === "ACTIVE" ? "Идэвхтэй" : "Хаагдсан"}
        </Tag>
      ),
    },
    {
      title: "Үлдэгдэл",
      dataIndex: "remaining",
      key: "remaining",
      render: (remaining) => <span>{remaining} ширхэг</span>,
    },
    {
      title: "Үүсгэсэн хэрэглэгч",
      dataIndex: "createdUserId",
      key: "createdUserId",
      render: (id) => <span>{id}</span>,
    },
  ];

  return (
    <div className="flex w-full gap-3">
      {/* Шүүлтүүр */}
      <div className="w-72 p-4 border-r bg-gray-50 flex flex-col gap-4">
        <h2 className="font-semibold">Шүүлтүүр</h2>

        {/* Төрөл */}
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Төрөл</h3>
          <Checkbox.Group
            className="flex flex-col gap-2"
            options={["Ундаа", "Хоол", "Гар утас", "Тоглоом"]}
            onChange={(values) => setSelectedTags(values as string[])}
          />
        </div>

        {/* Төлөв */}
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Төлөв</h3>
          <Checkbox.Group
            className="flex flex-col gap-2"
            options={["ACTIVE", "INACTIVE"]}
            onChange={(values) => setSelectedStatus(values as string[])}
          />
        </div>

        <button className="gap-2 flex justify-center items-center bg-[#3051A0] text-white p-2 pl-1 rounded-xl">
          <IoAddOutline className="w-[18px] h-[16px]" />
          Шүүх
        </button>
      </div>

      {/* Хүснэгт */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-3 items-center">
            <div className="font-bold text-lg">Бүтээгдэхүүний жагсаалт</div>
            <div className="text-sm text-gray-500">
              Нийт: {filteredProducts.length}
            </div>
          </div>

          <button className="gap-2 flex items-center bg-[#3051A0] text-white px-4 py-2 rounded-xl">
            <IoAddOutline className="w-[18px] h-[16px]" />
            Бүтээгдэхүүн нэмэх
          </button>
        </div>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredProducts.map((product) => ({
            ...product,
            key: product.id,
          }))}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
          }}
          rowClassName={() => "group hover:bg-[#D1E9FF] transition-colors"}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default ProductList;
