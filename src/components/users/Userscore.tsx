// @ts-nocheck
// import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Button } from 'antd';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

export default function DeductPointsModal({ open, onClose, onSubmit }: Props) {
  const [form] = Form.useForm();

  return (
    <Modal title="Оноо хасах"open={open}onCancel={onClose}footer={null}>
      <Form layout="vertical"form={form}onFinish={onSubmit}>
        <Form.Item label="Оноо хасах утасны дугаар"name="phone"rules={[{ required: true, message: 'Утасны дугаар оруулна уу' }]}>
          <Input placeholder="8080 5050" />
        </Form.Item>
        <Form.Item label="Хасах хэмжээ"name="amount"rules={[{ required: true, message: 'Хэмжээ оруулна уу' }]}>
          <InputNumber style={{ width: '100%' }}placeholder="10,000"min={1}step={100}/>
        </Form.Item>
        <Form.Item label="Тайлбар"name="description"rules={[{ required: true, message: 'Тайлбар оруулна уу' }]}>
          <Input.TextArea placeholder="Онооны тайлбар" rows={3} />
        </Form.Item>
        <Form.Item>
          <Button type="primary"htmlType="submit"icon={<span style={{ marginRight: 4 }}>–</span>}block>
            Оноо хасах
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
