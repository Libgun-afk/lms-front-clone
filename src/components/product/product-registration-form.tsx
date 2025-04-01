"use client";

import { useState } from "react";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  ExpandAltOutlined,
  CalendarOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import {
  Steps,
  Input,
  Select,
  Checkbox,
  DatePicker,
  Form,
  Collapse,
  Tooltip,
} from "antd";

const { Step } = Steps;
const { Option } = Select;
const { Panel } = Collapse;

const steps = [
  { title: "Үндсэн мэдээлэл", status: "finish" },
  { title: "Худалдан авах / Худалдах үнэ", status: "finish" },
  { title: "Төлөв удирдлага", status: "process" },
  { title: "POS тохиргоо", status: "wait" },
  { title: "Мөнгөн хөшигт", status: "wait" },
  { title: "Тэмдэглэл", status: "wait" },
  { title: "Орц, Гарц", status: "wait" },
  { title: "Шинж чанар", status: "wait" },
  { title: "Оргих бараа", status: "wait" },
  { title: "Тэнхлэг", status: "wait" },
  { title: "Хангагч", status: "wait" },
];

export function ProductRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(2);
  const [form] = Form.useForm();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ArrowLeftOutlined className="text-gray-500" />
          <h1 className="text-lg font-medium">Бараа бүртгэл</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-500 text-sm">
            <span>Сүүлд хадгалсан:</span>
            <span className="ml-1 font-medium">2022-12-12 11:45AM</span>
          </div>
          {/* <Button
            icon={<CalendarOutlined />}
            className="flex items-center h-[36px]">
            Түр хадгалах
          </Button>
          <Button
            icon={<FileImageOutlined />}
            className="flex items-center h-[36px]">
            Архивлах
          </Button> */}
          <button className="flex items-center bg-[#3051A0]  rounded-xl text-white  h-[36px] gap-2 p-4 justify-center">
            <span className="mr-1">Бүртгэх</span>
          </button>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          {/* <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handlePrev}
            disabled={currentStep === 0}>
            Өмнөх
          </Button>
          <Button
            type="text"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}>
            Дараах <ArrowRightOutlined />
          </Button> */}
        </div>
        <Steps current={currentStep} size="small" className="custom-steps">
          {steps.map((step, index) => (
            <Step
              key={index}
              title={<span className="text-xs">{step.title}</span>}
              status={
                index === currentStep
                  ? "process"
                  : index < currentStep
                  ? "finish"
                  : "wait"
              }
              icon={index < currentStep ? <CheckOutlined /> : null}
            />
          ))}
        </Steps>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <div>CTRL</div>
          <div>SHIFT</div>
          <div>D</div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <div className="bg-white rounded-md shadow-sm">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-medium">Үндсэн мэдээлэл</h2>
            <div className="flex space-x-2">
              <Tooltip title="Тустай нөхцөл харах">
                {/* <Button icon={<ExpandAltOutlined />} /> */}
              </Tooltip>
              <Tooltip title="Шинжилгээний бичиг харах">
                {/* <Button icon={<ExpandAltOutlined />} /> */}
              </Tooltip>
            </div>
          </div>

          <Form
            form={form}
            layout="vertical"
            className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {/* First Column */}
            <Form.Item
              label={
                <span className="flex items-center">
                  Төрөл <span className="text-red-500 ml-1">*</span>
                </span>
              }
              name="type"
              rules={[{ required: true }]}>
              <Select placeholder="Бараа материал">
                <Option value="product">Бараа материал</Option>
                <Option value="service">Үйлчилгээ</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <span className="flex items-center">
                  Дэд ангилал <span className="text-red-500 ml-1">*</span>
                </span>
              }
              name="subCategory"
              rules={[{ required: true }]}>
              <Select placeholder="Зэрлэг">
                <Option value="wild">Зэрлэг</Option>
                <Option value="domestic">Гэрийн</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <span className="flex items-center">
                  Үндсэн Бар код <span className="text-red-500 ml-1">*</span>
                </span>
              }
              name="barcode"
              rules={[{ required: true }]}>
              <Input placeholder="Үндсэн Бар код" />
            </Form.Item>

            <Form.Item
              label={
                <span className="flex items-center">
                  Барааны нэр <span className="text-red-500 ml-1">*</span>
                </span>
              }
              name="productName"
              rules={[{ required: true }]}>
              <Input placeholder="Yc Бонд ариун 800ml" />
            </Form.Item>

            <Form.Item
              label={
                <span className="flex items-center">
                  Нийлүүлэгчийн код <span className="text-red-500 ml-1">*</span>
                </span>
              }
              name="supplierCode"
              rules={[{ required: true }]}>
              <Input placeholder="654564" />
            </Form.Item>

            <Form.Item
              label={
                <span className="flex items-center">
                  Алсын нэр <span className="text-red-500 ml-1">*</span>
                </span>
              }
              name="remoteName">
              <Input placeholder="Алсын нэр" />
            </Form.Item>

            <Form.Item
              label={
                <span className="flex items-center">
                  Брэнд <span className="text-red-500 ml-1">*</span>
                </span>
              }
              name="brand">
              <Select placeholder="Брэнд">
                <Option value="brand1">Брэнд 1</Option>
                <Option value="brand2">Брэнд 2</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <span className="flex items-center">
                  Бэлгийн нэр <span className="text-red-500 ml-1">*</span>
                </span>
              }
              name="giftName">
              <Input placeholder="Бэлгийн нэр" />
            </Form.Item>

            <Form.Item
              label={
                <span className="flex items-center">
                  Барааны код <span className="text-red-500 ml-1">*</span>
                </span>
              }
              name="productCode">
              <Input placeholder="123456789012345" />
            </Form.Item>

            <Form.Item
              label={
                <span className="flex items-center">
                  Үндсэн хэмжих нэгж{" "}
                  <span className="text-red-500 ml-1">*</span>
                </span>
              }
              name="unit">
              <Select placeholder="EA">
                <Option value="ea">EA</Option>
                <Option value="kg">KG</Option>
                <Option value="l">L</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <span className="flex items-center">Нөөцийн доод хэмжээр</span>
              }
              name="minStock">
              <Input placeholder="16" />
            </Form.Item>

            {/* Checkboxes */}
            <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <Form.Item name="isActive" valuePropName="checked">
                <Checkbox>Идэвх утга</Checkbox>
              </Form.Item>

              <Form.Item name="isOriginal" valuePropName="checked">
                <Checkbox>Өөрийн бараа эсэх</Checkbox>
              </Form.Item>

              <Form.Item name="isImported" valuePropName="checked">
                <Checkbox>Нэрийн бараа эсэх</Checkbox>
              </Form.Item>

              <Form.Item name="isSale" valuePropName="checked">
                <Checkbox>Борлуулах бараа эсэх</Checkbox>
              </Form.Item>

              <Form.Item name="isAnalysis" valuePropName="checked">
                <Checkbox>Нөөцөө жигдрүүлэлтэй эсэх</Checkbox>
              </Form.Item>

              <Form.Item name="isVAT" valuePropName="checked">
                <Checkbox>НӨАТ-тай эсэх</Checkbox>
              </Form.Item>

              <Form.Item name="isProduction" valuePropName="checked">
                <Checkbox>Бүдүүлэгтэй эсэх</Checkbox>
              </Form.Item>

              <Form.Item name="isBonus" valuePropName="checked">
                <Checkbox>Бонус нэмэх эсэх</Checkbox>
              </Form.Item>

              <Form.Item name="isBonusPoint" valuePropName="checked">
                <Checkbox>Бонус оноотой эсэх</Checkbox>
              </Form.Item>

              <Form.Item name="isAnimal" valuePropName="checked">
                <Checkbox>Жинхэнэ бараа эсэх</Checkbox>
              </Form.Item>

              <Form.Item name="isAnalysisReport" valuePropName="checked">
                <Checkbox>Шинжилгээний бичиг шаардах эсэх</Checkbox>
              </Form.Item>

              <Form.Item name="isCIT" valuePropName="checked">
                <Checkbox>НХАТ-тай эсэх</Checkbox>
              </Form.Item>
            </div>
          </Form>
        </div>

        {/* Second Section */}
        <div className="bg-white rounded-md shadow-sm mt-6">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Барааны мэдээлэл</h2>
          </div>

          <Form
            layout="vertical"
            className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <Form.Item label="Эргэц шилжилт төрөл" name="rotationType">
              <Select placeholder="PARETO">
                <Option value="pareto">PARETO</Option>
                <Option value="fifo">FIFO</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <span className="flex items-center">
                  ШБ хуудас/хоног <span className="text-red-500 ml-1">*</span>
                </span>
              }
              name="sheetDays">
              <Input placeholder="ШБ хуудас/хоног" />
            </Form.Item>

            <Form.Item
              label={
                <span className="flex items-center">
                  НӨАТУС-н Ангилал <span className="text-red-500 ml-1">*</span>
                </span>
              }
              name="vatCategory">
              <Input placeholder="НӨАТУС-н Ангилал" />
            </Form.Item>

            <Form.Item label="Бүртгэсэн огноо" name="registeredDate">
              <DatePicker className="w-full" placeholder="2022-12-12 11:45AM" />
            </Form.Item>

            <Form.Item label="Бүртгэсэн хэрэглэгч" name="registeredUser">
              <Select placeholder="Batbilegt B">
                <Option value="user1">Batbilegt B</Option>
                <Option value="user2">User 2</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Сүүлд өөрчилсөн" name="lastModified">
              <DatePicker className="w-full" placeholder="2022-12-12 11:45AM" />
            </Form.Item>

            <Form.Item label="Өөрчилсөн хэрэглэгч" name="modifiedUser">
              <Select placeholder="Batbilegt B">
                <Option value="user1">Batbilegt B</Option>
                <Option value="user2">User 2</Option>
              </Select>
            </Form.Item>

            <div className="col-span-full">
              <div className="flex items-center mt-4">
                <span className="text-sm font-medium mr-2">Зураг оруулах</span>
                <span className="text-xs text-gray-500">
                  SVG, PNG, JPG (800x800px)
                </span>
              </div>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
                <FileImageOutlined className="text-3xl text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">
                  Зураг чирэх эсвэл энд дарж оруулна уу
                </p>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
