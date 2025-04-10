"use client";

import ProductList from "@/components/product/ProductList";
import { GET_PRODUCTS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const ProductPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("userToken");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS);
  const [products, setProducts] = useState([]);
  const [refreshLoading, setRefreshLoading] = useState(false);

  useEffect(() => {
    if (data?.getProducts?.items) {
      setProducts(data.getProducts.items);
    }
  }, [data]);

  const handleRefresh = async () => {
    try {
      setRefreshLoading(true);
      const result = await refetch();
      if (result?.data?.getProducts?.items) {
        setProducts(result.data.getProducts.items);
      }
    } catch (err) {
      console.error("Refresh error:", err);
    } finally {
      setRefreshLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center pt-96">
        <Spin
          className="flex justify-center items-center"
          indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
        />
      </div>
    );
  }

  if (error) {
    return (
      <p className="flex justify-center items-center text-red-500">
        Error: {error.message}
      </p>
    );
  }

  return (
    <div className="flex p-4 w-full">
      {refreshLoading ? (
        <div className="w-full flex justify-center pt-96">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        </div>
      ) : (
        <ProductList products={products} onRefresh={handleRefresh} />
      )}
    </div>
  );
};

export default ProductPage;
