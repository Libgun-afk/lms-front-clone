"use client";

import { useState, useEffect } from "react";
import { Table, TableProps, Tag } from "antd";
import FeedbackStatusForm from "./FeedBackStatusForm";
import { getCookie } from "cookies-next";
import { decodeToken } from "@/lib/tokenUtils";
import { useMutation } from "@apollo/client";
import { UPDATE_FEEDBACK_MUTATION } from "@/graphql/mutation";
import toast from "react-hot-toast";
import { fontWeight } from "html2canvas/dist/types/css/property-descriptors/font-weight";

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
  onRefresh?: () => Promise<void>;
}

const FeedBackList = ({ feedbacks, onRefresh }: Props) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number>(0);

  const [updateFeedback] = useMutation(UPDATE_FEEDBACK_MUTATION);

  useEffect(() => {
    const token = getCookie("userToken");
    if (token && typeof token === "string") {
      const decoded = decodeToken(token);
      if (decoded && decoded.empId) {
        setCurrentUserId(Number(decoded.empId));
      }
    }
  }, []);

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

  const handleStatusUpdate = async (feedbackId: number, status: string) => {
    try {
      await updateFeedback({
        variables: {
          feedbackId,
          resolveInput: {
            status,
            resolvedEmpId: currentUserId,
            priority: selectedFeedback?.priority || "NORMAL",
            resolutionComment: "",
          },
        },
      });
      toast.success("Статус амжилттай шинэчлэгдлээ");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Статус шинэчлэхэд алдаа гарлаа");
    }
  };

  const handleAssign = async (feedbackId: number, assigneeId: number) => {
    try {
      await updateFeedback({
        variables: {
          feedbackId,
          resolveInput: {
            status: "Хянагдаж байгаа",
            resolvedEmpId: assigneeId,
            priority: selectedFeedback?.priority || "NORMAL",
            resolutionComment: "",
          },
        },
      });
      toast.success("Ажилтан амжилттай сонгогдлоо");
    } catch (error) {
      console.error("Error assigning feedback:", error);
      toast.error("Ажилтан сонгоход алдаа гарлаа");
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (selectedFeedback) {
      try {
        await handleStatusUpdate(Number(selectedFeedback.id), newStatus);
        setSelectedFeedback((prev) =>
          prev ? { ...prev, status: newStatus } : null
        );
        if (onRefresh) {
          await onRefresh();
        }
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  };

  const handleAssigneeChange = async (assigneeId: string) => {
    if (selectedFeedback) {
      const numericAssigneeId = Number(assigneeId);
      if (!isNaN(numericAssigneeId)) {
        try {
          await handleAssign(Number(selectedFeedback.id), numericAssigneeId);
          setSelectedFeedback((prev) =>
            prev ? { ...prev, assignee: assigneeId } : null
          );
          if (onRefresh) {
            await onRefresh();
          }
        } catch (error) {
          console.error("Error updating assignee:", error);
        }
      }
    }
  };

  const getStatusDisplay = (feedback: Feedback) => {
    const isAssignee =
      currentUserId === parseInt(feedback.assignedEmp?.empId || "0");

    switch (feedback.status.toLowerCase()) {
      case "resolved":
      case "Шийдвэрлэсэн":
        return {
          text: "Шийдвэрлэсэн",
          style: {
            borderRadius: "16px",
            border: "1px solid #ECFDF3",
            color: "#039855",
            backgroundColor: "#ECFDF3",
            padding: "1px 8px",
          },
        };
      case "in_progress":
      case "Шийдвэрлэх":
        if (isAssignee) {
          return {
            text: "Шийдвэрлэх",
            style: {
              borderRadius: "8px",
              border: "",
              color: "#E24C1E",
              backgroundColor: "#FEF3F2",
              padding: "4px 8px",
            },
          };
        } else {
          return {
            text: "Хүлээгдэж байгаа",
            style: {
              border: "1px solid #F0F2F5",
              borderRadius: "16px",
              color: "#374151",
              backgroundColor: "#F0F2F5",
              padding: "1px 8px",
            },
          };
        }
      case "pending":
      case "Шийдвэрлэх":
        return {
          text: "Шийдвэрлэх",
          style: {
            borderRadius: "16px",
            border: "1px solid #FEF3F2",
            color: "#E24C1E",
            backgroundColor: "#FEF3F2",
            padding: "1px 8px",
          },
        };

      default:
        return {
          text: feedback.status,
          style: {
            borderRadius: "8px",
            color: "#374151",
            backgroundColor: "#F3F4F6",
            padding: "4px 8px",
          },
        };
    }
  };

  const columns: TableProps<Feedback>["columns"] = [
    {
      title: "Зураг",
      key: "image",
      align: "center",
      render: (_: any, record: Feedback) =>
        record.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={record.image.url} alt="feedback" width={50} />
          </>
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
      render: (_: any, record: Feedback) => {
        const statusDisplay = getStatusDisplay(record);
        return (
          <Tag style={statusDisplay.style} className="rounded-full">
            {statusDisplay.text}
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
        <span className="text-[#4F46E5] font-medium">
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
        <span className="text-[#039855] font-medium">
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
              onClick={() => onRefresh?.()}
              className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] rounded-xl w-9 border-2 border-gray-300 justify-center items-center gap-2 p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/image.png" alt="" className="w-4 h-4" />
            </button>
            <button className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] rounded-xl w-9 border-2 border-gray-300 justify-center items-center gap-2 p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}             
              <img src="/image copy.png" alt="" className="w-4 h-4" />
            </button>
            <button className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] w-9 rounded-xl border-2 border-gray-300 justify-center items-center gap-2 p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/image copy 2.png" alt="" className="w-[14px] h-4" />
            </button>
            <button
              onClick={printDiv}
              className="h-[36px] gap-2 flex items-center justify-center bg-white rounded-xl border px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/image copy 8.png" alt="" className="w-[14px] h-4" />
              Хэвлэх
            </button>
          </div>
        </div>

        <div className="h-full w-full py-4 px-4 flex">
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
                  id: parseInt(selectedFeedback.id),
                  status: selectedFeedback.status,
                  assignee: selectedFeedback.assignedEmp?.empId || "",
                  priority: selectedFeedback.priority || "NORMAL",
                }}
                handleStatusChange={handleStatusChange}
                handleAssigneeChange={handleAssigneeChange}
                handlePriorityChange={(value) => {
                  setSelectedFeedback((prev) =>
                    prev ? { ...prev, priority: value } : null
                  );
                }}
                handleSubmit={() => {}}
                onSuccess={() => {
                  if (onRefresh) onRefresh();
                }}
                currentUserId={currentUserId}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedBackList;
