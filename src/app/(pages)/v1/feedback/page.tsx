import FeedBackList from "@/components/feedback/FeedBackList";
import { GET_PRODUCTS } from "@/graphql/queries";
import client from "@/lib/apollo-client";
import React from "react";

async function getProducts() {
  try {
    const { data } = await client.query({
      query: GET_PRODUCTS,
    });

    return data?.getProducts?.items || [];
  } catch (error) {
    console.error("Failed to fetch products:", (error as Error).message);
    return [];
  }
}

const Feedback = async () => {
  const products = await getProducts();
  return (
    <div className="flex p-4">
      <FeedBackList products={products} />
    </div>
  );
};

export default Feedback;
