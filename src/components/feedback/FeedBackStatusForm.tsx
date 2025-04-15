import { Select, Input } from "antd";
import React from "react";
import { MdDone } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";

interface FeedbackStatusFormProps {
  selectedFeedback: {
    status: string;
    assignee: string;
  };
  handleStatusChange: (value: string) => void;
  handleAssigneeChange: (value: string) => void;
  handleSubmit: (action: string) => void;
}

const FeedbackStatusForm: React.FC<FeedbackStatusFormProps> = ({
  selectedFeedback,
  handleStatusChange,
  handleAssigneeChange,
  handleSubmit,
}) => {
  return (
    <div className="border-t-2 border-[#F0F2F5] p-4 flex flex-col gap-4 bg-white">
      {/* Төлөв */}
      <div>
        <label className="text-[#374151] text-sm font-medium">Төлөв</label>
        <Select
          value={selectedFeedback.status}
          onChange={handleStatusChange}
          className="w-full mt-1"
          options={[
            { label: "Шинэ", value: "Шинэ" },
            { label: "Хянагдаж байгаа", value: "Хянагдаж байгаа" },
            { label: "Шийдэгдсэн", value: "Шийдэгдсэн" },
            { label: "Татгалзсан", value: "Татгалзсан" },
          ]}
        />
      </div>

      {/* Шийдвэрлэх ажилтан */}
      <div>
        <label className="text-[#374151] text-sm font-medium">
          Шийдвэрлэх ажилтан
        </label>
        <Select
          value={selectedFeedback.assignee}
          onChange={handleAssigneeChange}
          className="w-full mt-1"
          options={[
            { label: "Battulga E.", value: "Battulga E." },
            { label: "Batdorj J.", value: "Batdorj J." },
          ]}
        />
      </div>

      {/* Шийдвэрийн дэлгэрэнгүй */}
      <div>
        <label className="text-[#374151] text-sm font-medium">
          Шийдвэрийн дэлгэрэнгүй
        </label>
        <Input.TextArea
          rows={4}
          placeholder="Тайлбар оруулах"
          className="mt-1"
        />
      </div>

      {selectedFeedback.status !== "Шийдэгдсэн" && (
        <div className="flex flex-col gap-2 mt-4">
          {selectedFeedback.status === "Хүлээгдэж байгаа" && (
            <button
              onClick={() => handleSubmit("changeStatus")}
              className="bg-[#0A2D75] text-white rounded-xl py-2 w-full justify-center items-center flex gap-2">
              <BiTransfer className="w-[14px] h-4" />
              Төлөв солих
            </button>
          )}

          {selectedFeedback.status === "Хянагдаж байгаа" && (
            <button
              onClick={() => handleSubmit("assignTo")}
              className="bg-[#0A2D75] text-white rounded-xl py-2 w-full justify-center items-center flex gap-2">
              <BiTransfer className="w-[14px] h-4" />
              Ажилтанд шилжүүлэх
            </button>
          )}

          <button
            onClick={() => handleSubmit("resolve")}
            className="bg-[#0A2D75] text-white rounded-xl py-2 w-full justify-center items-center flex gap-2">
            <MdDone className="w-[14px] h-4" />
            Шийдвэрлэх
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackStatusForm;
