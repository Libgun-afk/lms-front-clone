import React, { useEffect, useState } from "react";
import Bonus from "./tags/Bonus";
import Discounted from "./tags/Discounted";
import Highlight from "./tags/Highlight";
import { Select, Input } from "antd";
import ImageUploader from "./ImageUploader";

const { Option } = Select;

const tagComponents: { [key: string]: React.ReactNode } = {
  Урамшуулалтай: <Bonus />,
  Онцлох: <Highlight />,
  Хямдарсан: <Discounted />,
  Нэрийн: <div></div>,
};

const availableTags = [
  "Шинэ",
  "Урамшуулалтай",
  "Хямдарсан",
  "Онцлох",
  "Нэрийн",
];

const Tags = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    console.log("Uploaded Image:", image);
  }, [image]);

  const handleTagChange = (values: string[]) => {
    setSelectedTags(Array.from(new Set(values)));
  };

  return (
    <div className="flex flex-col gap-4 w-full rounded-xl bg-white px-5 py-2">
      <div>
        <div className="text-sm text-[#374151] pl-1 mb-1">Төрөл</div>
        <Select
          mode="multiple"
          placeholder="Төрөл сонгох"
          value={selectedTags}
          onChange={handleTagChange}
          className="w-full"
          maxTagCount={4}
          // ❌ showArrow deprecated тул устгасан
        >
          {availableTags.map((tag) => (
            <Option key={tag} value={tag}>
              {tag}
            </Option>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <div className="text-sm text-[#374151] pl-1">Барааны код</div>
          <Input
            type="text"
            name="code"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            placeholder="123456"
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-[#374151] pl-1">Барааны нэр</div>
          <Input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Мандарин JEJU"
            className="p-2 border rounded w-full"
          />
        </div>
      </div>
      <div
        className={`grid gap-4 ${
          selectedTags.includes("Хямдарсан") ? "grid-cols-3" : "grid-cols-1"
        }`}>
        <div className="flex flex-col gap-1">
          <div className="text-sm text-[#374151] pl-1">Үндсэн үнэ</div>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="2,500 ₮"
            className="p-2 border rounded w-full"
          />
        </div>

        {selectedTags.includes("Хямдарсан") && (
          <>
            <div className="flex flex-col gap-1">
              <div className="text-sm text-[#374151] pl-1">Худалдах үнэ</div>
              <Input
                type="number"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                placeholder="2,000 ₮"
                className="p-2 border rounded w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-sm text-[#374151] pl-1">Хямдралын хувь</div>
              <Input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                placeholder="10%"
                className="p-2 border rounded w-full"
              />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {selectedTags
          .filter((tag) => tag !== "1")
          .map((tag) => (
            <div key={tag}>{tagComponents[tag]}</div>
          ))}
      </div>
      {/* Тайлбар */}
      <div className="flex flex-col gap-1">
        <div className="text-sm text-[#374151] pl-1">Тайлбар</div>
        <Input.TextArea
          rows={4}
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Орц, найруулга гэх мэт тайлбарласан дэлгэрэнгүй мэдээллийг энд бичнэ."
          className="p-2 border rounded w-full"
        />
      </div>
      <ImageUploader onImageUpload={setImage} />
    </div>
  );
};

export default Tags;
