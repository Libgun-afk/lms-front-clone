import { Image } from "antd";

interface Product {
  id: string;
  name: string;
  status: string;
  code: string;
  price: number;
  // tags: { id: string; name: string }[];
  description: string;
  promotionProduct: { code: string; name: string };
  images: { url: string }[];
  salePrice: number;
  salePercent: number;
  saleEnddate: string;
  minAge: number;
  createdUserId: string;
  createdAt: string;
  updatedUserId: string;
  updatedAt: string;
}

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="px-6 py-4 flex flex-col gap-5 bg-white rounded-b-xl shadow-md w-[600px]">
      {/* Product Name */}
      <div className=" bg-white rounded-xl py-4">
        <div className="grid grid-cols-2 gap-6 ">
          {/* Product Name */}
          <div className="flex flex-col gap-1">
            <span className=" text-[#374151]">Барааны нэр:</span>
            <span className="bg-[#F7F9FA] rounded border h-9 flex items-center justify-center text-[#374151]">
              {product.name}
            </span>
          </div>

          {/* Product Description */}
          <div className="flex flex-col gap-1">
            <span className="text-[#374151]">Тайлбар:</span>
            <span className="bg-[#F7F9FA] rounded border h-9 flex items-center justify-center text-[#374151]">
              {product.description || "Тайлбар байхгүй"}
            </span>
          </div>

          {/* Price */}
          <div className="flex flex-col text-[#374151]">
            <span className="text-[#374151]">Үндсэн үнэ:</span>
            <span className="bg-[#F7F9FA] rounded border h-9 flex items-center justify-center text-[#374151]">
              {product.price}₮
            </span>
          </div>

          {/* Sale Price */}
          <div className="flex flex-col">
            <span className="text-[#374151]">Хямдарсан үнэ:</span>
            <span className="bg-[#F7F9FA] rounded border h-9 flex items-center justify-center text-[#374151]">
              {product.salePrice}₮
            </span>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <span className="text-[#374151]">Төлөв:</span>
            <span className="bg-[#F7F9FA] rounded border h-9 flex items-center justify-center text-[#374151]">
              {product.status === "ACTIVE" ? "Идэвхтэй" : "Идэвхгүй"}
            </span>
          </div>

          {/* Promo Product */}
          <div className="flex flex-col">
            <span className="text-[#374151]">Дагалдах бүтээгдэхүүн:</span>
            <span className="bg-[#F7F9FA] rounded border h-9 flex items-center justify-center text-[#374151]">
              {product.promotionProduct?.name || "no data"}
            </span>
          </div>

          {/* Sale End Date */}
          <div className="flex flex-col">
            <span className="text-[#374151]">Хямдрал дуусах огноо:</span>
            <span className="bg-[#F7F9FA] rounded border h-9 flex items-center justify-center text-[#374151]">
              {product.saleEnddate || "Хамрахгүй"}
            </span>
          </div>

          {/* Updated At */}
          <div className="flex flex-col">
            <span className="text-[#374151]">Сүүлд өөрчилсөн:</span>
            <span className="bg-[#F7F9FA] rounded border h-9 flex items-center justify-center text-[#374151]">
              {new Date(product.updatedAt).toLocaleDateString()}
            </span>
          </div>

          {/* Created At */}
          <div className="flex flex-col">
            <span className="text-[#374151]">Бүртгэсэн огноо:</span>
            <span className="bg-[#F7F9FA] rounded border h-9 flex items-center justify-center text-[#374151]">
              {new Date(product.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#374151]">Зураг:</span>
            <div className="flex gap-2">
              {product.images.map((image, idx) => (
                <Image
                  key={idx}
                  src={image.url}
                  alt={`Product Image ${idx}`}
                  style={{ width: "180px", height: "80px", objectFit: "cover" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
