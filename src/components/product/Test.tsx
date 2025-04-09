import {
  CREATE_PRODUCT_MUTATION,
  CREATE_TAG_MUTATION,
} from "@/graphql/mutation";
import { DatePicker, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import axios from "axios";
import request from "graphql-request";
import moment from "moment";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Tags from "./Tag";

interface CreateProductProps {
  onClose: () => void;
  onRefresh: () => void;
  products: Product[];
}

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
  description: string;
  // promotionProductCode: number;
  // promotionEnddate: string;
  promotionProduct: { code: string; name: string };
  // images: { uuid: string }[];
  salePrice: number;
  salePercent: number;
  saleEnddate: string;
  minAge: number;
  createdUserId: string;
  createdAt: string;
  updatedUserId: string;
  updatedAt: string;
}

interface ProductData {
  name: string;
  status?: string;
  code: string;
  salePrice?: string | number;
  salePercent?: number;
  saleEnddate?: string;
  // promotionEnddate?: string;
  price: string | number;
  tags: number[];
  // promotionProductCode: number;
  description: string;
}

const createTag = async (tagName: string) => {
  const endpoint =
    "http://loadbalancerlmscore-1401289988.ap-east-1.elb.amazonaws.com/backoffice";
  const token =
    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibnlhbWRvcmptYWlsQGdtYWlsLmNvbSIsInJvbGVzIjpbInByb2R1Y3QiLCJ0YWciLCJ1c2VyIl19.awN_PCBKrw-0rLDlL1EpjMY8OuD8crZD2h-x6gEGcek"; // Replace with your token
  try {
    const response = await request<{ createTag: Tag }>(
      endpoint,
      CREATE_TAG_MUTATION,
      { createTagInput: { name: tagName, status: "ACTIVE" } },
      { Authorization: token }
    );
    toast.success("Шинэ таг амжилттай нэмэгдлээ!");
    return response.createTag;
  } catch (error) {
    console.error("Алдаа:", error);
    toast.error("Таг нэмэхэд алдаа гарлаа.");
  }
};

const createProduct = async (productData: ProductData) => {
  const endpoint =
    "http://loadbalancerlmscore-1401289988.ap-east-1.elb.amazonaws.com/backoffice";
  const token =
    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibnlhbWRvcmptYWlsQGdtYWlsLmNvbSIsInJvbGVzIjpbInByb2R1Y3QiLCJ0YWciLCJ1c2VyIl19.awN_PCBKrw-0rLDlL1EpjMY8OuD8crZD2h-x6gEGcek"; // Replace with your token
  try {
    const response = await request<{ createProduct: ProductData }>(
      endpoint,
      CREATE_PRODUCT_MUTATION,
      { createProductInput: productData },
      { Authorization: token }
    );
    toast.success("Бүтээгдэхүүн амжилттай нэмэгдлээ!");
    return response.createProduct;
  } catch (error) {
    console.error("Алдаа:", error);
    toast.error("Бүтээгдэхүүн нэмэхэд алдаа гарлаа.");
  }
};

// const createImage = async (productData: ProductData) => {
//   const endpoint =
//     "http://loadbalancerlmscore-1401289988.ap-east-1.elb.amazonaws.com/api/file/upload";
//   const token =
//     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibnlhbWRvcmptYWlsQGdtYWlsLmNvbSIsInJvbGVzIjpbInByb2R1Y3QiLCJ0YWciLCJ1c2VyIl19.awN_PCBKrw-0rLDlL1EpjMY8OuD8crZD2h-x6gEGcek"; // Replace with your token
//   try {
//     const response = await axios.postFormData(endpoint, productData, {
//       headers: {    }

//     toast.success("Бүтээгдэхүүн амжилттай нэмэгдлээ!");
//     return response.createProduct;
//   } catch (error) {
//     console.error("Алдаа:", error);
//     toast.error("Бүтээгдэхүүн нэмэхэд алдаа гарлаа.");
//   }
// };

const CreateProduct: React.FC<CreateProductProps> = ({
  products,
  onClose,
  onRefresh,
}) => {
  const [productData, setProductData] = useState<ProductData>({
    code: "",
    tags: [],
    // tags: [] as number[],
    name: "",
    // promotionProductCode: 0,
    saleEnddate: "",
    price: "",
    salePrice: "",
    salePercent: 0,
    // promotionEnddate: "",
    description: "",
  });
  // const [productData, setProductData] = useState({
  //   tags: [] as number[],
  // });
  const [newTag, setNewTag] = useState<string>("");

  const handleTagChange = (value: string[]) => {
    setProductData((prev) => ({
      ...prev,
      tags: value.map(Number),
    }));
  };

  const handleAddTag = () => {
    if (newTag && !productData.tags.includes(Number(newTag))) {
      setProductData((prev) => ({
        ...prev,
        tags: [...prev.tags, Number(newTag)],
      }));
      setNewTag("");
    }
  };

  const handleEndDateChange = (
    date: moment.Moment | null,
    dateString: string | string[]
  ) => {
    const formattedDateString = Array.isArray(dateString)
      ? dateString.join(", ")
      : dateString;

    setProductData((prev) => ({
      ...prev,
      saleEnddate: formattedDateString, // dateString will be in "YYYY-MM-DD" format
    }));
  };

  const calculateSalePercent = (price: number, salePrice: number) => {
    if (price && salePrice) {
      return ((price - salePrice) / price) * 100;
    }
    return 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "price" || name === "salePrice") {
      const cleanValue = value.replace(/[^\d.]/g, "");
      const numericValue = parseFloat(cleanValue) || 0;

      setProductData((prev) => {
        let updatedData = { ...prev, [name]: numericValue };

        if (name === "price" || name === "salePrice") {
          const salePercent = calculateSalePercent(
            Number(updatedData.price),
            Number(updatedData.salePrice) ?? 0
          );
          updatedData.salePercent = salePercent;
        }

        return updatedData;
      });
    }

    if (name === "salePercent") {
      const cleanValue = value.replace(/[^0-9%]/g, "");
      let numericValue = parseFloat(cleanValue.replace("%", "")) || 0;

      setProductData((prev) => {
        let updatedData = { ...prev, [name]: numericValue };

        if (numericValue && prev.price) {
          const salePrice =
            Number(prev.price) - Number(prev.price) * (numericValue / 100);
          updatedData.salePrice = salePrice;
        }

        return updatedData;
      });
    }

    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting data:", productData);

    if (!productData.name.trim()) {
      toast.error("Барааны нэр хоосон байна.");
      return;
    }

    const result = await createProduct(productData);
    if (result) {
      onRefresh();
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-50 transition-all">
      <div className="bg-white rounded-xl w-[550px] flex flex-col justify-between h-[600px]">
        <div className="flex justify-between items-center border-b h-[64px] px-6 bg-[#F0F2F5] rounded-t-xl">
          <h2 className="text-xl font-medium">Бараа бүртгэх</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>

        <form className="flex flex-col p-5 gap-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* <div className="flex flex-col gap-1">
              <div className="text-sm text-[#374151] pl-1">Барааны код</div>
              <Input
                type="text"
                name="code"
                value={productData.code}
                onChange={handleInputChange}
                placeholder="Барааны код"
                className="p-2 border rounded w-full"
              />
            </div> */}

            <div className="flex flex-col gap-1">
              {/* <Tags /> */}

              {/* <div className="flex gap-2 flex-wrap">
                <Input
                  type="text"
                  name="tag"
                  value={productData.tags.join(", ")}
                  onChange={(e) => {
                    const selectedTags = e.target.value
                      .split(",")
                      .map((tag) => tag.trim());
                    setProductData((prev) => ({
                      ...prev,
                      tags: selectedTags.map(Number),
                    }));
                  }}
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Төрөл"
                  className="p-2 border rounded w-32"
                />

                {tags.map((tag, index) => (
                  <Tag
                    key={index}
                    className={`mr-2 ${
                      selectedTags.includes(tag) ? "bg-blue-500 text-white" : ""
                    }`}
                    closable
                    onClose={() => handleTagRemove(tag)}
                    onClick={() => handleTagSelect(tag)}
                    style={{ cursor: "pointer" }}>
                    {tag}
                  </Tag>
                ))}
              </div> */}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <div className="text-sm text-[#374151] pl-1">Барааны нэр</div>
              <Input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                placeholder="Мандарин JEJU"
                className="p-2 border rounded w-full"
              />
            </div>
            {/* 
            <div className="flex flex-col gap-1">
              <div className="text-sm text-[#374151] pl-1">
                Дагалдах бараа, бэлэгний код
              </div>
              <Select
                showSearch
                placeholder="Барааны код сонгох"
                options={options}
                value={selectedValue}
                onChange={(value) => {
                  setSelectedValue(value);

                  const selectedProduct = products.find(
                    (product) => product.promotionProductCode === Number(value)
                  );

                  if (selectedProduct) {
                    setProductData((prev) => ({
                      ...prev,
                      name: selectedProduct.name,
                      code: selectedProduct.code,
                    }));
                  } else {
                    console.warn("Selected product not found!");
                  }
                }}
                className="p-2 border rounded bg-red-200"
              />
            </div> */}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-4">
              <div>
                <div className="text-sm text-[#374151] pl-1">Хямдрал эхлэх</div>
              </div>
              <div>
                <div className="text-sm text-[#374151] pl-1">
                  Хямдрал дуусах
                </div>
                <DatePicker
                  value={
                    productData.saleEnddate
                      ? moment(productData.saleEnddate)
                      : null
                  }
                  onChange={handleEndDateChange}
                  format="YYYY-MM-DD"
                  className="w-full"
                />
              </div>
            </div>
            <div></div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col gap-1">
              <div className="text-sm text-[#374151] pl-1">Үндсэн үнэ</div>
              <Input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                placeholder="2,500 ₮"
                className="p-2 border rounded w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-sm text-[#374151] pl-1">Хямдарсан үнэ</div>
              <Input
                type="number"
                name="salePrice"
                value={productData.salePrice}
                onChange={handleInputChange}
                placeholder="2,000 ₮"
                className="p-2 border rounded w-full"
              />
            </div>

            <div className="flex flex-col gap-1 relative">
              <div className="text-sm text-[#374151] pl-1">Хямдралын хувь</div>
              <Input
                type="number"
                name="salePercent"
                value={productData.salePercent || ""}
                onChange={handleInputChange}
                placeholder="20"
                disabled
                className="p-2 border rounded w-full pr-8"
              />
            </div>

            <div></div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-sm text-[#374151] pl-1">Тайлбар</div>
            <TextArea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              placeholder="Орц, найруулга гэх мэт тайлбарласан дэлгэрэнгүй мэдээллийг энд бичнэ."
              className="p-2 border rounded w-full max-h-[100px] h-[100px]"
            />
          </div>

          {/* <ImageUploader onImageUpload={setUploadedImage} /> */}
        </form>
        <div className="flex justify-end items-center border-b h-[64px] px-6 bg-[#F0F2F5] rounded-b-xl">
          <button
            onClick={handleSubmit}
            type="button"
            className="bg-[#0A2D75] text-white flex justify-center items-center rounded w-[102px] h-9 hover:bg- transition font-semibold gap-2">
            <img
              src="/image copy 5.png"
              className="w-[14px] h-4"
              alt="Бүртгэх"
            />
            <div className="text-sm font-medium">Бүртгэх</div>
          </button>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default CreateProduct;
