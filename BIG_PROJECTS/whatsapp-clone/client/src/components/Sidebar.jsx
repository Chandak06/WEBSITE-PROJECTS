import React from "react";

const Sidebar = () => {
  return (
    <div className="w-[60px] bg-[#202c33] flex flex-col items-center py-4 justify-between">
      <div className="flex flex-col gap-6">
        <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
        <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
        <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
      </div>

      <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
    </div>
  );
};

export default Sidebar;
