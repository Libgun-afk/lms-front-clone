'use client';

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CREATE_PRODUCT_MUTATION } from "@/graphql/mutation";
import request from "graphql-request";
import Tags from "./Tag";
import { useAtomValue } from "jotai/react";
import { userTokenAtom } from "../Provider";
import { Form, Input, message, Select, Upload, UploadFile, UploadProps } from "antd";
import Bonus from "./tags/Bonus";
import Highlight from "./tags/Highlight";
import Discounted from "./tags/Discounted";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import Dragger from "antd/es/upload/Dragger";

const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const tagComponents: { [key: string]: React.ReactNode } = {
  Урамшуулалтай: <Bonus />,
  Онцлох: <Highlight />,
  Хямдарсан: <Discounted />,
  Нэрийн: <div></div>,
};

const availableTags = [
  "Шинэ",
  "Урамшуулалтай",
  "Хямдарсан",
  "Онцлох",
  "Нэрийн",
];

interface Tag {
  id: number;
  name: string;
  status: string;
}

interface ProductData {
  name: string;
  status?: string;
  code: string;
  price: string | number;
  tags: Tag[];
  createdUserId?: number;
  createdUserName?: string;
  createdAt?: string;
  updatedUserId?: number;
  updatedUserName?: string;
  updatedAt?: string;
  images?: string[];
  salePrice?: string | number;
  salePercent?: number;
  saleEnddate?: string;
  description: string;
  promotionProduct: { code: string; name: string };
  promotionEnddate?: string;
}

interface CreateProductProps {
  onClose: () => void;
  onRefresh: () => void;
}

const createProduct = async (productData: ProductData) => {
  
  const token = useAtomValue(userTokenAtom);
  try {
    const response = await request<{ createProduct: ProductData }>(`${process.env.NEXT_PUBLIC_GRAPHQL_URI}`, CREATE_PRODUCT_MUTATION,
      { createProductInput: productData },
      { Authorization: `Bearer ${token}` }
    );
    toast.success("Бүтээгдэхүүн амжилттай нэмэгдлээ!");
    return response.createProduct;
  } catch (error) {
    console.error("Алдаа:", error);
    toast.error("Бүтээгдэхүүн нэмэхэд алдаа гарлаа.");
  }
};

const CreateProduct: React.FC<CreateProductProps> = ({ onClose, onRefresh }) => {
  const [form] = Form.useForm();
  const token = useAtomValue(userTokenAtom);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [fileList, setFileList] = useState<any>([]);

  const uploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload(file: any) {
        if (!allowedFileTypes.includes(file.type)) {
            message.error(`${file.name} зөвшөөрөгдөөгүй файл байна!`);
            return Upload.LIST_IGNORE;
        }
        return true;
    },
    onChange(info: any) {
        let newFileList = info.fileList.filter((file: any) => allowedFileTypes.includes(file.type));
        setFileList(newFileList);
    },
    onRemove() {
    },
  };

  const handleSubmit = async (values: any) => {
    if (!fileList.length) {
      message.error('Файл заавал оруулах шаардлагатай!');
      return;
    }
   
    const imageUrls: string[] = [];
    try {
      const formData = new FormData();
      formData.append('type', 'PRODUCT');
    
      fileList.forEach((item: any) => {
        formData.append('files', item.originFileObj);
      });
    
      const uploadURL = `${process.env.NEXT_PUBLIC_GRAPHQL_URI_UPLOAD}/api/file/upload`;
    
      const response = await axios.post(uploadURL, formData, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImNsaWVudElkIjoiNzhkZWVmMWQtMTM3MC00OWExLThhNDYtN2UxMzFiYmJlZTFhIiwic2NvcGVzIjpbXSwicGVybWlzc2lvbnMiOltdLCJvcmdJZCI6MywiZW1wSWQiOjE0fQ.gcqaFkMvxgljmpboHhxBsyfVd28_RWrlSXltwGvR9Ug`, // Token-оо хамгаалж хадгалаарай
          'Content-Type': 'multipart/form-data',
        },
      });
    
      if (response.status === 200) {
        const urls = response.data || [response.data];
        imageUrls.push(...urls);
      } else {
        message.error('Файл upload амжилтгүй боллоо.');
        return;
      }
    } catch (error) {
      console.error(error);
      message.error('Файл upload хийх үед алдаа гарлаа!');
    }
  
    console.log(imageUrls);
    
    const formValue = {
      name: "",
      status: "",
      code: values?.code,
      price: 0,
      tags: values.tags,
      createdUserId: 0,
      createdUserName: "",
      createdAt: "",
      updatedUserId: 0,
      updatedUserName: "",
      updatedAt: "",
      images: [],
      salePrice: 0,
      salePercent: 0,
      saleEnddate: "",
      description: "",
      promotionProduct: { code: "", name: "" },
      promotionEnddate: "",
    }

    console.log(formValue);
    

    // if (!productData.name.trim()) {
    //   toast.error("Барааны нэр хоосон байна.");
    //   return;
    // }
    // const result = await createProduct(productData);
    // if (result) {
    //   onRefresh();
    //   onClose();
    // }
  };

  const handleTagChange = (values: string[]) => {
    setSelectedTags(Array.from(new Set(values)));
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-50 transition-all">
      <div className="bg-white rounded-xl w-[550px] flex flex-col justify-between h-[700px]">
        <div className="flex justify-between items-center border-b h-[64px] px-6 bg-[#F0F2F5] rounded-t-xl">
          <h2 className="text-xl font-medium">Бараа бүртгэх</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>

        <Form form={form} className="flex flex-col h-[600px]" onFinish={handleSubmit} layout="vertical">
          <div className="flex flex-col gap-4 w-full rounded-xl bg-white px-5 py-2">
            <div>
              <div className="text-sm text-[#374151] pl-1 mb-1">Төрөл</div>
              <Form.Item name="tags">
                <Select
                  mode="multiple"
                  placeholder="Төрөл сонгох"
                  className="w-full"
                  maxTagCount={4}
                  value={selectedTags}
                  onChange={handleTagChange}
                >
                  {availableTags.map((tag) => (
                    <Select.Option key={tag} value={tag}>
                      {tag}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Form.Item name='code' label="Барааны код">
                  <Input
                    type="text"
                    placeholder="123456"
                    className="p-2 border rounded w-full"
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col">
                <div className="text-sm text-[#374151] pl-1">Барааны нэр</div>
                <Input
                  placeholder="Мандарин JEJU"
                  className="p-2 border rounded w-full"
                />
              </div>
            </div>
            <div
              className={`grid gap-4 ${
                selectedTags.includes("Хямдарсан") ? "grid-cols-3" : "grid-cols-1"
              }`}>
              <div className="flex flex-col gap-1">
                <div className="text-sm text-[#374151] pl-1">Үндсэн үнэ</div>
                <Input
                  type="number"
                  placeholder="2,500 ₮"
                  className="p-2 border rounded w-full"
                />
              </div>

              {selectedTags.includes("Хямдарсан") && (
                <>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-[#374151] pl-1">Худалдах үнэ</div>
                    <Input
                      type="number"
                      placeholder="2,000 ₮"
                      className="p-2 border rounded w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-[#374151] pl-1">Хямдралын хувь</div>
                    <Input
                      type="number"
                      placeholder="10%"
                      className="p-2 border rounded w-full"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col gap-4">
              {selectedTags
                .filter((tag) => tag !== "1")
                .map((tag) => (
                  <div key={tag}>{tagComponents[tag]}</div>
                ))}
            </div>
            {/* Тайлбар */}
            <div className="flex flex-col gap-1">
              <div className="text-sm text-[#374151] pl-1">Тайлбар</div>
              <Input.TextArea
                rows={4}
                name="description"
                placeholder="Орц, найруулга гэх мэт тайлбарласан дэлгэрэнгүй мэдээллийг энд бичнэ."
                className="p-2 border rounded w-full"
              />
            </div>
            <Form.Item label="Файл оруулах" required className="mb-4">
              <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                  </p>
                  <p className="ant-upload-text">ФАЙЛ ОРУУЛАХ</p>
              </Dragger>
            </Form.Item>
          </div>

          <div className="flex justify-end items-center border-t h-[64px] px-6 bg-[#F0F2F5] rounded-b-xl">
            <button
              type="submit"
              className="bg-[#0A2D75] text-white flex justify-center items-center rounded w-[102px] h-9 hover:bg-blue-800 transition font-semibold gap-2">
              <img
                src="/image copy 5.png"
                className="w-[14px] h-4"
                alt="Бүртгэх"
              />
              <div className="text-sm font-medium">Бүртгэх</div>
            </button>
          </div>
        </Form>
      </div>

      <Toaster />
    </div>
  );
};

export default CreateProduct;
