import { Image, Table, TableProps, Tag } from "antd";
import { useState } from "react";
import CreateProduct from "./CreateProduct";
import ProductDetail from "./ProductDetail";

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

interface ProductListProps {
  products: Product[];
  onRefresh: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false); // Modal toggle
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Selected product

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailsVisible(true);
  };

  const [filter, setFilter] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(true);
  const toggleFilter = () => setIsFilterVisible((prev) => !prev);

  const toggleDetail = () => setIsDetailsVisible((prev) => !prev);

  const filteredProducts = products.filter((product) => {
    const tagMatch =
      selectedTags.length === 0 ||
      product.tags.some((tag) => selectedTags.includes(tag.name));
    const statusMatch =
      selectedStatus.length === 0 || selectedStatus.includes(product.status);
    const nameMatch = product.name.toLowerCase().includes(filter.toLowerCase());

    return tagMatch && statusMatch && nameMatch;
  });

  const printDiv = () => {
    const printFrame = (window.frames as any)["print_frame"];
    const printableElement = document.getElementById("printableTable");

    // Check if the element exists
    if (printableElement) {
      const printableContent = printableElement.innerHTML;
      printFrame.document.body.innerHTML = printableContent;
      printFrame.window.focus();
      printFrame.window.print();
    } else {
      console.error("Element with id 'printableTable' not found.");
    }
  };

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
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <Image
          src={images.length > 0 ? images[0]?.url : "0"}
          alt=""
          style={{ width: "40px", height: "40px" }} // Adjusted image size
        />
      ),
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
      dataIndex: "salePrice",
      key: "salePrice",
      render: (salePrice) => <span>{salePrice}₮</span>,
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
          {status === "ACTIVE" ? "Идэвхтэй" : "Идэвхгүй"}
        </Tag>
      ),
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
      render: (id) => <span>{id}</span>,
      width: 120,
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full rounded-xl bg-white">
      <iframe
        name="print_frame"
        style={{ display: "none" }}
        title="print_frame"
      />
      <div className="flex justify-between h-[60px] items-center border-b border-gray-200 px-4">
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
            onClick={() => onRefresh()}
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
          <button
            onClick={printDiv}
            className="h-[36px] gap-2 flex items-center justify-center bg-white rounded-xl border px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105">
            <img src="/image copy 8.png" alt="" className="w-[14px] h-4" />
            Хэвлэх
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleOpenModal}
              className="h-[36px] gap-2 flex items-center justify-center bg-[#3051A0] hover:bg-[#203974] rounded-xl text-white px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105">
              <img src="/image copy 3.png" alt="" className="w-[14px] h-4" />
              Бараа бүртгэх
            </button>

            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg z-50">
                  <CreateProduct
                    onClose={handleCloseModal}
                    onRefresh={onRefresh}
                    // products={products}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Table
        id="printableTable"
        columns={columns}
        dataSource={filteredProducts.map((product) => {
          return {
            ...product,
            key: product.id,
          };
        })}
        pagination={{
          pageSize: 8,
          showSizeChanger: false,
        }}
        className="w-full"
        rowClassName={() => "cursor-pointer"}
        onRow={(record) => ({
          onClick: () => handleProductClick(record),
        })}
      />
      {isDetailsVisible && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div className=" rounded shadow-lg z-50">
            <div className="flex justify-between rounded-t-xl items-center bg-[#F0F2F5] px-6 py-4 w-[600px] ">
              <h3 className="text-xl font-medium text-[#4B5563]">
                Барааны дэлгэрэнгүй
              </h3>
              <button
                onClick={() => setIsDetailsVisible(false)}
                className="text-gray-500 hover:text-gray-700">
                ✖
              </button>
            </div>

            <ProductDetail product={selectedProduct} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
