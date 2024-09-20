import React from "react";

export interface DashboardMenuProps {
  icon?: string;
  text: string;
  onClick?: () => void;
  selectedMenu?: string;
}

const DashboardMenuItem: React.FC<DashboardMenuProps> = ({
  icon,
  text,
  onClick,
  selectedMenu,
}) => {
  return (
    <li className="w-full rounded-lg">
      <button
        onClick={onClick}
        className={`py-4 lg:pl-6 flex gap-4 items-center cursor-pointer w-full justify-center lg:justify-start h-full
      ${
        selectedMenu && selectedMenu === text
          ? "text-white bg-primary rounded-lg"
          : "bg-white text-black hover:bg-slate-100"
      }
    `}
      >
        <span>{icon}</span>
        {text}
      </button>
    </li>
  );
};

export default DashboardMenuItem;
