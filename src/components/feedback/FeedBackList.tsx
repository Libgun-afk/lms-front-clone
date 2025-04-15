"use client";

import { useState } from "react";
import { Table, TableProps, Tag } from "antd";
import FeedbackStatusForm from "./FeedBackStatusForm";

interface Feedback {
  id: string;
  type: string;
  status: string;
  priority: string;
  date: string;
  title: string;
  description: string;
  user: {
    cumId: string;
    uuid: string;
    phoneNumber: string;
    loyaltyPercent: number;
    canSpendLoyalty: boolean;
    walletNumber: string;
    wallet: {
      walletNumber: string;
      balance: number;
      currency: string;
    };
    family: {
      id: string;
      members: {
        cumId: string;
        phoneNumber: string;
        firstName: string;
        lastName: string;
      }[];
    };
    detail: {
      lastName: string;
      firstName: string;
      birthDate: string;
      email: string;
      gender: string;
      kyc: boolean;
      status: string;
      phoneNumber: string;
      userId: string;
    };
    status: string;
    groups: {
      id: string;
      name: string;
    }[];
    createdAt: string;
  };
  image?: {
    uuid: string;
    originalName: string;
    url: string;
    mimetype: string;
  };
  resolutionComment?: string;
  resolvedDate?: string;
  resolvedEmp?: {
    empId: string;
    orgId: string;
    firstName: string;
    lastName: string;
  };
  assignedEmp?: {
    empId: string;
    orgId: string;
    firstName: string;
    lastName: string;
  };
  assignedAt?: string;
  assignerEmp?: {
    empId: string;
    orgId: string;
    firstName: string;
    lastName: string;
  };
}

interface Props {
  feedbacks: Feedback[];
}

const FeedBackList: React.FC<Props> = ({ feedbacks }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      selectedStatus.length === 0 || selectedStatus.includes(feedback.status)
  );

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

  const handleRowClick = (feedback: Feedback) => {
    if (selectedFeedback?.id === feedback.id) {
      setSelectedFeedback(null);
      setIsDetailsVisible(false);
    } else {
      setSelectedFeedback(feedback);
      setIsDetailsVisible(true);
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setSelectedFeedback((prev) =>
      prev ? { ...prev, status: newStatus } : null
    );
  };

  const onRefresh = () => {
    console.log("Refreshing...");
  };

  const columns: TableProps<Feedback>["columns"] = [
    {
      title: "Зураг",
      key: "image",
      align: "center",
      render: (_: any, record: Feedback) =>
        record.image ? (
          <img src={record.image.url} alt="feedback" width={50} />
        ) : (
          "-"
        ),
      width: 76,
    },
    {
      title: "Гарчиг",
      dataIndex: "title",
      key: "title",
      align: "center",

      render: (title: string) => <span>{title}</span>,
      width: 78,
    },
    {
      title: "Төрөл",
      dataIndex: "type",
      key: "type",
      align: "center",

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
      width: 100,
    },
    {
      title: "Дэлгэрэнгүй",
      dataIndex: "description",
      key: "description",
      align: "center",

      render: (description: string) => <span>{description}</span>,
      width: 254,
    },
    {
      title: "Ирсэн огноо",
      dataIndex: "date",
      key: "date",
      align: "center",

      render: (date: string) => (
        <span>{new Date(date).toLocaleDateString()}</span>
      ),
      width: 172,
    },
    {
      title: "Хэрэглэгч",
      key: "user",
      align: "center",
      render: (_: any, record: Feedback) => (
        <span>
          {record.user?.detail?.lastName} {record.user?.detail?.firstName}
        </span>
      ),
      width: 98,
    },
    {
      title: "Эрэмбэ",
      dataIndex: "priority",
      key: "priority",
      align: "center",

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
      align: "center",

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
      width: 156,
    },
    {
      title: "Хариуцсан ажилтан",
      key: "responsible",
      align: "center",

      render: (_: any, record: Feedback) => (
        <span>
          {record.assignedEmp
            ? `${record.assignedEmp.lastName} ${record.assignedEmp.firstName}`
            : "-"}
        </span>
      ),
      width: 108,
    },
    {
      title: "Шийдвэрлэсэн огноо",
      dataIndex: "resolvedAt",
      key: "resolvedAt",
      align: "center",

      render: (resolvedAt: string) => (
        <span>
          {resolvedAt ? new Date(resolvedAt).toLocaleDateString() : "-"}
        </span>
      ),
      width: 172,
    },
  ];

  return (
    <div className="relative flex gap-2 w-full">
      <div
        className={`transition-all duration-300 bg-white rounded-xl ${
          isDetailsVisible ? "w-full" : "w-full"
        }`}>
        <div className="flex justify-between h-[60px] items-center border-b border-gray-200 px-4 ">
          <div className="flex gap-6 items-center justify-center">
            <div className="font-bold text-lg">Санал хүсэлт</div>
            <div className="flex gap-2 text-sm text-gray-500">
              Нийт:
              <div className="text-black text-sm font-bold">
                {filteredFeedbacks.length}
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
              // onClick={toggleFilter}
              className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] rounded-xl w-9 border-2 border-gray-300 justify-center items-center gap-2 p-2">
              <img src="/image copy.png" alt="" className="w-4 h-4" />
            </button>
            <button
              // onClick={toggleFilter}
              className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] w-9 rounded-xl border-2 border-gray-300 justify-center items-center gap-2 p-2">
              <img src="/image copy 2.png" alt="" className="w-[14px] h-4" />
            </button>
            <button
              onClick={printDiv}
              className="h-[36px] gap-2 flex items-center justify-center bg-white rounded-xl border px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105">
              <img src="/image copy 8.png" alt="" className="w-[14px] h-4" />
              Хэвлэх
            </button>
          </div>
        </div>

        <div className=" py-4 px-4 flex">
          <Table
            id="printableTable"
            columns={columns}
            dataSource={feedbacks}
            rowKey="id"
            pagination={{ pageSize: 20 }}
            className="w-full"
            rowClassName={() => "h-[36px] cursor-pointer"}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        </div>
      </div>

      <div
        className={`transition-all duration-300  overflow-y-auto bg-white rounded-xl ${
          isDetailsVisible ? "w-[310px] opacity-100" : "w-0 opacity-0"
        }`}>
        {isDetailsVisible && selectedFeedback && (
          <div className="flex flex-col ">
            <div className="h-[60px] flex items-center px-4 gap-5 rounded-t-xl bg-white border-b-2 border-[#F0F2F5]">
              <img
                src={selectedFeedback.image?.url}
                alt="feedback"
                width={32}
                height={32}
              />
              <div className="text-[#374151] font-bold text-xl">
                {selectedFeedback.title}
              </div>
            </div>
            <div className=" flex flex-col bg-white ">
              <div className="flex flex-col px-4 py-4 gap-4">
                <div className="flex flex-col">
                  <div className="text-[#A0AEC0] font-medium text-sm">
                    Төрөл
                  </div>
                  <div
                    className={`text-sm font-bold ${
                      selectedFeedback.type === "Санал"
                        ? "text-[#039855] bg-[#ECFDF3]"
                        : selectedFeedback.type === "Гомдол"
                        ? "text-[#374151] bg-[#F0F2F5]"
                        : ""
                    }`}>
                    {selectedFeedback.type}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#A0AEC0] font-medium text-sm">
                    Хэрэглэгч
                  </div>
                  <div className="text-[#374151] font-bold text-sm">
                    {selectedFeedback.user?.detail?.lastName}{" "}
                    {selectedFeedback.user?.detail?.firstName}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#A0AEC0] font-medium text-sm">
                    Ирсэн огноо
                  </div>
                  <div className="text-[#374151] font-bold text-sm">
                    {new Date(selectedFeedback.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#A0AEC0] font-medium text-sm">
                    Гарчиг{" "}
                  </div>
                  <div className="text-[#374151] font-bold text-sm">
                    {selectedFeedback.title}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#A0AEC0] font-medium text-sm">
                    Дэлгэрэнгүй{" "}
                  </div>
                  <div className="text-[#374151] font-bold text-sm ">
                    {selectedFeedback.description}
                  </div>
                </div>
              </div>
              <FeedbackStatusForm
                selectedFeedback={{
                  status: "",
                  assignee: "",
                }}
                handleStatusChange={function (value: string): void {
                  throw new Error("Function not implemented.");
                }}
                handleAssigneeChange={function (value: string): void {
                  throw new Error("Function not implemented.");
                }}
                handleSubmit={function (action: string): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedBackList;
