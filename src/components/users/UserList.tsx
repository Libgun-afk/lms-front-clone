
"use client";

import React, { useState, useEffect } from "react";
import { Checkbox, DatePicker, Slider, Table, TableProps, Tag } from "antd";
import { useQuery, gql } from "@apollo/client";
import { IoAddOutline } from "react-icons/io5";
import UserProfileCard from "./UserProfileCard";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Define the GraphQL query
const GET_USERS = gql`
  query GetUsers {
    getUsers {
      pageNumber
      pageSize
      total
      items {
        cumId
        uuid
        phoneNumber
        loyaltyPercent
        canSpendLoyalty
        walletNumber
        wallet {
          walletNumber
          balance
          currency
        }
        family {
          id
          members {
            cumId
            phoneNumber
            firstName
            lastName
          }
        }
        detail {
          lastName
          firstName
          birthDate
          email
          gender
          kyc
          status
          phoneNumber
          userId
        }
        status
        groups {
          id
          name
        }
        createdAt
      }
    }
  }
`;

interface UsersListProps {
  users: any[];
}

const UsersList = () => {
  const { data, loading, error } = useQuery(GET_USERS);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [value, setValue] = useState<[number, number]>([0, 100]); 
  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<string>("users"); 
  const handleToggleFilter = () => setIsFilterVisible((prev) => !prev);
  const handleRowClick = (user: any) => {
    if (selectedUser?.uuid === user.uuid) {
      setSelectedUser(null);
      setIsDetailsVisible(false);
    } else {
      setSelectedUser(user);
      setIsDetailsVisible(true);
    }
  };

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
  const pdfRef = useRef<HTMLDivElement>(null);

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


  const columns: TableProps<any>['columns'] = [
    {
      title: "Утасны дугаар",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text: string) => <span>{text}</span>,
      width: 100,
    },
    {
      title: "Хэрэглэгч",
      dataIndex: "loyaltyPercent",
      key: "loyaltyPercent",
      render: (loyaltyPercent: string) => <span>{loyaltyPercent}</span>,
      width: 100,
    },
    {
      title: "Эцэг, эхийн нэр",
      dataIndex: "lastName",
      key: "lastName",
      render: (_, item) => <span>{item.detail?.firstName}</span>,
      width: 150,
    },
    {
      title: "Нэр",
      dataIndex: "firstName",
      key: "firstName",
      render: (_, item) => <span>{item.detail?.lastName}</span>,
      width: 150,
    },
    {
      title: "Урамшууллын оноо",
      dataIndex: "balance",
      key: "balance",
      render: (_, item) => <span>{Number(item.wallet?.balance)?.toLocaleString()}</span>,
      width: 150,
    },
    {
      title: "Төлөв",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let tagStyle = {};
        if (status === "Шийдвэрлэсэн") {
          tagStyle = {
            borderRadius: "8px",
            border: "1px solid #D1FAE5",
            color: "#039855",
            backgroundColor: "#ECFDF3",
          };
        } else if (status === "Шийдвэрлэх") {
          tagStyle = {
            borderRadius: "8px",
            border: "1px solid #FEE2E2",
            color: "#B91C1C",
            backgroundColor: "#FEF3F2",
          };
        } else if (status === "Хүлээгдэж байгаа") {
          tagStyle = {
            borderRadius: "8px",
            color: "black",
            backgroundColor: "#F0F2F5",
          };
        }

        return (
          <Tag style={tagStyle} className="rounded-full">
            {status}
          </Tag>
        );
      },
      width: 150,
    },
    {
      title: "Гэр бүл",
      dataIndex: "family",
      key: "family",
      render: (_, item) => <span>{item.family?.id}</span>,
      width: 150,
    },
    {
      title: "Байгууллага",
      dataIndex: "orgName",
      key: "orgName",
      render: (_, item) => <>{
        item.groups?.map((group:any, k: number) => (
          <span key={k}>{group?.name}</span>
        ))
      }</>,
      width: 150,
    },
    {
      title: "Бүртгүүлсэн огноо",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      ),
      width: 150,
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const users = data?.getUsers?.items || [];
  
  const onRefresh = () => {
    window.location.reload();
  };
  function handleAnotherToggleFilter(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }

  function setSelectedRegion(arg0: string[]): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col bg-white rounded-xl gap-4 w-full">
      <iframe
        name="print_frame"
        style={{ display: "none" }}
        title="print_frame"
      />
      <div className="flex justify-between h-[60px] items-center border-b border-gray-200 px-4">
        <div className="flex gap-6 items-center justify-center">
          <div className="font-bold text-lg">Хэрэглэгчийн жагсаалт</div>
          <div className="flex gap-2 text-sm text-gray-500">
            Нийт:8
            <div className="text-black text-sm font-bold"></div>
          </div>
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
             onClick={handleToggleFilter}
          className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] w-9 rounded-xl border-2 border-gray-300 justify-center items-center gap-2 p-2">
            <img src="/image copy 2.png" alt="" className="w-[14px] h-4" />
          </button>
          <div className="p-0.3">
              <div
                 ref={pdfRef}
                 className="border bg-white  max-w-md"
                 id="printableContent"
                >
              </div>
              <button
                onClick={handleSavePDF}
                className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] w-9 rounded-xl border-2 border-gray-300 justify-center items-center gap-2 p-2"
              > 
                <img src="/image copy 7.png" alt="" className="w-[14px] h-4" />
              </button>
           </div>
          <div className="flex gap-2">
          <button
            onClick={printDiv}
            className="h-[36px] gap-2 flex items-center justify-center bg-white rounded-xl border px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105">
            <img src="/image copy 8.png" alt="" className="w-[14px] h-4" />
            Хэвлэх
          </button>
            <button  
            onClick={handleToggleFilter}
            className="h-[36px] gap-2 flex items-center justify-center bg-white rounded-xl border  px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105">
              <img src="/image copy 8.png" alt="" className="w-[14px] h-4" />
              Оноо хасах
            </button>
            <button className="h-[36px] gap-2 flex items-center justify-center bg-white rounded-xl border  px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105">
              <img src="/image copy 3.png" alt="" className="w-[14px] h-4" />
              Оноо нэмэх
            </button>
          </div>
        </div>
      </div>
      <div className="flex">
      {isFilterVisible && (
        <div className=" w-[300px] p-4 border-r bg-gray-50 flex flex-col gap-4  rounded-xl">
          <h2 className="font-semibold">Шүүлтүүр</h2>
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Урамшууллын оноо</h3>
            <Slider
              range={{ editable: true, minCount: 1, maxCount: 5 }}
              value={value}
              onChange={(value: number | number[]) => setValue(value as [number, number])}
            />
          </div>
             <div className="flex flex-col gap-2">
               <h3 className="font-medium">Төлөв</h3>
               <Checkbox.Group
                className="flex flex-col gap-2"
                options={["Идэвхтэй", "Идэвхгүй"]}
                onChange={(values) => setSelectedUser(values as string[])}
                 />
            </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Гэр бүл</h3>
          <Checkbox.Group
            className="flex flex-col gap-2"
            options={["ID байгаа", "ID байхгүй"]}
            onChange={(values) => setSelectedRegion(values as string[])}
          />
        </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Хүйс</h3>
            <Checkbox.Group
              className="flex flex-col gap-2"
              options={["Эрэгтэй", "Эмэгтэй"]}
              onChange={(values: string[]) => setSelectedUser(values as string[])}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Бүртгүүлсэн огноо</h3>
            <DatePicker
              onChange={(date, dateString) =>
                setSelectedUser(
                  typeof dateString === "string" ? [dateString] : []
                )
              }
            />
            <DatePicker
              onChange={(date, dateString) =>
                setSelectedUser(
                  typeof dateString === "string" ? [dateString] : []
                )
              }
            />
            <Checkbox.Group
              className="flex flex-col gap-2"
              onChange={(values) => setSelectedUser(values as string[])}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Байгууллага</h3>
            <Checkbox.Group
              className="flex flex-col gap-2"
              options={["Байгууллагатай", "Байгууллагагүй"]}
              onChange={(values) => setSelectedUser(values as string[])}
            />
          </div>

          <button className="gap-2 flex justify-center items-center bg-[#3051A0] text-white p-2 pl-1 rounded-xl">
            <IoAddOutline className="w-[18px] h-[16px]" />
            Шүүхх
          </button>
        </div>
      )}
      <div
        className={`flex flex-col px-4 gap-4 rounded-xl bg-white transition-all duration-300 ${
          isDetailsVisible ? "w-[calc(100%-280px)]" : "w-full"
        }`}
      >
         <div id="printableTable" ref={pdfRef} className="bg-white p-2">
         <Table
          id="printableTable"
          columns={columns}
          dataSource={users.map((user: any) => ({
            ...user,
            key: user.uuid,
          }))}
          pagination={{ pageSize: 8, showSizeChanger: false }}
          rowClassName={(record: any) =>
            `cursor-pointer ${selectedUser?.uuid === record.uuid ? "" : ""}`
          }
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          className="w-full"
        />
         </div>
      </div>
        {/* Right side Details */}
        {isDetailsVisible && selectedUser && (
          <div className="w-[400px] flex flex-col gap-5 p-4 rounded-xl bg-white shadow-md border border-gray-200">
            {/* Header хэсэг */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <img
                  src={selectedUser?.phoneNumber || ""}
                  alt="icon"
                  className="w-6 h-6 "
                />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 truncate">
                {selectedUser?.phoneNumber}
              </h3>
              <h3 className="font-semibold text-lg text-gray-800 truncate">
                {selectedUser?.points}
              </h3>
            </div>
            {/* Төрөл ба төлөв */}
            <div className="relative grid grid-cols-2 bg-gray-100 dark:bg-gray-800 w-[350px] h-9 rounded-xl border border-gray-300 dark:border-gray-700 overflow-hidden">
         <div
            className={
              "absolute top-[2px] bottom-[2px] w-[calc(49%-3px)] bg-white dark:bg-gray-700 rounded-xl transition-transform duration-300 " +
              (activeTab === "supply"
                ? "translate-x-[calc(100%+12px)]"
                : "translate-x-[2px]")
            }
          />
          <div>
              <button
               onClick={() => setActiveTab("users")}
                className={`relative z-30 px-2 py-1.5 w-[200px] text-center flex justify-center pt-1 font-medium transition-all duration-300 rounded-xl ${
                activeTab === "users"
                ? "text-black"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
               }`}
             >
                 Хувийн мэдээлэл
              </button>

              {/* Бусад таб товчнууд */}

               <div className="mt-4">
                 {activeTab === "users" && <UserProfileCard />}
                 {/* өөр табуудын компонентууд */}
                 </div>
           </div>
          <button
            onClick={() => setActiveTab("supply")}
            className={`relative z-10 px-2 py-1.5 w-[200px] text-center flex justify-center pt-1 font-medium transition-all duration-300 rounded-xl ${
              activeTab === "supply"
                ? "text-black"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
            }`}
          >
            Онооны түүх
          </button>
        </div>
       </div>
        )}
     </div>
    </div>
  );
};

export default UsersList;
