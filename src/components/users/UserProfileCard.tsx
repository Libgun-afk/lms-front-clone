// components/UserProfileCard.tsx
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

const { Title, Text } = Typography;

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

export default function UserProfileCard() {
  return (
    <Card style={{ maxWidth: 360 }} bordered>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Space align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
          <Avatar size="large">JO</Avatar>
          <Title level={5} style={{ margin: 0 }}>{user.name}</Title>
          <Text strong>{user.points.toLocaleString()}</Text>
        </Space>

        <Button block>Хувийн мэдээлэл</Button>
        <Button block>Онооны түүх</Button>

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

        <Button block>Гэр бүл, байгууллага засах</Button>
        <Button type="primary" block>Оноо шилжүүлэх</Button>
      </Space>
    </Card>
  );
}
