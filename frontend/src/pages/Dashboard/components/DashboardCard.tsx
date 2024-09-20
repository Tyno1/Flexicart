import React, { ReactNode } from "react";

type CardProps = {
  title: string;
  value: string;
  percentage: string;
  detail: ReactNode
};

const DashboardCard: React.FC<CardProps> = ({ title, value, percentage, detail }) => {
  return (
    <div className="w-72 h-40 bg-white rounded-2xl shadow p-6 flex flex-col justify-between" >
      <p className="text-sm font-normal text-gray-500">{title}</p>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-medium">{value}</p>
        <p className="text-sm">{percentage}{detail}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
