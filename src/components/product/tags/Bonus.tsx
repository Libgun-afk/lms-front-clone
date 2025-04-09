import { DatePicker, Input } from "antd";
import React from "react";

const Bonus = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <div className="text-sm text-[#374151] pl-1">Урамшууллын нэр</div>
          <Input
            type="text"
            name="name"
            placeholder="Мандарин JEJU"
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm text-[#374151] pl-1">
            Урамшууллаар олгох барааны код
          </div>
          <Input
            type="text"
            name="code"
            placeholder="CODE1234"
            className="p-2 border rounded w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-[#374151] pl-1"> Урамшуул эхлэх</div>
          <DatePicker format="YYYY-MM-DD" className="w-full" />
        </div>
        <div>
          <div className="text-sm text-[#374151] pl-1">Урамшуул дуусах</div>
          <DatePicker format="YYYY-MM-DD" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Bonus;
