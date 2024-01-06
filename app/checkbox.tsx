import React from "react";

const CheckBox = () => {
  return (
    <div className="flex justify-center items-center gap-4">
      <div className="content">
        <label className="checkBox">
          <input id="ch1" type="checkbox" />
          <div className="transition"></div>
        </label>
      </div>
      <span className="text-gray-400">Is expirable on day end?</span>
    </div>
  );
};

export default CheckBox;
