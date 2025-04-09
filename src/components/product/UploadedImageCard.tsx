import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Modal } from "antd";

interface UploadedImageCardProps {
  imageUrl: string; // Зураг URL
  fileName: string; // Файлын нэр
  lastModified: string; // Өөрчлөгдсөн огноо
  onDelete: () => void; // Устгах функц
}

const UploadedImageCard = ({
  imageUrl,
  fileName,
  lastModified,
  onDelete,
}: UploadedImageCardProps) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  const openPreview = () => setPreviewVisible(true);
  const closePreview = () => setPreviewVisible(false);

  return (
    <>
      <div className="flex items-center justify-between border border-dashed rounded-xl p-3 w-full max-w-md">
        <div className="flex items-center gap-4">
          <img
            src={imageUrl}
            alt={fileName}
            className="h-12 w-12 object-cover rounded-md cursor-pointer"
            onClick={openPreview}
          />
          <div>
            <p className="font-semibold text-gray-800 truncate w-40">
              {fileName}
            </p>
            <p className="text-sm text-gray-500">
              Last changed on <br /> {lastModified}
            </p>
          </div>
        </div>
        <button
          onClick={onDelete}
          className="bg-red-100 hover:bg-red-200 rounded-full p-2 transition-colors">
          <Trash2 className="h-4 w-4 text-red-500" />
        </button>
      </div>

      <Modal
        open={previewVisible}
        onCancel={closePreview}
        footer={null}
        centered>
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
        />
      </Modal>
    </>
  );
};

export default UploadedImageCard;
