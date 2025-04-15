import { GET_TAG_LIST } from "@/graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import {
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  Upload,
  UploadFile,
  message,
} from "antd";
import { useState } from "react";
import { CREATE_PRODUCT_MUTATION } from "@/graphql/mutation";
import { LoadingOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import toast from "react-hot-toast";

const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];

const CreateProduct = ({ onClose }: { onClose: () => void }) => {
  const { loading, error, data } = useQuery(GET_TAG_LIST, {
    variables: {
      pagination: { pageSize: 13, pageNumber: 1 },
      filters: {},
    },
  });

  const [form] = Form.useForm();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (values: string[]) => {
    setSelectedTags(Array.from(new Set(values)));
    form.setFieldsValue({ tags: values });
  };

  const [fileList, setFileList] = useState<any>([]);

  const uploadProps = {
    name: "file",
    multiple: true,
    beforeUpload(file: any) {
      if (!allowedFileTypes.includes(file.type)) {
        message.error(`${file.name} зөвшөөрөгдөөгүй файл байна!`);
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onChange(info: any) {
      let newFileList = info.fileList.filter((file: any) =>
        allowedFileTypes.includes(file.type)
      );
      setFileList(newFileList);
    },
    onRemove(file: any) {
      setFileList((prev: UploadFile[]) =>
        prev.filter((f) => f.uid !== file.uuid)
      );
    },
  };

  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION);

  const tags = data?.getTagList?.items || [];

  const handleSubmit = async (values: any) => {
    try {
      const input: any = {
        code: values.code,
        name: values.name,
        price: String(parseFloat(values.price)),
        description: values.description || "",
        tags: selectedTags
          .map((tag) =>
            tags.find(
              (originalTag: { name: string }) => originalTag.name === tag
            )
          )
          .filter(Boolean)
          .map(({ id }) => id),
      };

      if (selectedTags.includes("Хямдарсан")) {
        input.sale = {
          salePrice: values.salePrice ? String(values.salePrice) : null,
          salePercent: values.salePercent
            ? parseFloat(values.salePercent)
            : null,
          saleStartdate: values.saleStartdate
            ? values.saleStartdate.format("YYYY-MM-DD")
            : null,
          saleEnddate: values.saleEnddate
            ? values.saleEnddate.format("YYYY-MM-DD")
            : null,
        };
      }

      if (selectedTags.includes("Урамшуулалтай")) {
        input.promotion = {
          promotionName: values.promotionName || null,
          promotionProduct: values.promotionProduct
            ? String(values.promotionProduct)
            : null,
          promotionStartdate: values.promotionStartdate
            ? values.promotionStartdate.format("YYYY-MM-DD")
            : null,
          promotionEnddate: values.promotionEnddate
            ? values.promotionEnddate.format("YYYY-MM-DD")
            : null,
        };
      }

      const { data } = await createProduct({
        variables: {
          createProductInput: input,
        },
      });

      form.resetFields();
      setSelectedTags([]);

      toast.success(`"${data.createProduct}" амжилттай нэмэгдлээ!`);

      if (onClose) onClose();
    } catch (error: any) {
      console.error("Product create алдаа:", error);
      toast.error("Бараа бүртгэхэд алдаа гарлаа: " + error.message);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center pt-96">
        <Spin
          className="flex justify-center items-center "
          indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
        />
      </div>
    );
  }
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Алдаа гарлаа: {error.message}
      </p>
    );

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-50 transition-all">
      <div className="bg-white rounded-xl w-[600px] flex flex-col justify-between h-[736px]">
        <div className="flex justify-between items-center border-b min-h-[64px] px-6 bg-[#F0F2F5] rounded-t-xl">
          <h2 className="text-xl font-medium">Бараа бүртгэх</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
          style={{
            padding: "",
            display: "flex",
            justifyContent: "space-between",
          }}
          className="flex flex-col h-full overflow-scroll">
          <div className="px-6 pt-6">
            <Form.Item name="tags">
              <Select
                mode="multiple"
                placeholder="Төрөл сонгох"
                value={selectedTags}
                onChange={handleTagChange}>
                {data?.getTagList?.items?.map((tag: any) => (
                  <Select.Option key={tag.id} value={tag.name}>
                    {tag.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="code"
                label="Барааны код"
                className="w-full"
                labelCol={undefined}
                wrapperCol={undefined}>
                <Input type="number" placeholder="123456" />
              </Form.Item>

              <Form.Item
                name="name"
                label="Барааны нэр"
                className="w-full"
                labelCol={undefined}
                wrapperCol={undefined}>
                <Input type="text" placeholder="Барааны нэр" />
              </Form.Item>
            </div>

            <div
              className={`grid gap-4 w-full ${
                selectedTags.includes("Хямдарсан")
                  ? "grid-cols-3"
                  : "grid-cols-1"
              }`}>
              <Form.Item
                name="price"
                label="Үндсэн үнэ"
                className="w-full"
                labelCol={undefined}
                wrapperCol={undefined}>
                <Input type="number" placeholder="2,500 ₮" />
              </Form.Item>

              {selectedTags.includes("Хямдарсан") && (
                <>
                  <Form.Item
                    name="salePrice"
                    label="Худалдах үнэ"
                    className="w-full"
                    labelCol={undefined}
                    wrapperCol={undefined}>
                    <Input type="number" placeholder="2,000 ₮" />
                  </Form.Item>

                  <Form.Item
                    name="salePercent"
                    label="Хямдралын хувь"
                    className="w-full"
                    labelCol={undefined}
                    wrapperCol={undefined}>
                    <Input type="number" placeholder="10%" />
                  </Form.Item>

                  <Form.Item
                    name="saleStartdate"
                    label="Хямдрал эхлэх"
                    className="w-full"
                    labelCol={undefined}
                    wrapperCol={undefined}>
                    <DatePicker format="YYYY-MM-DD" className="w-full" />
                  </Form.Item>

                  <Form.Item
                    name="saleEnddate"
                    label="Хямдрал дуусах"
                    className="w-full"
                    labelCol={undefined}
                    wrapperCol={undefined}>
                    <DatePicker format="YYYY-MM-DD" className="w-full" />
                  </Form.Item>
                </>
              )}
            </div>

            <div
              className={`grid gap-4 w-full ${
                selectedTags.includes("Урамшуулалтай")
                  ? "grid-cols-2"
                  : "grid-cols-1"
              }`}>
              {selectedTags.includes("Урамшуулалтай") && (
                <>
                  <Form.Item name="promotionName" label="Урамшууллын нэр">
                    <Input type="text" placeholder="Шинэ жил" />
                  </Form.Item>

                  <Form.Item
                    name="promotionProduct"
                    label="Урамшууллаар олгох барааны код">
                    <Input type="number" placeholder="123456" />
                  </Form.Item>

                  <Form.Item name="promotionStartdate" label="Эхлэх огноо">
                    <DatePicker format="YYYY-MM-DD" className="w-full" />
                  </Form.Item>

                  <Form.Item name="promotionEnddate" label="Дуусах огноо">
                    <DatePicker format="YYYY-MM-DD" className="w-full" />
                  </Form.Item>
                </>
              )}
            </div>

            <Form.Item name="description" label="Тайлбар">
              <Input.TextArea
                rows={4}
                placeholder="Орц, найруулга гэх мэт тайлбарласан дэлгэрэнгүй мэдээллийг энд бичнэ."
              />
            </Form.Item>
            <Form.Item label="Зураг оруулах" className="mb-4">
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon"></p>
                <p className="ant-upload-text">
                  {" "}
                  Зураг чирж оруулах эсвэл энд дарж сонгоно уу
                </p>
              </Dragger>
              {/* <App /> */}
            </Form.Item>
          </div>

          <div className="flex justify-end items-center border-t min-h-[64px] px-6 bg-[#F0F2F5] rounded-b-xl">
            <button
              type="submit"
              className="bg-[#0A2D75] text-white flex justify-center items-center rounded w-[102px] h-9 hover:bg-blue-800 transition font-semibold gap-2">
              <img
                src="/image copy 5.png"
                className="w-[14px] h-4"
                alt="Бүртгэх"
              />
              <div className="text-sm font-medium">Бүртгэх</div>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateProduct;
