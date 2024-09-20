import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import IconButton from "./ui/IconButton";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onNavPress = (route: string) => {
    setIsOpen(!isOpen);
    navigate(route);
  };
  return (
    <nav className="px-4 lg:px-32 xl:px-48 flex items-center w-[100vw] justify-between bg-black p-6 sticky top-0 z-40 relative">
      <button
        className="font-bold text-xl text-white"
        onClick={() => {
          if (isOpen === true) {
            setIsOpen(!isOpen);
          }
          navigate("/");
        }}
      >
        FlexiCart
      </button>
      <div className="hidden md:flex items-center gap-10 lg:gap-20 ">
        <ul className="flex gap-8 text-sm text-white">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about-us">About Us</NavLink>
          </li>

          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/download">Download</NavLink>
          </li>
        </ul>

        {user ? (
          <div className="flex gap-4 items-center text-sm">
            <Button
              text="Dashboard"
              variant="filled"
              onClick={() => navigate("/dashboard")}
              className="bg-white text-black"
            />
            <Button
              text="logout"
              variant="filled"
              onClick={() => logout()}
              className="bg-primary text-white"
            />
          </div>
        ) : (
          <div className="flex gap-4 items-center text-sm">
            <Button
              text="Register"
              variant="filled"
              onClick={() => navigate("/register")}
              className="bg-white text-black"
            />
            <Button
              text="login"
              variant="filled"
              onClick={() => navigate("/login")}
              className="bg-primary text-white"
            />
          </div>
        )}
      </div>
      <div className="mobile md:hidden w-full">
        <IconButton
          icon={
            isOpen ? (
              <IoMdClose size={24} color="#fff" />
            ) : (
              <GiHamburgerMenu size={24} color="#fff" />
            )
          }
          onClick={() => toggleMenu()}
          className="ml-auto"
        />
        <div
          className={`w-full h-[100vh] bg-white fixed top-0 left-0 z-10 transition-all duration-700 ease-in-out transform ${
            isOpen
              ? "translate-y-20 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <ul className="flex flex-col text-sm text-black w-full">
            <li className="bg-white hover:bg-myGray active:bg-primary">
              <button
                className="p-8 w-full mx-auto active:text-white"
                onClick={() => onNavPress("/")}
              >
                Home
              </button>
            </li>
            <li className="bg-white hover:bg-myGray active:bg-primary">
              <button
                className="p-8 w-full mx-auto active:text-white"
                onClick={() => onNavPress("/about-us")}
              >
                About Us
              </button>
            </li>
            <li className="bg-white hover:bg-myGray active:bg-primary">
              <button
                className="p-8 w-full mx-auto active:text-white"
                onClick={() => onNavPress("/contact")}
              >
                Contact Us
              </button>
            </li>
            <li className="bg-white hover:bg-myGray active:bg-primary">
              <button
                className="p-8 w-full mx-auto active:text-white"
                onClick={() => onNavPress("/download")}
              >
                Download
              </button>
            </li>
            {user ? (
              <>
                <li className="bg-white hover:bg-myGray active:bg-primary">
                  <button
                    className="p-8 w-full mx-auto active:text-white"
                    onClick={() => onNavPress("/dashboard")}
                  >
                    Dashboard
                  </button>
                </li>
                <li className="bg-primary hover:bg-myGray active:bg-secondary">
                  <button
                    className="p-8 w-full mx-auto text-white hover:text-primary"
                    onClick={() => logout()}
                  >
                    logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="bg-primary hover:bg-myGray active:bg-secondary">
                  <button
                    className="p-8 w-full mx-auto text-white hover:text-primary"
                    onClick={() => onNavPress("/register")}
                  >
                    Register
                  </button>
                </li>
                <li className="bg-primary hover:bg-myGray active:bg-secondary">
                  <button
                    className="p-8 w-full mx-auto text-white hover:text-primary"
                    onClick={() => onNavPress("/login")}
                  >
                    login
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
