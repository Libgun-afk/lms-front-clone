// components/ForgetPassword.tsx
"use client";

import { Form, Input, Button, Steps, message } from "antd";
import { MailOutlined, LockOutlined, NumberOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Step } = Steps;

const ForgetPassword = ({ onBack }: { onBack: () => void }) => {
  const [form] = Form.useForm();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const steps = [
    {
      title: "Имэйл",
      content: (
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Имэйл хаяг оруулна уу." }]}>
          <Input prefix={<MailOutlined />} placeholder="Имэйл хаяг" />
        </Form.Item>
      ),
    },
    {
      title: "Баталгаажуулах код",
      content: (
        <Form.Item
          name="code"
          rules={[
            { required: true, message: "Баталгаажуулах код оруулна уу." },
          ]}>
          <Input prefix={<NumberOutlined />} placeholder="Код" />
        </Form.Item>
      ),
    },
    {
      title: "Шинэ нууц үг",
      content: (
        <>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Шинэ нууц үг оруулна уу." }]}>
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Шинэ нууц үг"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Нууц үг баталгаажуулах шаардлагатай.",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Нууц үг таарахгүй байна."));
                },
              }),
            ]}>
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Нууц үг баталгаажуулах"
            />
          </Form.Item>
        </>
      ),
    },
  ];

  const next = async () => {
    try {
      await form.validateFields();
      setLoading(true);
      setTimeout(() => {
        if (step < steps.length - 1) {
          setStep((prev) => prev + 1);
        } else {
          message.success("Нууц үг амжилттай шинэчлэгдлээ!");
          form.resetFields();
          onBack();
        }
        setLoading(false);
      }, 800);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="form-body">
      <h2>Нууц үг сэргээх</h2>
      <Steps current={step} size="small" className="mb-6">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Form form={form} layout="vertical">
        {steps[step].content}
        <Form.Item>
          <Button type="primary" block onClick={next} loading={loading}>
            {step === steps.length - 1 ? "Шинэчлэх" : "Үргэлжлүүлэх"}
          </Button>
        </Form.Item>
        <Button type="link" onClick={onBack} block>
          Буцах
        </Button>
      </Form>
    </div>
  );
};

export default ForgetPassword;
