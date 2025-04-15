"use client";

import React, { useState } from "react";
import { Table } from "antd";
import SendNotification from "./SendNotification";

const notifications = [
  {
    id: "1",
    name: "Асуудал 1",
    type: "Санал",
    description:
      "Beautiful Products, online since 2005, is the UK's leading online store for beautiful home accessori",
    createdAt: "2025-04-04T08:00:00Z",
    user: "Төмөр",
    priority: "Яаралтай",
    numberReceived: "5",
    status: "Шийдвэрлэсэн",
    responsible: "Э.Цэцэг",
    resolvedAt: "2025-04-05T10:00:00Z",
  },
  {
    id: "2",
    name: "Асуудал 2",
    type: "Гомдол",
    description:
      "Beautiful Products, online since 2005, is the UK's leading online store for beautiful home accessori",
    createdAt: "2025-04-03T10:00:00Z",
    user: "Жаргал",
    priority: "Энгийн",
    numberReceived: "3",
    status: "Шийдвэрлэх",
    responsible: "Х.Даваа",
    resolvedAt: "2025-05-05T10:00:00Z",
  },
  {
    id: "3",
    name: "Асуудал 3",
    type: "Санал",
    description:
      "Beautiful Products, online since 2005, is the UK's leading online store for beautiful home accessori",
    createdAt: "2025-04-03T10:00:00Z",
    user: "Жаргал",
    priority: "Энгийн",
    numberReceived: "2",
    status: "Хүлээгдэж байгаа",
    responsible: "Х.Даваа",
    resolvedAt: "2025-04-11T10:00:00Z",
  },
  // Other notification objects here...
];

interface Notification {
  id: string;
  name: string;
  type: string;
  description: string;
  createdAt: string;
  user: string;
  priority: string;
  numberReceived: string;
  status: string;
  responsible: string;
  resolvedAt: string | null;
}

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList = ({ notifications }: NotificationListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const handleRowClick = (notification: Notification) => {
    if (selectedNotification?.id === notification.id) {
      setSelectedNotification(null);
    } else {
      setSelectedNotification(notification);
    }
  };

  const columns = [
    {
      title: "Гарчиг",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <span>{name}</span>,
      width: 180,
    },
    {
      title: "Дэлгэрэнгүй",
      dataIndex: "description",
      key: "description",
      render: (description: string) => <span>{description}</span>,
      width: 200,
    },
    {
      title: "Илгээсэн хэрэглэгчийн төрөл",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        let typeTextColor = "";
        let typeBgColor = "";

        if (type === "Санал") {
          typeTextColor = "#4CAF50";
          typeBgColor = "#E8F5E9";
        } else if (type === "Гомдол") {
          typeTextColor = "#374151";
          typeBgColor = "#F0F2F5";
        }

        return (
          <span
            style={{
              color: typeTextColor,
              backgroundColor: typeBgColor,
              padding: "4px 8px",
              borderRadius: "8px",
            }}>
            {type}
          </span>
        );
      },
      width: 120,
    },
    {
      title: "Ирсэн огноо",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      ),
      width: 150,
    },
    {
      title: "Хүлээн авсан тоо",
      dataIndex: "numberReceived",
      key: "numberReceived",
      render: (numberReceived: string) => <span>{numberReceived}</span>,
      width: 150,
    },
  ];

  return (
    <div className="flex flex-col bg-white rounded-xl gap-4 w-full">
      <div className="flex justify-between h-[60px] items-center border-b border-gray-200 px-4">
        <div className="flex gap-6 items-center justify-center">
          <div className="font-bold text-lg">Мэдэгдлийн түүх</div>
          <div className="flex gap-2 text-sm text-gray-500">
            Нийт:
            <div className="text-black text-sm font-bold"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            // onClick={() => onRefresh()}
            className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] rounded-xl w-9 border-2 border-gray-300 justify-center items-center gap-2 p-2">
            <img src="/image.png" alt="" className="w-4 h-4" />
          </button>
          <button className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] rounded-xl w-9 border-2 border-gray-300 justify-center items-center gap-2 p-2">
            <img src="/image copy.png" alt="" className="w-4 h-4" />
          </button>
          <button className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] w-9 rounded-xl border-2 border-gray-300 justify-center items-center gap-2 p-2">
            <img src="/image copy 2.png" alt="" className="w-[14px] h-4" />
          </button>
          <button className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] w-9 rounded-xl border-2 border-gray-300 justify-center items-center gap-2 p-2">
            <img src="/image copy 7.png" alt="" className="w-[14px] h-4" />
          </button>
          <div className="flex gap-2">
            <button className="h-[36px] gap-2 flex items-center justify-center bg-white rounded-xl border  px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105">
              <img src="/image copy 8.png" alt="" className="w-[14px] h-4" />
              Хэвлэх
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleOpenModal}
              className="h-[36px] gap-2 flex items-center justify-center bg-[#3051A0] hover:bg-[#203974] rounded-xl text-white px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105">
              <img src="/image copy 3.png" alt="" className="w-[14px] h-4" />
              Мэдэгдэл илгээх
            </button>

            {/* CreateProduct modal */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg z-50">
                  <SendNotification onClose={handleCloseModal} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between pr-4">
        <div
          className={`flex flex-col px-4 gap-4 rounded-xl bg-white transition-all duration-300 ${
            selectedNotification ? "w-[1420px]" : "w-full"
          }`}>
          <Table
            columns={columns}
            dataSource={notifications.map((notification) => ({
              ...notification,
              key: notification.id,
            }))}
            pagination={{ pageSize: 7, showSizeChanger: false }}
            rowClassName={() => `cursor-pointer`}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            style={{ width: "100%" }}
            className="w-full"
          />
        </div>
        {selectedNotification && (
          <div className="w-[280px] flex flex-col gap-5 p-4 rounded-xl bg-white shadow-md border border-gray-200 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg text-gray-800 truncate">
                {selectedNotification.name}
              </h3>
            </div>

            {/* Type and Priority */}
            <div className="mt-3 text-sm">
              <p className="text-gray-500">Төрөл</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="font-medium text-[#374151] bg-[#F0F2F5] px-2 py-1 rounded-md inline-block">
                  {selectedNotification.type}
                </p>
                <p className="font-medium text-[#FAC515] bg-[#FEFBE8] px-2 py-1 rounded-md inline-block">
                  {selectedNotification.priority}
                </p>
              </div>
            </div>

            {/* User */}
            <div className="mt-3 text-sm">
              <p className="text-gray-500">Хэрэглэгч</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                  {selectedNotification.user}
                </div>
                <p className="font-medium">{selectedNotification.user}</p>
              </div>
            </div>

            {/* Created At */}
            <div className="mt-3 text-sm">
              <p className="text-gray-500">Ирсэн огноо</p>
              <p className="font-medium">
                {new Date(selectedNotification.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Title */}
            <div className="mt-3 text-sm">
              <p className="text-gray-500">Гарчиг</p>
              <p className="font-medium">{selectedNotification.name}</p>
            </div>

            {/* Description */}
            <div className="mt-3 text-sm">
              <p className="text-gray-500">Дэлгэрэнгүй</p>
              <p className="text-gray-700">
                {selectedNotification.description}
              </p>
            </div>

            {/* Resolution */}
            {selectedNotification.status === "Шийдвэрлэсэн" && (
              <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 rounded-lg">
                <p className="text-green-700 font-medium">
                  Төлөв: {selectedNotification.status}
                </p>
                <div className="mt-2 text-sm">
                  <p className="text-gray-500">Шийдвэрлэсэн ажилтан</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                      {selectedNotification.responsible}
                    </div>
                    <p className="font-medium">
                      {selectedNotification.responsible}
                    </p>
                  </div>
                  <p className="text-gray-500 mt-2">Шийдвэрлэсэн огноо</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Notification = () => {
  return (
    <div className="flex w-full p-4">
      <NotificationList notifications={notifications} />
    </div>
  );
};

export default Notification;
