"use client";

import { useState } from "react";
import { Table, Tag, Image, Checkbox } from "antd";
import type { TableProps } from "antd";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";

interface Features {
  isOpen24Hours: boolean;
  sellsAlcohol: boolean;
  sellsFastFood: boolean;
  sellsCigarettes: boolean;
  hasPowerBankRental: boolean;
}

interface Location {
  city: string;
  district: string;
  khoroo: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface Branch {
  id: string;
  name: string;
  status: string;
  imageUrl: string;
  weekdaysHours: string;
  weekendHours: string;
  features: Features;
  location: Location;
  createdAt: string;
}

interface BranchListProps {
  branches: Branch[];
}

const BranchList = ({ branches }: BranchListProps) => {
  const [filter, setFilter] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(true);

  // 🔄 Шүүлтүүрийн toggle функц
  const toggleFilter = () => setIsFilterVisible((prev) => !prev);

  // 🔍 Шүүлтүүр
  const filteredBranches = branches.filter((branch) => {
    const statusMatch =
      selectedStatus.length === 0 || selectedStatus.includes(branch.status);
    const nameMatch = branch.name.toLowerCase().includes(filter.toLowerCase());

    return statusMatch && nameMatch;
  });

  // ✅ Row сонголт
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  // 📋 Хүснэгтийн багана
  const columns: TableProps<Branch>["columns"] = [
    {
      title: "Зураг",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => (
        <Image
          src={imageUrl}
          alt="Branch Image"
          width={50}
          height={50}
          className="rounded-lg"
        />
      ),
    },
    {
      title: "Нэр",
      dataIndex: "name",
      key: "name",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "Хаяг",
      dataIndex: ["location", "address"],
      key: "address",
      render: (address) => <span>{address}</span>,
    },
    {
      title: "Цагийн хуваарь",
      dataIndex: "weekdaysHours",
      key: "weekdaysHours",
      render: (weekdaysHours) => <span>{weekdaysHours}</span>,
    },
    {
      title: "Үйлчилгээ",
      dataIndex: "features",
      key: "features",
      render: (features) => <span></span>,
    },
    {
      title: "Бүртгэгдсэн огноо",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      ),
    },
    {
      title: "Төлөв",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>
          {status === "ACTIVE" ? "Идэвхтэй" : "Хаагдсан"}
        </Tag>
      ),
    },
  ];

  return (
    <div className="flex bg-black gap-3">
      {/* {isFilterVisible && (
        <div className="w-72 p-4 border-r bg-gray-50 flex flex-col gap-4 transition-all">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Шүүлтүүр</h2>
            <button
              onClick={toggleFilter}
              className="text-gray-500 hover:text-gray-700">
              <IoCloseOutline className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Төлөв</h3>
            <Checkbox.Group
              className="flex flex-col gap-2"
              options={["ACTIVE", "INACTIVE"]}
              onChange={(values) => setSelectedStatus(values as string[])}
            />
          </div>
        </div>
      )} */}

      <div className="w-full h-[36px] bg-red-200">
        {/* <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="font-bold text-lg">Салбарын жагсаалт</div>

            <div className="text-sm text-gray-500 flex gap-2">
              Нийт:
              <div className="text-sm text-black">
                {filteredBranches.length}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="search"
              placeholder="Хайлт"
              className="rounded-xl h-[36px] border-2 border-gray-300 p-2"
              onChange={(e) => setFilter(e.target.value)}
            />
            <button
              onClick={toggleFilter}
              className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] rounded-xl border-2 border-gray-300 justify-center items-center gap-2 p-2">
              <FaFilter />
              Шүүлт
            </button>
            <button className="gap-2 h-[36px] flex items-center bg-[#0A2D75] rounded-xl text-white hover:bg-white hover:text-[#0A2D75] px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105">
              <IoAddOutline />
              Салбар бүртгэх
            </button>
          </div>
        </div> */}

        <Table
          columns={columns}
          dataSource={filteredBranches.map((branch) => ({
            ...branch,
            key: branch.id,
          }))}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
            showTotal: (total) => `Нийт ${total} салбар`,
          }}
          rowClassName={() =>
            "hover:bg-blue-50 transition-colors h-[60px] hover:bg-[#D1E9FF] !important"
          }
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default BranchList;
