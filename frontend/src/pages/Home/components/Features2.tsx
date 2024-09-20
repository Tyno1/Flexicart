import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Features2: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white w-full min-h-[100vh] flex flex-col items-center justify-center py-16">
      <div className="w-full md:w-[450px] flex flex-col items-center text-black">
        <h3 className="text-2xl md:text-5xl text-center font-medium leading-tight">
          All The Features You Need In One Place
        </h3>
        <h5 className="mt-4 text-center">
          Discover the tools and functionalities that make{" "}
          <span className="font-bold"> FlexiCart</span> the ultimate e-commerce
          platform.
        </h5>
      </div>

      <div className="features-cards flex flex-col md:flex-row gap-4 mt-10">
        <div
          style={{ borderRadius: "0 0 100px 0" }}
          className="w-[300px] h-[360px] bg-black rounded p-8 flex flex-col items-start justify-between"
        >
          <div className="top-section flex justify-between">
            <h5 className="text-white text-xl w-[70%]">
              Customisable Storefronts
            </h5>
            <FaArrowUp size={30} className="text-white rotate-45" />
          </div>
          <button onClick={() => navigate("/")} className=" bg-white py-2 px-8">
            Explore
          </button>
        </div>
        <div className="w-[300px] h-[360px] bg-black p-8 flex flex-col items-start justify-between">
          <div className="top-section flex justify-between">
            <h5 className="text-white text-xl w-[70%]">
              Robust Security Measures{" "}
            </h5>
            <FaArrowUp size={30} className="text-white rotate-45" />
          </div>
          <button onClick={() => navigate("/")} className=" bg-white py-2 px-8">
            Explore
          </button>
        </div>
        <div
          style={{ borderRadius: "0 0 0 80px" }}
          className="w-[300px] h-[360px] bg-[#D9D9D9] rounded p-8 flex flex-col items-start justify-between"
        >
          <div className="top-section flex justify-between">
            <h5 className="text-black text-xl w-[70%]">
              User Friendly Mobile App{" "}
            </h5>
            <FaArrowUp size={30} className="text-black rotate-45" />
          </div>
          <button
            onClick={() => navigate("/")}
            style={{ borderRadius: "0 0 0  70px" }}
            className=" bg-white py-2 px-8"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features2;
