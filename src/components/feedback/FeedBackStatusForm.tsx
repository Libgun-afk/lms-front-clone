import { useState, useEffect } from "react";
import { Select, Input, Button, Form } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_FEEDBACK_MUTATION } from "@/graphql/mutation";
import { GET_EMPLOYEES } from "@/graphql/queries";
import toast from "react-hot-toast";

interface Props {
  selectedFeedback: {
    id: number;
    status: string;
    assignee: string;
    priority: string;
  };
  handleStatusChange: (status: string) => Promise<void>;
  handleAssigneeChange: (assigneeId: string) => Promise<void>;
  handlePriorityChange: (value: string) => void;
  handleSubmit: () => void;
  onSuccess: () => void;
  currentUserId: number;
}

interface Employee {
  empId: number;
  orgId: number;
  firstName: string | null;
  lastName: string | null;
}

const FeedbackStatusForm: React.FC<Props> = ({
  selectedFeedback,
  handleStatusChange,
  handleAssigneeChange,
  handlePriorityChange,
  handleSubmit,
  onSuccess,
  currentUserId,
}) => {
  const [resolutionComment, setResolutionComment] = useState<string>("");
  const [form] = Form.useForm();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(selectedFeedback.assignee);

  const {
    data: employeeData,
    loading: employeeLoading,
    error: employeeError,
  } = useQuery(GET_EMPLOYEES);

  const [updateFeedback] = useMutation(UPDATE_FEEDBACK_MUTATION);

  const employees = employeeData?.getEmployeeList || [];
  
  // Check if the selected employee is the current user
  const isCurrentUserSelected = selectedEmployeeId === currentUserId.toString();

  // Update selectedEmployeeId when selectedFeedback changes
  useEffect(() => {
    setSelectedEmployeeId(selectedFeedback.assignee);
  }, [selectedFeedback.assignee]);

  const handleEmployeeChange = (value: string) => {
    setSelectedEmployeeId(value);
  };

  const handleResolve = async () => {
    try {
      await updateFeedback({
        variables: {
          feedbackId: selectedFeedback.id,
          resolveInput: {
            resolvedEmpId: currentUserId,
            priority: selectedFeedback.priority || "NORMAL",
            resolutionComment: resolutionComment
          },
        },
      });
      toast.success("Амжилттай шийдвэрлэлээ!");
      handleStatusChange("Шийдэгдсэн");
      onSuccess();
    } catch (error) {
      toast.error("Алдаа гарлаа!");
      console.error("Error resolving feedback:", error);
    }
  };

  const handleAssign = async () => {
    try {
      await updateFeedback({
        variables: {
          feedbackId: selectedFeedback.id,
          resolveInput: {
            resolvedEmpId: parseInt(selectedEmployeeId),
            priority: selectedFeedback.priority || "NORMAL",
            resolutionComment: resolutionComment
          },
        },
      });
      
      toast.success("Амжилттай шилжүүллээ!");
      handleStatusChange("Хянагдаж байгаа");
      onSuccess();
    } catch (error) {
      toast.error("Алдаа гарлаа!");
      console.error("Error assigning feedback:", error);
    }
  };

  if (employeeLoading) {
    return <div>Ажилтны мэдээлэл ачаалж байна...</div>;
  }

  if (employeeError) {
    console.error("Employee loading error:", employeeError);
    return <div>Ажилтны мэдээлэл ачаалахад алдаа гарлаа</div>;
  }

  // Create employee options with proper display names
  const employeeOptions = [
    { 
      value: currentUserId.toString(), 
      label: `Өөрөө (${currentUserId})` 
    },
    ...employees.map((emp: Employee) => {
      // Skip the current user as they're already in the list
      if (emp.empId === currentUserId) return null;
      
      // Create display name based on available data
      let displayName = `Ажилтан #${emp.empId}`;
      if (emp.firstName && emp.lastName) {
        displayName = `${emp.lastName} ${emp.firstName}`;
      } else if (emp.firstName) {
        displayName = emp.firstName;
      } else if (emp.lastName) {
        displayName = emp.lastName;
      }
      
      return {
        value: emp.empId.toString(),
        label: displayName
      };
    }).filter(Boolean) // Remove null entries
  ];

  return (
    <Form form={form} layout="vertical" className="p-4">
      <Form.Item label="Төлөв">
        <div>{selectedFeedback.status}</div>
      </Form.Item>

      <Form.Item label="Ажилтан">
        <Select
          value={selectedEmployeeId}
          onChange={handleEmployeeChange}
          loading={employeeLoading}
          placeholder="Ажилтан сонгох"
          options={employeeOptions}
        />
      </Form.Item>

      <Form.Item label="Эрэмбэ">
        <Select
          value={selectedFeedback.priority}
          onChange={handlePriorityChange}
          placeholder="Эрэмбэ сонгох"
          options={[
            { value: "LOW", label: "LOW" },
            { value: "NORMAL", label: "NORMAL" },
            { value: "HIGH", label: "HIGH" }
          ]}
        />
      </Form.Item>

      <Form.Item label="Шийдвэрийн дэлгэрэнгүй">
        <Input.TextArea
          value={resolutionComment}
          onChange={(e) => setResolutionComment(e.target.value)}
          placeholder="Тайлбар оруулах"
          rows={4}
        />
      </Form.Item>

      <div className="flex flex-col gap-2">
        {isCurrentUserSelected ? (
          <Button type="primary" onClick={handleResolve}>
            Шийдвэрлэх
          </Button>
        ) : (
          <Button type="primary" onClick={handleAssign}>
            Ажилтанд шилжүүлэх
          </Button>
        )}
      </div>
    </Form>
  );
};

export default FeedbackStatusForm;
