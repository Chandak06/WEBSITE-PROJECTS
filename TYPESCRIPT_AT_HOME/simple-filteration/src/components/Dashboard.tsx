import Sidebar from "./Sidebar";
import Table from "./Table";
import { useState } from "react";
const Dashboard = () => {
  };
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="bg-gray-900 flex-1">
        <Table />

      </div>
    </div>
  );
};

export default Dashboard;
