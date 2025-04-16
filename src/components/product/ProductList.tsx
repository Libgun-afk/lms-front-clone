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
  tagList: Tag[];
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onRefresh,
  tagList,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  console.log(tagList);

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
      align: "center",
      render: (code) => <span>{code}</span>,
      width: 104,
    },

    {
      title: "Зураг",
      dataIndex: "images",
      key: "images",
      align: "center",
      render: (images) =>
        images.length > 0 ? (
          <Image
            src={images[0]?.url}
            alt="Зураг"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
            preview={false}
          />
        ) : (
          <div className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-500 text-xs rounded">
            —
          </div>
        ),
      width: 60,
    },
    {
      title: "Барааны нэр",
      dataIndex: "name",
      key: "name",
      align: "center",

      render: (name) => <span>{name}</span>,
      width: 278,
    },
    {
      title: "Дагалдах бэлэг",
      dataIndex: "promotionProduct",
      key: "promotionProduct",
      align: "center",

      render: (promotionProduct) => <span>{promotionProduct?.name || "-"}</span>,
      width: 90,
    },
    {
      title: "Тайлбар",
      dataIndex: "description",
      key: "description",
      align: "center",

      render: (description) => <span>{description || "-"}</span>,
      width: 338,
    },
    {
      title: "Үндсэн үнэ",
      dataIndex: "price",
      key: "price",
      align: "center",

      render: (price) => <span>{price}₮</span>,
      width: 104,
    },
    {
      title: "Хямдарсан үнэ",
      dataIndex: "salePrice",
      key: "salePrice",
      align: "center",

      render: (salePrice) => <span>{salePrice}₮</span>,
      width: 104,
    },

    {
      title: "Төлөв",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        let bgColor = "bg-gray-200 text-gray-800";

        switch (status) {
          case "ACTIVE":
            bgColor = "bg-[#ECFDF3] text-[#039855]";
            break;
          case "INACTIVE":
            bgColor = "bg-[#F0F2F5] text-[#374151]";
            break;
        }

        return (
          <span className={`text-sm px-2 py-0 rounded-xl ${bgColor}`}>
            {status === "ACTIVE" ? "Идэвхтэй" : "Идэвхгүй"}
          </span>
        );
      },
      width: 120,
    },

    {
      title: "Төрөл",
      dataIndex: "tags",
      key: "tags",
      align: "center",

      render: (tags: Tag[]) => (
        <div className="flex justify-center gap-1">
          {tags.map((tag, index) => {
            let bgColor = "bg-gray-200 text-gray-800";

            switch (tag.name) {
              case "Хямдарсан":
                bgColor = "bg-[#FEFBE8] text-[#FAC515]";
                break;
              case "Шинэ":
                bgColor = "bg-[#ECFDF3] text-[#039855]";
                break;
              case "Онцлох":
              case "Нэрийн":
              case "Урамшуулалтай":
                bgColor = "bg-[#F0F2F5] text-[#374151]";
                break;
            }

            return (
              <span
                key={tag.id ?? index}
                className={`text-sm px-2 py-0 rounded-xl ${bgColor}`}>
                {tag.name}
              </span>
            );
          })}
        </div>
      ),
      width: 220,
    },
    {
      title: "Сүүлд өөрчилсөн огноо",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      render: (updatedAt) => (
        <span>{new Date(updatedAt).toLocaleDateString()}</span>
      ),
      width: 150,
    },
    {
      title: "Өөрчилсөн хэрэглэгч",
      dataIndex: "updatedUserId",
      key: "updatedUserId",
      align: "center",

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
                    // onRefresh={onRefresh}
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
          pageSize: 12,
          showSizeChanger: false,
        }}
        className="w-full px-4"
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
