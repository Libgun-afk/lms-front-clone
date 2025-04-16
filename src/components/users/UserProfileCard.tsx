"use client";
import React from 'react';
import { Card, Avatar, Button, Divider, Typography, Space } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  ManOutlined,
  BankOutlined,
  TeamOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const { Text } = Typography;

const user = {
  name: 'М. Нэргүй',
  points: 630440,
  gender: 'Эрэгтэй',
  birthday: '1995-12-25',
  phone: '8080 5050',
  email: 'Dorj@gmail.com',
  company: 'Acme - Acme Corporation',
  familyId: '97174',
  familyMembers: [
    { name: 'М. Нэргүй', phone: '8080 5050' },
    { name: 'Төгөлдөр', phone: '8064 8570' },
    { name: 'Болормаа', phone: '8040 9077' },
    { name: 'Долгор', phone: '8031 9507' },
    { name: 'Тэмүүлэн', phone: '8047 4930' },
    { name: 'Отгонбаяр', phone: '' },
  ],
};

const transactions = [
  { title: "Худалдан авалтын бонус", amount: 20000, type: "plus", date: "2022-12-12 15:18:50" },
  { title: "Referal bonus", amount: 20000, type: "plus", date: "2022-12-12 15:18:50" },
  { title: "Бонус оноо зарцуулалт", amount: 10000, type: "minus", date: "2022-12-12 15:18:50" },
  // ... more transactions
];


export default function UserProfileCard() {
  
  // const {isOpen: openProps, isCancel: cancelProps} = props;

  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Шилжүүлсэн утга:", { phone, amount });
    // Reset form
    setPhone("");
    setAmount("");
    setIsOpen(false);
  };
  const [isCancel, setIsCancel] = useState(false);
  const [familyId, setFamilyId] = useState("97174");
  const [members] = useState([
    "8080 5050",
    "8064 8570",
    "8040 9077",
    "8031 9507",
    "8047 4930",
    "8097 3393",
  ]);
  const [organization, setOrganization] = useState("");
 
  const handleSubmitt = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log({
      familyId,
      members,
      organization,
    });
    setIsCancel(false);
  };

  
  return (
    <div>
      <div>
      <Card style={{ maxWidth: 360 }} >
       <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Divider orientation="left">Хувийн мэдээлэл</Divider>
        <Space direction="vertical" size="small">
          <Text><ManOutlined /> {user.gender}</Text>
          <Text><CalendarOutlined /> {user.birthday}</Text>
          <Text><PhoneOutlined /> {user.phone}</Text>
          <Text><MailOutlined /> {user.email}</Text>
        </Space>
        <Divider orientation="left">Нэмэлт мэдээлэл</Divider>
        <Text><BankOutlined /> {user.company}</Text>
        <Text><TeamOutlined /> Гэр бүл #{user.familyId}</Text>
        <Space direction="vertical" style={{ width: '100%' }}>
          {user.familyMembers.map((m, i) => (
            <Card size="small" key={i}>
              <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                <Space>
                  <Avatar size="small">JO</Avatar>
                  <Text>{m.name} - {m.phone}</Text>
                </Space>
                <Button icon={<SendOutlined />} size="small" />
              </Space>
            </Card>
          ))}
        </Space>
        <Button onClick={() => setIsCancel(true)} block>Гэр бүл, байгууллага засах</Button>
        <Button  onClick={() => setIsOpen(true)} type="primary" block>Оноо шилжүүлэх</Button>
       </Space>
      </Card>
      </div>
      <div className="p-4 max-w-sm mx-auto bg-white rounded-lg shadow">
      {/* Dropdown */}
      <div className="mb-4">
        <label className="text-sm text-gray-700 block mb-1">Хугацаа сонгох</label>
        <select className="w-full border rounded px-3 py-2 text-sm">
          <option>Сүүлийн 3 сар</option>
          <option>Сүүлийн 6 сар</option>
        </select>
      </div>

      {/* Transaction List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {transactions.map((tx, idx) => (
          <div key={idx} className="border-b pb-2">
            <div className="flex justify-between">
              <span className="font-medium">{tx.title}</span>
              <span className={tx.type === "plus" ? "text-green-500" : "text-red-500"}>
                {tx.type === "plus" ? "+" : "-"} {tx.amount.toLocaleString()} ₮
              </span>
            </div>
            <div className="text-xs text-gray-500">{tx.date}</div>
            <div className="text-xs text-gray-500">25,000 ₮</div>
          </div>
        ))}
      </div>
      {/* Summary */}
      <div className="mt-4 pt-4 border-t text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Нийт зарцуулсан</span>
          <span className="text-red-500">10,000 ₮</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Нийт цуглуулсан</span>
          <span className="text-green-500">10,000 ₮</span>
        </div>
        <div className="flex justify-between font-bold mt-2">
          <span>Эцсийн үлдэгдэл</span>
          <span>25,000 ₮</span>
        </div>
        <Button onClick={() => setIsCancel(true)} block>Гэр бүл, байгууллага засах</Button>
        <Button  onClick={() => setIsOpen(true)} type="primary" block>Оноо шилжүүлэх</Button>
      </div>
    </div>
     <div>
       {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[600px] rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Оноо шилжүүлэх</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black text-xl">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1 text-gray-600">
                    Оноо хүлээн авах утасны дугаар
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="8080 5050"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-600">
                    Шилжүүлэх хэмжээ
                  </label>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="10,000"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition"
                >
                  Оноо шилжүүлэх
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
     </div>
     <div>
      {isCancel && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[500px] rounded-2xl shadow-lg overflow-hidden">

            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Байгууллага засах</h2>
              <button
                onClick={() => setIsCancel(false)}
                className="text-gray-500 hover:text-black text-xl"
              >
              </button>
            </div>
            <form onSubmit={handleSubmitt} className="p-4 space-y-4">
              <div>
                <label className="block text-sm mb-1 text-gray-600">
                  Гэр бүлийн ID
                </label>
                <input
                  type="text"
                  value={familyId}
                  onChange={(e) => setFamilyId(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-600">
                  Гэр бүлийн гишүүд
                </label>
                <div className="border rounded-lg px-3 py-2 flex flex-wrap gap-2">
                  {members.map((m, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 text-sm rounded-full px-3 py-1"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-600">
                  Байгууллага сонгоно уу
                </label>
                <select
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Сонгоно уу</option>
                  <option value="org1">Байгууллага 1</option>
                  <option value="org2">Байгууллага 2</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition"
                >
                  Хадгалах
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
     </div>
   </div>
    
  );
}
