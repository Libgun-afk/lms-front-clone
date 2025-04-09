// import React, { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { CREATE_PRODUCT_MUTATION } from "@/graphql/mutation";
// import request from "graphql-request";
// import Tags from "./Tag";

// interface ProductData {
//   name: string;
//   status?: string;
//   code: string;
//   price: string | number;
//   tags: string[];
//   createdUserId?: number;
//   createdUserName?: string;
//   createdAt?: string;
//   updatedUserId?: number;
//   updatedUserName?: string;
//   updatedAt?: string;
//   images?: string[];
//   salePrice?: string | number;
//   salePercent?: number;
//   saleEnddate?: string;
//   description: string;
//   promotionProduct: { code: string; name: string };
//   promotionEnddate?: string;
// }

// const createProduct = async (productData: ProductData) => {
//   const endpoint =
//     "http://loadbalancerlmscore-1401289988.ap-east-1.elb.amazonaws.com/backoffice";
//   const token = "bearer YOUR_TOKEN";
//   try {
//     const response = await request<{ createProduct: ProductData }>(
//       endpoint,
//       CREATE_PRODUCT_MUTATION,
//       { createProductInput: productData },
//       { Authorization: token }
//     );
//     toast.success("Бүтээгдэхүүн амжилттай нэмэгдлээ!");
//     return response.createProduct;
//   } catch (error) {
//     console.error("Алдаа:", error);
//     toast.error("Бүтээгдэхүүн нэмэхэд алдаа гарлаа.");
//   }
// };

// const CreateProduct: React.FC<CreateProductProps> = ({
//   onClose,
//   onRefresh,
// }) => {
//   const [productData, setProductData] = useState<ProductData>({
//     name: "",
//     status: "",
//     code: "",
//     price: 0,
//     tags: [],
//     createdUserId: 0,
//     createdUserName: "",
//     createdAt: "",
//     updatedUserId: 0,
//     updatedUserName: "",
//     updatedAt: "",
//     images: [],
//     salePrice: 0,
//     salePercent: 0,
//     saleEnddate: "",
//     description: "",
//     promotionProduct: { code: "", name: "" },
//     promotionEnddate: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!productData.name.trim()) {
//       toast.error("Барааны нэр хоосон байна.");
//       return;
//     }
//     const result = await createProduct(productData);
//     if (result) {
//       onRefresh();
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-50 transition-all">
//       <div className="bg-white rounded-xl w-[550px] flex flex-col justify-between h-[600px]">
//         <div className="flex justify-between items-center border-b h-[64px] px-6 bg-[#F0F2F5] rounded-t-xl">
//           <h2 className="text-xl font-medium">Бараа бүртгэх</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700">
//             ✖
//           </button>
//         </div>

//         <form className="flex flex-col p-5 gap-5" onSubmit={handleSubmit}>
//           <Tags />
//         </form>
//         <div className="flex justify-end items-center border-b h-[64px] px-6 bg-[#F0F2F5] rounded-b-xl">
//           <button
//             onClick={handleSubmit}
//             type="button"
//             className="bg-[#0A2D75] text-white flex justify-center items-center rounded w-[102px] h-9 hover:bg- transition font-semibold gap-2">
//             <img
//               src="/image copy 5.png"
//               className="w-[14px] h-4"
//               alt="Бүртгэх"
//             />
//             <div className="text-sm font-medium">Бүртгэх</div>
//           </button>
//         </div>
//       </div>

//       <Toaster />
//     </div>
//   );
// };

// export default CreateProduct;

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CREATE_PRODUCT_MUTATION } from "@/graphql/mutation";
import request from "graphql-request";
import Tags from "./Tag";

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
  const endpoint =
    "http://loadbalancerlmscore-1401289988.ap-east-1.elb.amazonaws.com/backoffice";
  const token =
    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibnlhbWRvcmptYWlsQGdtYWlsLmNvbSIsInJvbGVzIjpbInByb2R1Y3QiLCJ0YWciLCJ1c2VyIl19.awN_PCBKrw-0rLDlL1EpjMY8OuD8crZD2h-x6gEGcek";
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

const CreateProduct: React.FC<CreateProductProps> = ({
  onClose,
  onRefresh,
}) => {
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    status: "",
    code: "",
    price: 0,
    tags: [],
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
  });

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

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
      <div className="bg-white rounded-xl w-[550px] flex flex-col justify-between h-[700px]">
        <div className="flex justify-between items-center border-b h-[64px] px-6 bg-[#F0F2F5] rounded-t-xl">
          <h2 className="text-xl font-medium">Бараа бүртгэх</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>

        <form className="flex flex-col h-[600px]" onSubmit={handleSubmit}>
          <Tags />
        </form>

        <div className="flex justify-end items-center border-t h-[64px] px-6 bg-[#F0F2F5] rounded-b-xl">
          <button
            onClick={handleSubmit}
            type="button"
            className="bg-[#0A2D75] text-white flex justify-center items-center rounded w-[102px] h-9 hover:bg-blue-800 transition font-semibold gap-2">
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
