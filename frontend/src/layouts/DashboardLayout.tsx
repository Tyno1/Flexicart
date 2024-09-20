import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import Header from "../pages/Dashboard/components/Header";
import SideNav from "../pages/Dashboard/components/SideNav";
import ScrollToTop from "../utils/ScrollToTop";
import { StoreUserContext } from "../context/StoreUsersContext";
import { OrderContext } from "../context/OrderContext";

const DashboardLayout: React.FC = () => {
  const [navIsOpen, setNavIsOpen] = useState<boolean>(true);
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const { logout, user } = useContext(AuthContext);
  const { storeUsers } = useContext(StoreUserContext);
  const { orders } = useContext(OrderContext);
  const toggleNav = () => {
    setNavIsOpen(!navIsOpen);
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-row relative lg:sticky">
      <ScrollToTop />
      <SideNav
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        logout={logout}
        navIsOpen={navIsOpen}
        setNavIsOpen={setNavIsOpen}
      />
      <div className="flex flex-col flex-1">
        <Header navIsOpen={navIsOpen} user={user} toggleNav={toggleNav} />
        <main className="flex-1 overflow-y-auto">
          <Outlet context={{ user, storeUsers, orders, setSelectedMenu }} />
          <ToastContainer />
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
