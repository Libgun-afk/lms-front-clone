"use client";

import { useState } from "react";
import { Checkbox, DatePicker, Slider, Table, Tag } from "antd";
import { IoAddOutline } from "react-icons/io5";
import UserProfileCard from "./UserProfileCard";

// const userss = [
//   {
//     id: "1",
//     createdAt: "2025-04-04T08:00:00Z",
//     priority: "Яаралтай",
//     status: "Шийдвэрлэсэн",
//     responsible: "Э.Цэцэг",
//     resolvedAt: "2025-04-05T10:00:00Z",
//     phoneNumber: "123456789",
//     username: "user1",
//     parentName: "Даваа",
//     firstName: "Номин-Эрдэнэ",
//     points: "20,000",
//     family: "22739",
//     organization: "Tech - Technologies Co.",
//     description: "This is a description for users 1",
//     user: "User1",
//   },
//   {
//     id: "2",
//     createdAt: "2025-04-03T10:00:00Z",
//     priority: "Энгийн",
//     status: "Шийдвэрлэх",
//     responsible: "Х.Даваа",
//     resolvedAt: "2025-05-05T10:00:00Z",
//     phoneNumber: "987654321",
//     username: "user2",
//     parentName: "Анужин",
//     firstName: "Батсайхан",
//     points: "20,000",
//     family: "22739",
//     organization: "UKco - United Kingdom Co.",
//     description: "This is a description for users 2",
//     user: "User2",
//   },
//   {
//     id: "3",
//     createdAt: "2025-04-03T10:00:00Z",
//     priority: "Энгийн",
//     status: "Шийдвэрлэх",
//     responsible: "Х.Даваа",
//     resolvedAt: "2025-05-05T10:00:00Z",
//     phoneNumber: "987654321",
//     username: "user2",
//     parentName: "Анужин",
//     firstName: "Батсайхан",
//     points: "20,000",
//     family: "22739",
//     organization: "UKco - United Kingdom Co.",
//     description: "This is a description for users 2",
//     user: "User2",
//   },
//   {
//     id: "4",
//     createdAt: "2025-04-03T10:00:00Z",
//     priority: "Энгийн",
//     status: "Шийдвэрлэх",
//     responsible: "Х.Даваа",
//     resolvedAt: "2025-05-05T10:00:00Z",
//     phoneNumber: "987654321",
//     username: "user2",
//     parentName: "Анужин",
//     firstName: "Батсайхан",
//     points: "20,000",
//     family: "22739",
//     organization: "UKco - United Kingdom Co.",
//     description: "This is a description for users 2",
//     user: "User2",
//   },
//   {
//     id: "5",
//     createdAt: "2025-04-03T10:00:00Z",
//     priority: "Энгийн",
//     status: "Шийдвэрлэх",
//     responsible: "Х.Даваа",
//     resolvedAt: "2025-05-05T10:00:00Z",
//     phoneNumber: "987654321",
//     username: "user2",
//     parentName: "Анужин",
//     firstName: "Батсайхан",
//     points: "20,000",
//     family: "22739",
//     organization: "UKco - United Kingdom Co.",
//     description: "This is a description for users 2",
//     user: "User2",
//   },
// ];

 export interface users {
  id: string;
  phoneNumber: string;
  username: string;
  parentName: string;
  firstName: string;
  points: string;
  family: string;
  organization: string;
  description: string;
  createdAt: string;
  user: string;
  priority: string;
  status: string;
  responsible: string;
  resolvedAt: string | null;
}

export interface UsersListProps {
  users: users[];
}

const UsersList = ({ users }: UsersListProps) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);
  const [selectedusers, setSelectedUsers] = useState<users | null>(
    null
  );
  const [value, setValue] = useState<number[]>([1, 5]); // Initialize value with a default range
  const [activeTab, setActiveTab] = useState<string>("branch"); // Initialize activeTab with a default value
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(true);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string[]>([]);
  const toggleFilter = () => setIsFilterVisible((prev) => !prev);
  const handleRowClick = (users: users) => {
    if (selectedusers?.id === users.id) {
      // If same users is clicked again, toggle off
      setSelectedUsers(null);
      setIsDetailsVisible(false);
    } else {
      setSelectedUsers(users);
      setIsDetailsVisible(true);
    }
  };

  const onRefresh = () => {
    console.log("Refreshing...");
  };

  const columns = [
    {
      title: "Утасны дугаар",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (user: string) => <span>{user}</span>,
      width: 100,
    },
    {
      title: "Хэрэглэгч",
      dataIndex: "username",
      key: "username",
      render: (user: string) => <span>{user}</span>,
      width: 100,
    },
    {
      title: "Эцэг, эхийн нэр",
      dataIndex: "parentName",
      key: "parentName",
      render: (responsible: string) => <span>{responsible}</span>,
      width: 150,
    },
    {
      title: "Нэр",
      dataIndex: "firstName",
      key: "firstName",
      render: (responsible: string) => <span>{responsible}</span>,
      width: 150,
    },
    {
      title: "Урамшууллын оноо",
      dataIndex: "points",
      key: "points",
      render: (points: string) => <span>{points}</span>,
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
      render: (family: string) => <span>{family}</span>,
      width: 150,
    },
    {
      title: "Байгууллага",
      dataIndex: "organization",
      key: "organization",
      render: (organization: string) => <span>{organization}</span>,
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
    {
      title: "Сүүлд нэвтэрсэн",
      dataIndex: "resolvedAt",
      key: "resolvedAt",
      render: (resolvedAt: string) => (
        <span>
          {resolvedAt ? new Date(resolvedAt).toLocaleDateString() : "-"}
        </span>
      ),
      width: 150,
    },
  ];
  
  return (
    <div className="flex flex-col bg-white rounded-xl gap-4 w-full">
      <div className="flex justify-between h-[60px] items-center border-b border-gray-200 px-4">
        <div className="flex gap-6 items-center justify-center">
          <div className="font-bold text-lg">Хэрэглэгчийн жагсаалт</div>
          <div className="flex gap-2 text-sm text-gray-500">
            Нийт:
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
             onClick={toggleFilter}
          className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] w-9 rounded-xl border-2 border-gray-300 justify-center items-center gap-2 p-2">
            <img src="/image copy 2.png" alt="" className="w-[14px] h-4" />
          </button>
          {/* <button className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] w-9 rounded-xl border-2 border-gray-300 justify-center items-center gap-2 p-2">
            <img src="/image copy 7.png" alt="" className="w-[14px] h-4" />
          </button> */}
          <div className="flex gap-2">
            <button className="h-[36px] gap-2 flex items-center justify-center bg-white rounded-xl border  px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105">
              <img src="/image copy 3.png" alt="" className="w-[14px] h-4" />
              Хэвлэх
            </button>
            <button  
            onClick={toggleFilter}
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
              onChange={setValue}
            />
          </div>
             <div className="flex flex-col gap-2">
               <h3 className="font-medium">Төлөв</h3>
               <Checkbox.Group
                className="flex flex-col gap-2"
                options={["Идэвхтэй", "Идэвхгүй"]}
                onChange={(values) => setSelectedStatus(values as string[])}
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
              onChange={(values: string[]) => setSelectedStatus(values as string[])}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Бүртгүүлсэн огноо</h3>
            <DatePicker
              onChange={(date, dateString) =>
                setSelectedStatus(
                  typeof dateString === "string" ? [dateString] : []
                )
              }
            />
            <DatePicker
              onChange={(date, dateString) =>
                setSelectedStatus(
                  typeof dateString === "string" ? [dateString] : []
                )
              }
            />
            <Checkbox.Group
              className="flex flex-col gap-2"
              onChange={(values) => setSelectedStatus(values as string[])}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Байгууллага</h3>
            <Checkbox.Group
              className="flex flex-col gap-2"
              options={["Байгууллагатай", "Байгууллагагүй"]}
              onChange={(values) => setSelectedStatus(values as string[])}
            />
          </div>

          <button className="gap-2 flex justify-center items-center bg-[#3051A0] text-white p-2 pl-1 rounded-xl">
            <IoAddOutline className="w-[18px] h-[16px]" />
            Шүүх
          </button>
        </div>
      )}
        <div
          className={`flex flex-col px-4 gap-4 rounded-xl bg-white transition-all duration-300 ${
            isDetailsVisible ? "w-[calc(100%-280px)]" : "w-full"
          }`}>
          <Table
            columns={columns}
            dataSource={users.map((users) => ({
              ...users,
              key: users.id,
            }))}
            pagination={{ pageSize: 7, showSizeChanger: false }}
            rowClassName={(record: users) =>
              `cursor-pointer ${selectedusers?.id === record.id ? "" : ""}`
            }
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            className="w-full"
          />
        </div>
        {/* Right side Details */}
        {isDetailsVisible && selectedusers && (
          <div className="w-[400px] flex flex-col gap-5 p-4 rounded-xl bg-white shadow-md border border-gray-200">
            {/* Header хэсэг */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <img
                  src={selectedusers?.user || ""}
                  alt="icon"
                  className="w-6 h-6 "
                />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 truncate">
                {selectedusers?.parentName}
              </h3>
              <h3 className="font-semibold text-lg text-gray-800 truncate">
                {selectedusers?.points}
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

const App = () => {
  return 
  <UsersList
    users={[]} // Pass an empty array or a valid users array
  //  userss={userss}
   />;
};

export default App;

function setIsFilterVisible(arg0: (prev: any) => boolean) {
  throw new Error("Function not implemented.");
}
