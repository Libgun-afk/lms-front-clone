import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

const SendNotification = ({ onClose }: { onClose: () => void }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = ["/image copy 11.png", "/image copy 12.png"];

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-50 transition-all">
      <div className="bg-white rounded-xl w-[862px] flex flex-col justify-between">
        {/* header  */}
        <div className="flex justify-between items-center border-b h-[64px] px-4 bg-[#F0F2F5] rounded-t-xl">
          <h2 className="text-xl font-medium text-[#4B5563]">
            Мэдэгдэл илгээх
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>
        {/* main */}
        <div className="flex h-[632px] bg-[#FFFFFF] rounded-b-xl">
          <div className="flex flex-col justify-between w-[530px]  text-[#374151] text-base font-medium py-3">
            <div className="flex flex-col h-[200px] w-[530px] gap-6 px-4">
              Илгээх мэдэгдлийн төрөл
              <div className="flex items-center h-9 gap-2 ">
                <input
                  id="checkbox"
                  type="checkbox"
                  className="w-5 h-5 rounded-xl border-gray-300   "
                />
                <label
                  htmlFor="checkbox"
                  className="text-[#374151] text-sm font-normal">
                  Мессеж
                  <div className="text-[#A0AEC0] text-sm font-normal">
                    Хэрэглэгчийн бүртгэлтэй гар утасны дугаарлуу мессеж
                    хэлбэрээр хүрнэ
                  </div>
                </label>
              </div>
              <div className="flex items-center h-9 gap-2">
                <input
                  id="checkbox"
                  type="checkbox"
                  className="w-5 h-5 rounded-xl border-gray-300   "
                />
                <label
                  htmlFor="checkbox"
                  className="text-[#374151] text-sm font-normal">
                  Мэдэгдэл
                  <div className="text-[#A0AEC0] text-sm font-normal">
                    Хэрэглэгчийн суулгасан Max Point-р дамжуулан мэдэгдэл
                    хэлбэрээр хүрнэ
                  </div>
                </label>
              </div>
            </div>
            <div className="border"></div>
            <div className="flex flex-col h-[176px] w-[530px] gap-6 py-3 px-4 text-[#374151] text-base font-medium">
              Хамрах хүрээ
              <div className="flex items-center h-9 gap-2 ">
                <input
                  id="checkbox"
                  type="checkbox"
                  className="w-5 h-5 rounded-xl border-gray-300   "
                />
                <label
                  htmlFor="checkbox"
                  className="text-[#374151] text-sm font-normal">
                  Хувь хүн
                  <div className="text-[#A0AEC0] text-sm font-normal">
                    Ямар нэг гэрээт байгууллагад хамаарахгүй, бие даасан
                    хэрэглэгч
                  </div>
                </label>
              </div>
              <div className="flex items-center h-9 gap-2">
                <input
                  id="checkbox"
                  type="checkbox"
                  className="w-5 h-5 rounded-xl border-gray-300   "
                />
                <label
                  htmlFor="checkbox"
                  className="text-[#374151] text-sm font-normal">
                  Ажилтан
                  <div className="text-[#A0AEC0] text-sm font-normal">
                    М-Март болон түүний хамааралтай, гэрээтэй байгууллагуудын
                    ажилтан
                  </div>
                </label>
              </div>
            </div>
            <div className="border"></div>

            <div className="flex flex-col w-[530px] gap-3 py-3 px-4 text-[#374151] text-base font-medium">
              Мэдэгдэл
              <div className="text-[#374151] text-sm font-normal">Гарчиг</div>
              <Input
                type="text"
                name="name"
                // value={productData.name}
                // onChange={handleInputChange}
                placeholder="Програм шинэчлэх тухай"
                className="p-2 border rounded w-full "
              />
              <div className="text-[#374151] text-sm font-normal">
                Дэлгэрэнгүй
              </div>
              <TextArea
                className="bg-[#F0F2F5] rounded-xl h-40"
                // className="bg-[#F0F2F5] rounded-xl h-40"
                placeholder="Loyalty Management System-н утасны аппликейшн хэрэглэгчид апп-д сайжруулалтууд хийгдсэн тул app store болон playstore-с шинэ хувилбараа татна уу."
              />
            </div>
          </div>
          <div className="flex border"></div>
          <div className="flex flex-col w-[330px] py-3">
            <div className="text-[#374151] font-medium text-base flex justify-center items-center">
              Харагдах байдал
            </div>

            <div className="relative flex flex-col justify-center items-center gap-4 h-[692px] w-[330px] ">
              <img
                src={images[currentImage]}
                alt={`Slide ${currentImage + 1}`}
                className="transition-all duration-500 ease-in-out h-[600px] w-[380px]"
              />

              <div className="absolute inset-0 flex justify-between items-center">
                {currentImage !== 0 && (
                  <button
                    onClick={handlePrev}
                    className="absolute left-7  translate-x-[-50%] bg-[#3051A0] h-9 w-9 text-white rounded-xl p-4">
                    <img src="/image copy 14.png" alt="" />
                  </button>
                )}

                {currentImage !== images.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="absolute right-6 translate-x-[50%] bg-[#3051A0] h-9 w-9 text-white rounded-xl p-4">
                    <img src="/image copy 13.png" alt="" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* main end */}
        <div className="flex justify-end items-center border-b h-[64px] px-6 bg-[#F0F2F5] rounded-b-xl">
          <button
            //   onClick={handleSubmit}
            type="button"
            className="bg-[#0A2D75] text-white flex justify-center items-center rounded w-[148px] h-9 hover:bg- transition font-semibold gap-2">
            <div className="text-sm font-medium">Зарлал илгээх</div>
            <img
              src="/image copy 10.png"
              className="w-[14px] h-4"
              alt="Бүртгэх"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendNotification;
