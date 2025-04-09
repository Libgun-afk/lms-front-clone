"use client";

import { useState } from "react";
import { Table, Tag } from "antd";

const feedbacks = [
  {
    id: "1",
    image: "/image copy 6.png",
    name: "Асуудал 1",
    type: "Санал",
    description: "Системийн гадаад холбоосууд ажиллахгүй байна.",
    createdAt: "2025-04-04T08:00:00Z",
    user: "Төмөр",
    priority: "Яаралтай",
    status: "Шийдвэрлэсэн",
    responsible: "Э.Цэцэг",
    resolvedAt: "2025-04-05T10:00:00Z",
  },
  {
    id: "2",
    image: "/image copy 6.png",
    name: "Асуудал 2",
    type: "Гомдол",
    description: "Бүтээгдэхүүний зураг алдаатай.",
    createdAt: "2025-04-03T10:00:00Z",
    user: "Жаргал",
    priority: "Энгийн",
    status: "Шийдвэрлэх",
    responsible: "Х.Даваа",
    resolvedAt: "2025-05-05T10:00:00Z",
  },
  {
    id: "3",
    image: "/image copy 6.png",
    name: "Асуудал 3",
    type: "Санал",
    description: "Бүтээгдэхүүний зураг алдаатай.",
    createdAt: "2025-04-03T10:00:00Z",
    user: "Жаргал",
    priority: "Энгийн",
    status: "Хүлээгдэж байгаа",
    responsible: "Х.Даваа",
    resolvedAt: "2025-04-11T10:00:00Z",
  },
  {
    id: "4",
    image: "/image copy 6.png",
    name: "Асуудал 3",
    type: "Санал",
    description: "Бүтээгдэхүүний зураг алдаатай.",
    createdAt: "2025-04-03T10:00:00Z",
    user: "Жаргал",
    priority: "Энгийн",
    status: "Хүлээгдэж байгаа",
    responsible: "Х.Даваа",
    resolvedAt: "2025-04-11T10:00:00Z",
  },
  {
    id: "7",
    image: "/image copy 6.png",
    name: "Асуудал 2",
    type: "Гомдол",
    description: "Бүтээгдэхүүний зураг алдаатай.",
    createdAt: "2025-04-03T10:00:00Z",
    user: "Жаргал",
    priority: "Энгийн",
    status: "Шийдвэрлэх",
    responsible: "Х.Даваа",
    resolvedAt: "2025-05-05T10:00:00Z",
  },
  {
    id: "5",
    image: "/image copy 6.png",
    name: "Асуудал 3",
    type: "Санал",
    description: "Бүтээгдэхүүний зураг алдаатай.",
    createdAt: "2025-04-03T10:00:00Z",
    user: "Жаргал",
    priority: "Энгийн",
    status: "Хүлээгдэж байгаа",
    responsible: "Х.Даваа",
    resolvedAt: "2025-04-11T10:00:00Z",
  },
  {
    id: "6",
    image: "/image copy 6.png",
    name: "Асуудал 3",
    type: "Санал",
    description: "Бүтээгдэхүүний зураг алдаатай.",
    createdAt: "2025-04-03T10:00:00Z",
    user: "Жаргал",
    priority: "Энгийн",
    status: "Хүлээгдэж байгаа",
    responsible: "Х.Даваа",
    resolvedAt: "2025-04-11T10:00:00Z",
  },
];

interface Feedback {
  id: string;
  image: string;
  name: string;
  type: string;
  description: string;
  createdAt: string;
  user: string;
  priority: string;
  status: string;
  responsible: string;
  resolvedAt: string | null;
}

interface FeedbackListProps {
  feedbacks: Feedback[];
}

const FeedBackList = ({ feedbacks }: FeedbackListProps) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );

  const handleRowClick = (feedback: Feedback) => {
    if (selectedFeedback?.id === feedback.id) {
      // If same feedback is clicked again, toggle off
      setSelectedFeedback(null);
      setIsDetailsVisible(false);
    } else {
      setSelectedFeedback(feedback);
      setIsDetailsVisible(true);
    }
  };

  const onRefresh = () => {
    console.log("Refreshing...");
  };

  const columns = [
    {
      title: "Зураг",
      dataIndex: "image",
      key: "image",
      render: (image: string) => <img src={image} alt="feedback" width={50} />,
      width: 120,
    },
    {
      title: "Гарчиг",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <span>{name}</span>,
      width: 180,
    },
    {
      title: "Төрөл",
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
      title: "Дэлгэрэнгүй",
      dataIndex: "description",
      key: "description",
      render: (description: string) => <span>{description}</span>,
      width: 200,
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
      title: "Хэрэглэгч",
      dataIndex: "user",
      key: "user",
      render: (user: string) => <span>{user}</span>,
      width: 100,
    },
    {
      title: "Эрэмбэ",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => {
        let priorityTextColor = "";
        let priorityBgColor = "";

        if (priority === "Яаралтай") {
          priorityTextColor = "#FAC515";
          priorityBgColor = "#FEFBE8";
        } else if (priority === "Энгийн") {
          priorityTextColor = "#374151";
          priorityBgColor = "#F0F2F5";
        }

        return (
          <span
            style={{
              color: priorityTextColor,
              backgroundColor: priorityBgColor,
              padding: "4px 8px",
              borderRadius: "8px",
            }}>
            {priority}
          </span>
        );
      },
      width: 100,
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
      title: "Хариуцсан ажилтан",
      dataIndex: "responsible",
      key: "responsible",
      render: (responsible: string) => <span>{responsible}</span>,
      width: 150,
    },
    {
      title: "Шийдвэрлэсэн огноо",
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
          <div className="font-bold text-lg">Санал хүсэлт</div>
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
        </div>
      </div>
      <div className="flex">
        <div
          className={`flex flex-col px-4 gap-4 rounded-xl bg-white transition-all duration-300 ${
            isDetailsVisible ? "w-[calc(100%-280px)]" : "w-full"
          }`}>
          <Table
            columns={columns}
            dataSource={feedbacks.map((feedback) => ({
              ...feedback,
              key: feedback.id,
            }))}
            pagination={{ pageSize: 7, showSizeChanger: false }}
            rowClassName={(record: Feedback) =>
              `cursor-pointer ${selectedFeedback?.id === record.id ? "" : ""}`
            }
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            className="w-full"
          />
        </div>

        {/* Right side Details */}
        {isDetailsVisible && selectedFeedback && (
          <div className="w-[280px] flex flex-col gap-5 p-4 rounded-xl bg-white shadow-md border border-gray-200">
            {/* Header хэсэг */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <img
                  src={selectedFeedback.user}
                  alt="icon"
                  className="w-6 h-6 "
                />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 truncate">
                {selectedFeedback.name}
              </h3>
            </div>

            {/* Төрөл ба төлөв */}
            <div className="mt-3 text-sm ">
              <p className="text-gray-500">Төрөл</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="font-medium text-[#374151] bg-[#F0F2F5] px-2 py-1 rounded-md inline-block">
                  {selectedFeedback.type}
                </p>
                <p className="font-medium text-[#FAC515] bg-[#FEFBE8] px-2 py-1 rounded-md inline-block">
                  {selectedFeedback.priority}
                </p>
              </div>
            </div>

            {/* Хэрэглэгч */}
            <div className="mt-3 text-sm">
              <p className="text-gray-500">Хэрэглэгч</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                  {selectedFeedback.user}
                </div>
                <p className="font-medium">{selectedFeedback.name}</p>
              </div>
            </div>

            {/* Огноо */}
            <div className="mt-3 text-sm">
              <p className="text-gray-500">Ирсэн огноо</p>
              <p className="font-medium">{selectedFeedback.createdAt}</p>
            </div>

            {/* Гарчиг */}
            <div className="mt-3 text-sm">
              <p className="text-gray-500">Гарчиг</p>
              <p className="font-medium">{selectedFeedback.name}</p>
            </div>

            {/* Дэлгэрэнгүй */}
            <div className="mt-3 text-sm">
              <p className="text-gray-500">Дэлгэрэнгүй</p>
              <p className="text-gray-700">{selectedFeedback.description}</p>
            </div>

            {/* Шийдэл хэсэг */}
            {selectedFeedback.status === "Шийдвэрлэсэн" && (
              <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 rounded-lg">
                <p className="text-green-700 font-medium">
                  Төлөв: {selectedFeedback.status}
                </p>
                <div className="mt-2 text-sm">
                  <p className="text-gray-500">Шийдвэрлэсэн ажилтан</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                      {selectedFeedback.responsible}
                    </div>
                    <p className="font-medium">
                      {selectedFeedback.responsible}
                    </p>
                  </div>
                  <p className="text-gray-500 mt-2">Шийдвэрлэсэн огноо</p>
                  <p className="font-medium">{selectedFeedback.resolvedAt}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return <FeedBackList feedbacks={feedbacks} />;
};

export default App;
