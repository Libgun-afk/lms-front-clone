import { useState } from "react";
import { Upload, message } from "antd";
import UploadedImageCard from "./UploadedImageCard";

const { Dragger } = Upload;

interface ImageUploaderProps {
  onImageUpload: (uuid: string) => void;
}

const ImageUploader = ({ onImageUpload }: ImageUploaderProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [lastModified, setLastModified] = useState("");

  const handleChange = async (info: any) => {
    console.log("HandleChange triggered"); // Алхам 1: handleChange эхлэх

    const file = info.file.originFileObj;
    if (file) {
      console.log("File selected:", file); // Алхам 2: Файл шалгах

      const formData = new FormData();
      formData.append("file", file);
      formData.append("PRODUCT", "your-product-string"); // PRODUCT string өгөгдөл илгээж байна
      console.log("Form data prepared:", formData); // Алхам 3: FormData шалгах

      try {
        console.log("Sending request to the server..."); // Алхам 4: Сервер руу хүсэлт илгээх
        const response = await fetch(
          "http://loadbalancerlmscore-1401289988.ap-east-1.elb.amazonaws.com/api/file/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        console.log("Server response:", data); // Алхам 5: Серверийн хариу шалгах

        if (data && data.length > 0) {
          const uuid = data[0].uuid; // UUID-г хариунаас авна
          console.log("UUID received:", uuid); // Алхам 6: UUID шалгах
          setImageUrl(`http://your-server.com/path-to-image/${data[0].name}`); // Зурагны URL
          onImageUpload(uuid); // UUID-г гадагшаа дамжуулж байна
          setFileName(file.name);
          const modifiedDate = new Date(file.lastModified);
          setLastModified(modifiedDate.toISOString().split("T")[0]);
        } else {
          message.error("Зураг оруулахад алдаа гарлаа");
        }
      } catch (error) {
        console.error("Алдаа:", error);
        message.error("Зураг оруулахад алдаа гарлаа");
      }
    }
  };

  const handleDelete = () => {
    console.log("Delete triggered"); // Алхам 7: Устгах үйлдэл эхлэх
    setImageUrl("");
    onImageUpload(""); // Устгах үед UUID-ийг null болгоно
    setFileName("");
    setLastModified("");
  };

  return (
    <div className="w-full max-w-md">
      {!imageUrl ? (
        <Dragger
          beforeUpload={(file) => {
            const isImage = file.type.startsWith("image/");
            console.log("File type check:", isImage); // Алхам 8: Файл төрөл шалгах
            return isImage ? true : Upload.LIST_IGNORE;
          }}
          onChange={handleChange}
          className="flex w-full h-[120px] border border-dashed rounded-lg p-2"
          showUploadList={false}>
          <div className="flex justify-center items-center gap-5">
            <div className="text-center">
              <p className="text-sm text-[#3051A0] font-medium">
                Зураг оруулах
              </p>
              <p className="text-xs text-[#374151]">
                SVG, PNG, JPG (1600x1600px)
              </p>
            </div>
            <img
              src="/image copy 4.png"
              alt="upload icon"
              className="h-10 w-10"
            />
          </div>
        </Dragger>
      ) : (
        <UploadedImageCard
          imageUrl={imageUrl}
          fileName={fileName}
          lastModified={lastModified}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ImageUploader;
