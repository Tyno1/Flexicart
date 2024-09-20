import React from "react";
import { useNavigate } from "react-router-dom";
import { TbCameraPlus } from "react-icons/tb";

const ShopInfo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login w-full min-h-[90vh] p-4 flex items-center justify-center">
      <div className="w-[40vw] bg-white h-[80vh] rounded-3xl p-10 border flex flex-col items-center justify-center">
        <div className="head flex flex-col items-center gap-2">
          <h3 className="text-4xl font-bold">Set Up Shop</h3>
          <h5 className="font-normal text-sm">
            Please Enter your Shop information
          </h5>
        </div>
        <form className="content py-6 h-full w-full flex flex-col gap-10 items-center">
          <div className="logo-upload flex flex-col gap-4 w-full h-full items-center">
            <div
              style={{ borderRadius: "100px" }}
              className="w-[150px] h-[150px] bg-[#F1F4F9] flex items-center justify-center"
            >
              <TbCameraPlus size={60} className="text-[#D8D8D8]" />
            </div>
            <div className="text-center text-sm flex flex-col items-center">
              <p className="w-[70%]">
                {" "}
                kindly upload a clear image of your company logo
              </p>
              <p className="leading-tight italic">
                Image must be a transparent png format
              </p>
            </div>
          </div>

          <div className="password flex flex-col gap-2 w-full">
            <label className="text-sm font-normal">Shop Name:</label>

            <input
              className="w-full p-4 border rounded-lg font-normal bg-[#F1F4F9] border-[#D8D8D8]"
              placeholder="Doe Enterprise"
              type="text"
              name="password"
            />
          </div>
          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-primary py-4 px-40 rounded-lg text-white font-normal"
            >
              Save Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ShopInfo;
