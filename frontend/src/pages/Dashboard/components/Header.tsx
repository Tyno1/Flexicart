import React from "react";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { IoCloseSharp } from "react-icons/io5";

interface HeaderProp {
  toggleNav: () => void;
  user: any;
  navIsOpen: boolean;
}

const Header: React.FC<HeaderProp> = ({ toggleNav, user, navIsOpen }) => {
  const navigate = useNavigate();
  return (
    <div className="h-26 lg:h-16 bg-white w-full shadow-sm flex items-center justify-between py-6 lg:pr-4 pr-2 pl-2">
      <div className="left-section h-full flex items-center gap-4 ml-6">
        {navIsOpen ? (
          <button onClick={toggleNav}>
            <IoCloseSharp size={30} />
          </button>
        ) : (
          <button onClick={toggleNav}>
            <RxHamburgerMenu size={30} />
          </button>
        )}

        <NavLink
          className="logo lg:hidden text-lg font-bold text-primary w-full flex ml-4 "
          to="/"
        >
          FlexiCart
        </NavLink>
        <div className="search-bar w-[300px] h-10 bg-[#F1F4F9] rounded-2xl border hidden lg:flex items-center px-4 gap-2 hover:ring hover:ring-2 hover:ring-primary ">
          <button className="">
            <CiSearch size={20} />
          </button>
          <input
            className="bg-transparent flex-1 focus:outline-none"
            type="text"
            placeholder="search"
          />
        </div>
      </div>

      <div className="right-section h-full flex items-center gap-4">
        {user ? (
          <div className="flex flex-col">
            <p className="name text-sm font-medium"> {user.user.fullName}</p>
            <p className="title text-xs">Admin</p>
          </div>
        ) : (
          <Button
            text="login"
            variant="filled"
            onClick={() => navigate("/login")}
            className="bg-primary text-white"
          />
        )}
      </div>
    </div>
  );
};

export default Header;
