import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DashboardMenuItem from "./DashboardMenuItem";
import { IoCloseSharp } from "react-icons/io5";

interface SideNavProps {
  navIsOpen: boolean;
  setNavIsOpen(value: boolean): void;
  logout: () => void;
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({
  navIsOpen,
  logout,
  setSelectedMenu,
  selectedMenu,
  setNavIsOpen,
}) => {
  const navigate = useNavigate();

  const handleSelectMenu = (menu: string, route: string) => {
    setSelectedMenu(menu);
    navigate(route);
    setNavIsOpen(!navIsOpen);
  };
  const handleSelectMenuWeb = (menu: string, route: string) => {
    setSelectedMenu(menu);
    navigate(route);
  };
  return (
    <nav
      className={`${
        navIsOpen ? "w-[100vw] lg:min-w-[250px] lg:max-w-[250px] lg:py-6 lg:px-4" : "w-0"
      } bg-white flex flex-col items-center gap-6 transition-width duration-300 ease-in-out overflow-hidden absolute h-full lg:sticky z-[100]`}
    >
      <div className="flex items-center justify-between w-full mt-10 lg:mt-0 px-10">
        <NavLink className="logo text-lg font-bold text-primary" to="/">
          FlexiCart
        </NavLink>
        <button className="lg:hidden" onClick={() => setNavIsOpen(!navIsOpen)}>
          <IoCloseSharp size={30} />
        </button>
      </div>

      <ul className="lg:hidden flex flex-col w-full items-start text-sm  border-b-[1px]">
        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Dashboard"
          onClick={() => handleSelectMenu("Dashboard", "/dashboard")}
        />

        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Manage Store"
          onClick={() => handleSelectMenu("Manage Store", "manage-store")}
        />

        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Manage App Display"
          onClick={() =>
            handleSelectMenu("Manage App Display", "manage-app-display")
          }
        />

        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Manage Categories"
          onClick={() =>
            handleSelectMenu("Manage Categories", "manage-categories")
          }
        />

        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Manage Products"
          onClick={() => handleSelectMenu("Manage Products", "manage-products")}
        />

        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Manage Services"
          onClick={() => handleSelectMenu("Manage Services", "manage-services")}
        />

        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Manage Users"
          onClick={() => handleSelectMenu("Manage Users", "manage-users")}
        />

        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Order List"
          onClick={() => handleSelectMenu("Order List", "order-list")}
        />

        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Manage Inventory"
          onClick={() =>
            handleSelectMenu("Manage Inventory", "manage-inventory")
          }
        />
      </ul>
      <ul className="hidden lg:flex flex-col w-full items-start text-sm  border-b-[1px]">
        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Dashboard"
          onClick={() => handleSelectMenuWeb("Dashboard", "/dashboard")}
        />

        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Manage Store"
          onClick={() => handleSelectMenuWeb("Manage Store", "manage-store")}
        />

        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Manage App Display"
          onClick={() =>
            handleSelectMenuWeb("Manage App Display", "manage-app-display")
          }
        />

        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Manage Categories"
          onClick={() =>
            handleSelectMenuWeb("Manage Categories", "manage-categories")
          }
        />

        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Manage Products"
          onClick={() => handleSelectMenuWeb("Manage Products", "manage-products")}
        />

        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Manage Services"
          onClick={() => handleSelectMenuWeb("Manage Services", "manage-services")}
        />

        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Manage Users"
          onClick={() => handleSelectMenuWeb("Manage Users", "manage-users")}
        />

        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Order List"
          onClick={() => handleSelectMenuWeb("Order List", "order-list")}
        />

        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Manage Inventory"
          onClick={() =>
            handleSelectMenuWeb("Manage Inventory", "manage-inventory")
          }
        />
      </ul>
      <ul className="lg:hidden flex flex-col w-full items-start text-sm">
        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Profile"
          onClick={() => handleSelectMenu("Profile", "profile")}
        />
        <DashboardMenuItem text="Logout" onClick={() => logout()} />
      </ul>
      <ul className="hidden lg:flex flex-col w-full items-start text-sm">
        <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Profile"
          onClick={() => handleSelectMenuWeb("Profile", "profile")}
        />

        {/* <DashboardMenuItem
          selectedMenu={selectedMenu}
          text="Settings"
          onClick={() => handleSelectMenu("Settings", "settings")}
        /> */}
        <DashboardMenuItem text="Logout" onClick={() => logout()} />
      </ul>
    </nav>
  );
};

export default SideNav;
