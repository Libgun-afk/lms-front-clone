import {
  CREATE_PRODUCT_MUTATION,
  CREATE_TAG_MUTATION,
} from "@/graphql/mutation";
import request from "graphql-request";
import toast from "react-hot-toast";

interface CreateItemProps {
  endpoint: string;
  token: string;
  mutation: string;
  inputData: any;
  successMessage: string;
  errorMessage: string;
  toastSuccess: (message: string) => void;
  toastError: (message: string) => void;
}

const createItem = async ({
  endpoint,
  token,
  mutation,
  inputData,
  successMessage,
  errorMessage,
  toastSuccess,
  toastError,
}: CreateItemProps) => {
  try {
    const response = await request<{ createItem: any }>(
      endpoint,
      mutation,
      { inputData },
      { Authorization: token }
    );
    toastSuccess(successMessage);
    return response.createItem;
  } catch (error) {
    console.error("Алдаа:", error);
    toastError(errorMessage);
  }
};

// Usage example for creating a tag
const createTag = async (tagName: string) => {
  const endpoint =
    "http://loadbalancerlmscore-1401289988.ap-east-1.elb.amazonaws.com/backoffice";
  const token =
    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibnlhbWRvcmptYWlsQGdtYWlsLmNvbSIsInJvbGVzIjpbInByb2R1Y3QiLCJ0YWciLCJ1c2VyIl19.awN_PCBKrw-0rLDlL1EpjMY8OuD8crZD2h-x6gEGcek"; // Replace with your token

  const response = await createItem({
    endpoint,
    token,
    mutation: CREATE_TAG_MUTATION,
    inputData: { name: tagName, status: "ACTIVE" },
    successMessage: "Шинэ таг амжилттай нэмэгдлээ!",
    errorMessage: "Таг нэмэхэд алдаа гарлаа.",
    toastSuccess: toast.success,
    toastError: toast.error,
  });

  return response;
};
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

const createProduct = async (productData: Product) => {
  const endpoint =
    "http://loadbalancerlmscore-1401289988.ap-east-1.elb.amazonaws.com/backoffice";
  const token =
    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibnlhbWRvcmptYWlsQGdtYWlsLmNvbSIsInJvbGVzIjpbInByb2R1Y3QiLCJ0YWciLCJ1c2VyIl19.awN_PCBKrw-0rLDlL1EpjMY8OuD8crZD2h-x6gEGcek"; // Replace with your token

  const response = await createItem({
    endpoint,
    token,
    mutation: CREATE_PRODUCT_MUTATION,
    inputData: productData,
    successMessage: "Бүтээгдэхүүн амжилттай нэмэгдлээ!",
    errorMessage: "Бүтээгдэхүүн нэмэхэд алдаа гарлаа.",
    toastSuccess: toast.success,
    toastError: toast.error,
  });

  return response;
};
