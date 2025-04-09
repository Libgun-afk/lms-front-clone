import { DatePicker } from "antd";
import React from "react";

const Discounted = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-[#374151] pl-1">Хямдрал эхлэх</div>
          <DatePicker format="YYYY-MM-DD" className="w-full" />
        </div>
        <div>
          <div className="text-sm text-[#374151] pl-1">Хямдрал дуусах</div>
          <DatePicker format="YYYY-MM-DD" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Discounted;
