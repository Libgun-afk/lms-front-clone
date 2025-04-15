"use client";

import { useQuery } from "@apollo/client";
import { GET_LOG } from "@/graphql/queries";
import { Collapse, Spin, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;
const { Panel } = Collapse;

interface LogItem {
  id: string;
  action: string;
  requestHeader: string;
  requestUrl: string;
  requestType: string;
  requestBody: string;
  responseBody: string;
  description: string;
  createdAt: string;
  createdEmpId: string;
}

// 📌 JSON parse хийх function-ийг глобалд нэг удаа тодорхойлно
function safeJsonParse(jsonStr: string): React.ReactNode {
  try {
    const parsed = JSON.parse(jsonStr);
    return (
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(parsed, null, 2)}
      </pre>
    );
  } catch (e) {
    return <span className="text-red-500">Invalid JSON</span>;
  }
}

const LogList = () => {
  const { data, loading, error } = useQuery(GET_LOG);

  const extractHeaderInfo = (headerStr: string) => {
    const headers: Record<string, string> = {};
    const parts = headerStr.split(",");

    for (let i = 0; i < parts.length; i += 2) {
      const key = parts[i]?.trim();
      const value = parts[i + 1]?.trim();
      if (key && value) {
        headers[key.toLowerCase()] = value;
      }
    }

    return {
      ip: headers["x-forwarded-for"] || "—",
      browser: headers["user-agent"] || "—",
      origin: headers["origin"] || "—",
      referer: headers["referer"] || "—",
    };
  };

  const columns: ColumnsType<LogItem> = [
    {
      title: "Ажиллагаа",
      dataIndex: "action",
      key: "action",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Төрөл",
      dataIndex: "requestType",
      key: "requestType",
      render: (type) => <Tag color="geekblue">{type}</Tag>,
    },

    {
      title: "Header мэдээлэл",
      key: "requestHeader",
      render: (_, record) => {
        const headerInfo = extractHeaderInfo(record.requestHeader);
        return (
          <div className=" p-3 rounded-md text-xs space-y-1">
            <p>
              <span className="font-semibold">📍 IP:</span> {headerInfo.ip}
            </p>
            <p>
              <span className="font-semibold">🖥 Browser:</span>{" "}
              {headerInfo.browser}
            </p>
            {/* <p>
              <span className="font-semibold">🌐 Origin:</span>{" "}
              {headerInfo.origin}
            </p>
            <p>
              <span className="font-semibold">🔗 Referer:</span>{" "}
              {headerInfo.referer}
            </p> */}
          </div>
        );
      },
    },

    {
      title: "Тайлбар",
      dataIndex: "description",
      key: "description",
      render: (desc) => (
        <Paragraph ellipsis={{ rows: 2, expandable: true }}>
          {desc || "—"}
        </Paragraph>
      ),
    },
    {
      title: "Ажилтан",
      dataIndex: "createdEmpId",
      key: "createdEmpId",
    },
    {
      title: "Огноо",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("YYYY-MM-DD HH:mm"),
    },
  ];

  if (loading)
    return (
      <div className="flex justify-center pt-96">
        {" "}
        <Spin
          className="flex justify-center items-center"
          indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
        />
      </div>
    );
  if (error) return <div>Алдаа гарлаа: {error.message}</div>;

  const logs = data?.getActivityLogs?.items ?? [];

  return (
    <div className="bg-[] flex flex-col gap-4 w-full rounded-xl">
      <div className="flex flex-col gap-4 w-full rounded-xl bg-white p-1">
        {/* <div className="flex justify-between h-[60px] items-center border-b border-gray-200 px-4 ">
          <div className="flex gap-6 items-center justify-center">
            <div className="font-bold text-lg">Санал хүсэлт</div>
            <div className="flex gap-2 text-sm text-gray-500">
              Нийт:
              <div className="text-black text-sm font-bold"></div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] rounded-xl w-9 border-2 border-gray-300 justify-center items-center gap-2 p-2">
              <img src="/image.png" alt="" className="w-4 h-4" />
            </button>
            <button className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] rounded-xl w-9 border-2 border-gray-300 justify-center items-center gap-2 p-2">
              <img src="/image copy.png" alt="" className="w-4 h-4" />
            </button>
            <button className="transition-all duration-300 ease-in-out transform hover:scale-105 flex h-[36px] w-9 rounded-xl border-2 border-gray-300 justify-center items-center gap-2 p-2">
              <img src="/image copy 2.png" alt="" className="w-[14px] h-4" />
            </button>
            <button className="h-[36px] gap-2 flex items-center justify-center bg-white rounded-xl border px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105">
              <img src="/image copy 8.png" alt="" className="w-[14px] h-4" />
              Хэвлэх
            </button>
          </div>
        </div> */}

        <div className="h-full w-full py-4 px-4 flex overflow-x-auto">
          <Table
            style={{ width: "100%" }}
            dataSource={logs}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </div>
  );
};

export default LogList;
