"use client";

import { useState } from "react";
import { Table, Button, Tag, Checkbox } from "antd";
import type { TableProps } from "antd";
import { IoAddOutline } from "react-icons/io5";

interface Location {
  city: string;
  district: string;
  khoroo: string;
  address: string;
  latitude: string;
  longitude: string;
}

interface Features {
  isOpen24Hours: boolean;
  sellsAlcohol: boolean;
  sellsFastFood: boolean;
  sellsCigarettes: boolean;
  hasPowerBankRental: boolean;
}

interface Branch {
  id: number;
  name: string;
  status: string;
  imageUrl: string;
  weekdaysHours: string;
  weekendHours: string;
  features: Features;
  location: Location;
}

interface BranchListProps {
  branches: Branch[];
}

const BranchList = ({ branches }: BranchListProps) => {
  const [filter, setFilter] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string[]>([]);

  const filteredBranches = branches.filter((branch) => {
    const typeMatch =
      selectedType.length === 0 ||
      selectedType.includes(branch.location.district);
    const statusMatch =
      selectedStatus.length === 0 || selectedStatus.includes(branch.status);
    const regionMatch =
      selectedRegion.length === 0 ||
      selectedRegion.includes(branch.location.city);
    const nameMatch = branch.name.toLowerCase().includes(filter.toLowerCase());

    return typeMatch && statusMatch && regionMatch && nameMatch;
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: Branch[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: Branch) => ({
      disabled: record.status === "sda",
    }),
  };

  const columns: TableProps<Branch>["columns"] = [
    {
      title: "Утасны дугаар",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => <span className="">{phone}</span>,
    },
    {
      title: "Код",
      dataIndex: "code",
      key: "code",
      render: (code) => <span className="">{code}</span>,
    },
    {
      title: "Дэлгүүрийн нэр",
      dataIndex: "name",
      key: "name",
      render: (name) => <span className="">{name}</span>,
    },
    {
      title: "Бүс",
      dataIndex: ["location", "city"],
      key: "city",
      render: (city) => <span className="">{city}</span>,
    },
    {
      title: "Дэлгүүрийн төрөл",
      dataIndex: ["", ""],
      key: "district",
      render: (district) => <span className="">{district}</span>,
    },

    {
      title: "  Түрээс эсэх",
      dataIndex: ["true", "false"],
      key: "rent",
      render: (status) => (
        <Tag color={status === "Тийм" ? "green" : "gray"}>
          {status === "ACTIVE" ? "Тийм" : "Үгүй"}
        </Tag>
      ),
    },
    {
      title: "Сүүлд өөрчилсөн",
      dataIndex: ["true", "false"],
      key: "rent",
      render: (district) => <span className="">{district}</span>,
    },
    {
      title: "Төлөв",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "ACTIVE" ? "green" : "gray"}>
          {status === "ACTIVE" ? "Идэвхтэй" : "Хаасан"}
        </Tag>
      ),
    },
    {
      title: "Бүртгэсэн хэрэглэгч",
      dataIndex: "user",
      key: "user",
      render: (user) => <span className="">{user}</span>,
    },
  ];

  return (
    <div className="flex w-full gap-3">
      <div className="w-72 p-4 border-r bg-gray-50 flex flex-col gap-4">
        <h2 className="font-semibold">Шүүлтүүр</h2>

        {/* Төрөл */}
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Төрөл</h3>
          <Checkbox.Group
            className="flex flex-col gap-2"
            options={["Супермаркет", "Хөрш", "Экспресс", "Агуулах"]}
            onChange={(values) => setSelectedType(values as string[])}
          />
        </div>

        {/* Бүс */}
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Бүс</h3>
          <Checkbox.Group
            className="flex flex-col gap-2"
            options={["Баруун", "Зүүн", "Төв", "Орон нутаг"]}
            onChange={(values) => setSelectedRegion(values as string[])}
          />
        </div>

        {/* Тусгай зөвшөөрөл */}
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Тусгай зөвшөөрөл</h3>
          <Checkbox.Group
            className="flex flex-col gap-2"
            options={["Идэвхтэй", "Дууссан"]}
            onChange={(values) => setSelectedStatus(values as string[])}
          />
        </div>

        <button className="gap-2 flex justify-center items-center bg-[#3051A0] text-white p-2 pl-1 rounded-xl">
          <IoAddOutline className="w-[18px] h-[16px]" />
          Шүүх
        </button>
      </div>

      <div className="w-full">
        {/* Хайлт */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex justify-center items-center gap-3">
            <div className="font-bold text-lg">Салбарын жагсаалт</div>

            <div className="text-sm mt-1 text-[#A0AEC0] flex items-center gap-2">
              Нийт :<div className="text-black">{filteredBranches.length}</div>
            </div>
          </div>
          <button className="gap-2 flex  items-center bg-[#3051A0] text-white px-4 py-2 rounded-xl">
            <IoAddOutline className="w-[18px] h-[16px]" /> Салбар бүртгэх
          </button>
        </div>

        {/* Хүснэгт */}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredBranches.map((branch) => ({
            ...branch,
            key: branch.id,
          }))}
          rowClassName={() => "group hover:bg-[#D1E9FF] transition-colors"}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
          }}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default BranchList;
