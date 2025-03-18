import ProductList from "@/components/ProductList";
import { GET_PRODUCTS } from "@/graphql/queries";
import client from "@/lib/apollo-client";

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

export default async function ProductPage() {
  const products = await getProducts();

  return (
    <div className="dashboard-page">
      <ProductList products={products} />
    </div>
  );
}
