"use client";

import { FormEvent, useState, useRef } from "react";
import { Table, Tag, Image, Checkbox } from "antd";
import type { TableProps } from "antd";
import { IoAddOutline } from "react-icons/io5";
import { useQuery } from "@apollo/client";
import { GET_BRANCHES } from "@/graphql/queries";
import LocationPage from "./BranchLocation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface Branch {
  id: string;
  name: string;
  status: string;
  imageUrl: string;
  type: string;
  region: string;
  weekdaysHours: string;
  weekendHours: string;
  location: Location;
  createdAt: string;
  features: {
    isOpen24Hours: boolean;
    sellsAlcohol: boolean;
    sellsFastFood: boolean;
    sellsCigarettes: boolean;
    hasPowerBankRental: boolean;
  };
}
export interface Location {
  city: string;
  district: string;
  khoroo: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface BranchListProps {
  branches: Branch[];
}

function BranchList() {
  const [activeTab, setActiveTab] = useState<string>("branch");
  const { data, loading, error } = useQuery(GET_BRANCHES);
  const [filter] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(true);
  const pdfRef = useRef<HTMLDivElement>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const branches = data?.getBranches?.items || [];

  const toggleFilter = () => setIsFilterVisible((prev) => !prev);

  const onRefresh = () => {
    window.location.reload();
  };

  const filteredBranches = branches.filter(
    (branch: { status: string; name: string }) => {
      const statusMatch =
        selectedStatus.length === 0 || selectedStatus.includes(branch.status);
      const nameMatch = branch.name
        .toLowerCase()
        .includes(filter.toLowerCase());
      return statusMatch && nameMatch;
    }
  );

  const printDiv = () => {
    const printFrame = (window.frames as any)["print_frame"];
    const printableElement = document.getElementById("printableTable");

    // Check if the element exists
    if (printableElement) {
      const printableContent = printableElement.innerHTML;
      printFrame.document.body.innerHTML = printableContent;
      printFrame.window.focus();
      printFrame.window.print();
    }
  };
  const handleSavePDF = async () => {
    const element = pdfRef.current;
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("document.pdf");
  };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  // };

  const columns: TableProps<(typeof branches)[0]>["columns"] = [
    {
      title: "Код",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Зураг",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => (
        <Image src={imageUrl} alt="Branch Image" width={50} height={50} />
      ),
    },
    {
      title: " Дэлгүүрийн Нэр",
      dataIndex: "name",
      key: "name",
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
    {
      title: "Бүс",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "Дэлгүүрийн төрөл",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Хаяг",
      dataIndex: ["location", "address"],
      key: "address",
    },

    {
      title: "Цагийн хуваарь",
      dataIndex: "weekdaysHours",
      key: "weekdaysHours",
    },
    {
      title: "Бүртгэгдсэн огноо",
      dataIndex: "weekendHours",
      key: "weekendHours",
    },
  ];

  function toggleDetail(): void {
    throw new Error("Function not implemented.");
  }

  function handleSubmit(_event: FormEvent<HTMLDivElement>): void {
    throw new Error("Function not implemented.");
  }

  function setSelectedRegion(_arg0: string[]): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex w-full gap-3 p-8" onSubmit={handleSubmit}>
      <iframe
        name="print_frame"
        style={{ display: "none" }}
        title="print_frame"
      />
      {isFilterVisible && (
        <div className="w-[300px] p-4 border-r bg-gray-50 flex flex-col gap-4  rounded-xl">
          <h2 className="font-semibold">Шүүлтүүр</h2>
          {/* Төрөл */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Дэлгүүрийн Нэр</h3>
            <Checkbox.Group
              className="flex flex-col gap-2"
              options={["M MART ЦАМБАГАРАВ САЛБАР", "M MART ЭЛЕГАНС /МОДНЫ 2/ САЛБАР", "M MART 22-Н ТОВЧОО САЛБАР", "M MART БАГШИЙН ДЭЭД САЛБАР"]}
              onChange={(values) => setSelectedStatus(values as string[])}
            />
          </div>
          {/* Бүс */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Бүс</h3>
            <Checkbox.Group
              className="flex flex-col gap-2"
              options={[
                "WESTERN",
                "CENTRAL",
                "EASTERN",
              ]}
              onChange={(values) => setSelectedRegion(values as string[])}
            />
          </div>
          {/* Тусгай зөвшөөрөл */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Дэлгүүрийн төрөл</h3>
            <Checkbox.Group
              className="flex flex-col gap-2"
              options={["SUPERMARKET", "NEIGHBOUR","EXPRESS"]}
              onChange={(values) => setSelectedStatus(values as string[])}
            />
          </div>

          <button className="gap-2 flex justify-center items-center bg-[#3051A0] text-white p-2 pl-1 rounded-xl">
            <IoAddOutline className="w-[18px] h-[16px]" />
            Шүүх
          </button>
        </div>
      )}
      <div className="flex flex-col gap-4 w-full rounded-xl bg-white  dark:bg-gray-700 p-4">
        <div className="flex justify-between  h-[60px] items-center border-b border-gray-200 px-4 ">
          <div className="flex gap-6 items-center justify-center">
            <div className="font-bold text-lg">Салбарын жагсаалт</div>
            <div className="flex gap-2 text-sm text-gray-500">
              Нийт:
              <div className="text-black text-sm font-bold">
                {filteredBranches.length}
              </div>
            </div>
          </div>
          <div className="relative grid grid-cols-2 bg-gray-100 dark:bg-gray-800 w-[400px] h-9 rounded-xl border border-gray-300 dark:border-gray-700 overflow-hidden">
            <div
              className={
                "absolute top-[2px] bottom-[2px] w-[calc(49%-3px)] bg-white dark:bg-gray-700 rounded-xl transition-transform duration-300 " +
                (activeTab === "supply"
                  ? "translate-x-[calc(100%+12px)]"
                  : "translate-x-[2px]")
              }
            />
            <button
              onClick={() => setActiveTab("branch")}
              className={`relative z-30 px-2 py-1.5  w-[200px] text-center flex justify-center pt-1 font-medium transition-all duration-300 rounded-xl ${
                activeTab === "branch"
                  ? "text-black"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
              }`}>
              Жагсаалтаар
            </button>
            <button
              onClick={() => setActiveTab("supply")}
              className={`relative z-10 px-2 py-1.5 w-[200px] text-center flex justify-center pt-1 font-medium transition-all duration-300 rounded-xl ${
                activeTab === "supply"
                  ? "text-black"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
              }`}>
              Газрын зургаар
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onRefresh()}
              className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] rounded-xl w-9 border-2 border-gray-300 justify-center items-center gap-2 p-2">
              <img src="/image.png" alt="" className="w-4 h-4" />
            </button>
            <button className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] rounded-xl w-9 border-2 border-gray-300 justify-center items-center gap-2 p-2">
              <img src="/image copy.png" alt="" className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFilter}
              className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] rounded-xl w-9 border-2 border-gray-300 justify-center items-center gap-2 p-2">
              <img src="/image copy 2.png" alt="" className="w-[14px] h-4" />
            </button>
            <div className="p-0.3">
              <div
                ref={pdfRef}
                className="border bg-white"
                id="printableContent"></div>
              <button
                onClick={handleSavePDF}
                className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] w-9 rounded-xl border-2 border-gray-300 justify-center items-center gap-2 p-2">
                <img src="/image copy 7.png" alt="" className="w-[14px] h-4" />
              </button>
            </div>
            <button
              onClick={printDiv}
              className="h-[36px] gap-2 flex items-center justify-center bg-white rounded-xl border px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105">
              <img src="/image copy 8.png" alt="" className="w-[14px] h-4" />
              Хэвлэх
            </button>
          </div>
        </div>
        <div id="printableTable" ref={pdfRef} className="bg-white p-2">
          {activeTab === "branch" ? (
            <Table
              id="printableTable"
              columns={columns}
              dataSource={filteredBranches.map(function (branch: { id: any; }) {
                return ({
                  ...branch,
                  key: branch.id,
                });
              })}
              pagination={{
                pageSize: 4,
                showSizeChanger: false,
              }}
              className="w-full"
              rowClassName={() => " cursor-pointer"}
              onRow={(record) => ({
                onClick: () => toggleDetail(),
              })}
              style={{
                overflowY: "hidden",
              }}
            />
          ) : (
            <LocationPage />
          )}
        </div>
      </div>
      {/* {isDetailsVisible && (
              <div className="w-64 p-4 rounded-xl bg-gray-50">
                <ProductDetails />
              </div>
            )} */}
    </div>
  );
}
export default BranchList;
